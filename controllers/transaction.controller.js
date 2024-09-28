require("dotenv").config();
const axios = require("axios");
const moment = require("moment");
const Groq = require("groq-sdk");
const allTransactions = require("../mock-data/allTransactions");

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const groq = new Groq({ apiKey: GROQ_API_KEY });

const analyzeWithGroq = async (transactions, phoneNumber) => {
  const prompt = `
    For the phone number ${phoneNumber}, analyze the following transactions.
    I want to know if the phone number was receiving at least $100 each month in the last 6 months,
    and if after withdrawals, they have at least $70 left, assuming the maximum withdrawal is $29 per month.
    If the conditions are met, respond with:
    "${phoneNumber} you have done X amount of transactions within the past 6 months, you successfully received at least $100 each month, and you seem to keep at least 70% of the received amount, you are eligible for the loan of $500."
    If the conditions are not met, provide a detailed reason why not.
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
