const analyzeWithGroq = async (transactions, criterias, phoneNumber) => {
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

module.exports = analyzeWithGroq;
