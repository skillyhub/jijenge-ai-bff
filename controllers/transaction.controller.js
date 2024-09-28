require("dotenv").config();
const axios = require("axios");
const moment = require("moment");
const Groq = require("groq-sdk");
const allTransactions = require("../mock-data/allTransactions");
const mockCriterias = require("../mock-data/allCriterias");

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const groq = new Groq({ apiKey: GROQ_API_KEY });

const analyzeWithGroq = async (transactions, phoneNumber) => {
  const prompt = `
    Hello Groq,
    You are a BUSINESS ANALYST with more than 30 YEARS OF EXPERIENCE,
    You have been conducting successful analysis for big companies.
    Your TASK is to ANALYZE THE BUSINESS HEALTH of our customer.

    - Check all the transactions related to ${phoneNumber}, separately based on the service type (Bank, Momo) and based on these criterias ${mockCriterias}
    - For bank, check if this user has the specified number of transactions from criterias within the past five years,
    - Check if the computed amount he got per month is minimum of minimum Monthly Amount specified in the criteria,
    - check if for the balance after five years is equal to the total 50% of the combination of all the minimum monthly amount to transac
    - Check also if he has operations where he paid taxes means for the five passed years the total tax amount paid should be five times the 28% of the yearly balance computed because the regulation fixes 28% as business tax.
    
    If this user respect these conditions, his business health is good, and based on the ration of these conditions, calculate his business health in percentage
    If he does not respect these conditions, calculate his business health and give it in percentage but less than 50%, and if he doesn't pay some tax per month, just let him know that his health is under 10% since he is indebted to the state

    I need 3 things as your response:

    1 - the ratio of his business health
    2 - Explain the reason why he is eligible or not based on the criterias
    3 - the suggestion of how he can adjust things based on the criterias to have his business health in good condition
    
  `;

  // Use Groq AI's chat completion feature
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
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

exports.findAll = async (req, res) => {
  const now = moment();
  const sixMonthsAgo = now.subtract(6, "months");
  const phoneNumber = "+250790183836";

  // 1. Fetch transactions from the backend (replace with your actual backend URL)
  // const response = await axios.get(
  //   "https://jsonplaceholder.typicode.com/posts"
  // );
  // const transactions = response.data;

  // 2. Filter transactions for the specific phone number within the past 6 months
  const filteredTransactions = allTransactions.filter((transaction) => {
    return (
      transaction.phoneNumber === phoneNumber &&
      moment(transaction.date).isAfter(sixMonthsAgo)
    );
  });

  if (filteredTransactions.length === 0) {
    return res.status(200).json({
      msg: "No transactions found for this phone number within the last 6 months.",
    });
  }

  // 3. Analyze the transactions using Groq AI
  const analysisResult = await analyzeWithGroq(
    filteredTransactions,
    phoneNumber
  );

  // 4. Return the result from Groq AI
  res.status(200).json({ analysis: analysisResult });
};

exports.findOne = async (req, res) => {
  res.status(200).json({ msg: "find one transaction" });
};

exports.create = async (req, res) => {
  res.status(200).json({ msg: "transaction created" });
};
