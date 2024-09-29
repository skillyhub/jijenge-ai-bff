require("dotenv").config();
const moment = require("moment");
const Groq = require("groq-sdk");

const Transaction = require("../models/transaction.model");
const Criteria = require("../models/criteria.model");

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const groq = new Groq({ apiKey: GROQ_API_KEY });
const now = moment();
const fiveYearsAgo = now.subtract(5, "years");

const analyzeBusiness = async (transactions, phoneNumber) => {
  const promptAnalyze = `

    Hello JIJENGE Ai, this will be your pseudo
    You are a BUSINESS ANALYST with over [X] YEARS OF EXPERIENCE in helping small businesses improve their financial health. 
    You have successfully conducted analyses for major companies.
    Your TASK is to ANALYZE THE BUSINESS HEALTH of our customer based on the following 7 criteria:

    - 10% of overall business health: First, check if the current balance of ${phoneNumber} is greater than 0.
    - 10% of overall business health: Next, verify if total credit transactions exceed total debit transactions.
    - 10% of overall business health: Assess if the balance of ${phoneNumber} is greater than the average of credit transactions.
    - 30% of overall business health: Ensure that at least 28% of the balance remains each year, as per Rwandan standards.

    Your response should be concise and grounded in the provided ${transactions} over the past 5 years.

    Please respond in a friendly manner, such as:
    "Hi, I am JIJENGE Ai, your business analyst partner."

    Then, outline the strengths and weaknesses of the business by presenting the percentage for each criterion based on the given weightings. Finally, provide financial advice tailored to the business, keeping in mind that all businesses are based in Rwanda.
    Be as concise as you can while being bref as well, one simple paragraph is enough
`;

  // Use Groqs AI's chat completion feature
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: promptAnalyze,
      },
      {
        role: "user",
        content: `Transactions data: ${JSON.stringify(transactions)}`,
      },
    ],
    model: "llama3-8b-8192", // You can use any available model
  });

  return chatCompletion.choices[0]?.message?.content || "";
};

const analyzeLoan = async (transactions, criterias, phoneNumber, amount) => {
  const promptLoan = `
  Hello JIJENGE AI,
  
  You are an advanced financial analysis tool designed to assist users in evaluating their financial health and making informed decisions. Your primary goal is to analyze user transactions and provide personalized recommendations for financial institutions based on their transaction history.
  
  When a user submits their ${phoneNumber} and the desired loan ${amount}, your tasks are as follows:
  always remember that we in Rwanda so you have have to stay in the context while suggesting or reporting. 
  1. Retrieve Transaction Data: Fetch the user's transaction history from the database, focusing on the number of transactions and the minimum monthly amounts.
  
  2. Analyze Transaction Patterns: Assess the user’s ${transactions} data against predefined criteria for financial institutions, which include: ${criterias}
  
     You will check the user's transaction data against this criteria array to determine eligibility.
  
  3. Evaluate Loan Request: Consider the desired loan amount in relation to the user's financial health and transaction history. Provide feedback on whether the requested amount seems reasonable based on their financial activity.
  
  4. Generate Recommendations: Provide concise suggestions based on the analysis, highlighting suitable financial services the user may consider for their loan request within the context of Rwanda.
  
  Your response should be friendly and engaging, such as:
  "Hi, I am JIJENGE AI, your financial analysis partner! Based on your transaction history and the loan amount you wish to request, here are some financial institutions that might suit your needs."
  
  Conclude with tailored recommendations, ensuring users feel supported in their financial journey.Be as concise as you can while being bref as well, one simple paragraph is enough
  `;

  // Use Groq AI's chat completion feature
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: promptLoan,
      },
      {
        role: "user",
        content: `Transactions data: ${JSON.stringify(transactions)}`,
      },
    ],
    model: "llama3-8b-8192", // You can use any available model
  });

  return chatCompletion.choices[0]?.message?.content || "";
};

exports.analyzeBusiness = async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).send({ message: "Phone number was not provided" });
  }

  // check if the phone number exists TODO:

  // 1. Filter transactions for the specific phone number within the past 6 months
  const filteredTransactions = allTransactions.filter((transaction) => {
    return (
      transaction.phoneNumber === phoneNumber &&
      moment(transaction.date).isAfter(fiveYearsAgo)
    );
  });

  if (filteredTransactions.length === 0) {
    return res.status(200).json({
      msg: "No transactions found for this phone number within the last 6 months.",
    });
  }

  // 2. Analyze the transactions using Groq AI
  const analysisResult = await analyzeBusiness(
    filteredTransactions,
    phoneNumber
  );

  // 3. Return the result from Groq AI
  res.status(200).json({ analysis: analysisResult });
};

exports.requestLoan = async (req, res) => {
  const { phoneNumber, amount } = req.body;

  if (!phoneNumber) {
    return res.status(400).send({ message: "Phone number was not provided" });
  }
  if (!amount) {
    return res
      .status(400)
      .send({ message: "Can't request loan without specifying the amount" });
  }

  // check if the phone number exists TODO:

  const allCriterias = await Criteria.find();

  // 1. Filter transactions for the specific phone number within the past 6 months
  const filteredTransactions = allTransactions.filter((transaction) => {
    return (
      transaction.phoneNumber === phoneNumber &&
      moment(transaction.date).isAfter(fiveYearsAgo)
    );
  });

  if (filteredTransactions.length === 0) {
    return res.status(200).json({
      msg: "No transactions found for this phone number within the last 6 months.",
    });
  }

  // 2. Analyze the transactions using Groq AI
  const analysisResult = await analyzeLoan(
    filteredTransactions,
    allCriterias,
    phoneNumber,
    amount
  );

  // 3. Return the result from Groq AI
  res.status(200).json({ analysis: analysisResult });
};

exports.create = async (req, res) => {
  try {
    // Extract transaction details from the request body
    const { amount, type, balance } = req.body;

    // Adjust the balance based on the type of transaction
    let updatedBalance = balance || 0;

    if (type === "CREDIT") {
      updatedBalance += amount; // Add the amount for CREDIT transactions
    } else if (type === "DEBIT" || type === "TAX") {
      updatedBalance -= amount; // Subtract the amount for DEBIT/TAX transactions
    }

    const newTransaction = new Transaction({
      ...req.body,
      balance: updatedBalance,
    });

    const savedTransaction = await newTransaction.save();

    return res.status(201).json(savedTransaction);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const allTransactions = await Transaction.find();
    return res.status(200).json(allTransactions);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.findOne = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ _id: req.params.id });
    if (!transaction)
      return res.status(404).json("Cette transaction n'existe pas !");

    return res.status(200).json(transaction);
  } catch (error) {
    return res.status(400).json({ error });
  }
};
