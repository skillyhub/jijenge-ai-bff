const analyzeWithGroq = async (transactions, criterias, phoneNumber) => {
  // Construct the prompt using the provided criterias
  const prompt = `Analyze the following transactions based on these criteria: ${criterias.join(
    ", "
  )}. 
  Provide insights and recommendations for the user with phone number ${phoneNumber}.`;

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      { role: "system", content: "You are a financial analysis assistant." },
      { role: "user", content: prompt },
      {
        role: "user",
        content: `Transactions data: ${JSON.stringify(transactions)}`,
      },
    ],
    model: "llama3-8b-8192",
  });

  return chatCompletion.choices[0]?.message?.content || "";
};

// Create a queue to handle multiple requests
const requestQueue = [];
let isProcessing = false;

const processQueue = async () => {
  if (isProcessing || requestQueue.length === 0) return;

  isProcessing = true;
  const { transactions, criterias, phoneNumber, resolve, reject } =
    requestQueue.shift();

  try {
    const result = await analyzeWithGroq(transactions, criterias, phoneNumber);
    resolve(result);
  } catch (error) {
    reject(error);
  } finally {
    isProcessing = false;
    processQueue(); // Process next request in the queue
  }
};

// Export a function that adds requests to the queue
module.exports = (transactions, criterias, phoneNumber) => {
  return new Promise((resolve, reject) => {
    requestQueue.push({
      transactions,
      criterias,
      phoneNumber,
      resolve,
      reject,
    });
    processQueue();
  });
};
