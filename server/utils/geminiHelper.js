// utils/geminiHelper.js
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateGeminiSummary(engineData) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

  const prompt = `Generate a professional engine summary based on the following data:
Oil Level: ${engineData.oilLevel}
Coolant Level: ${engineData.coolantLevel}
Belts Condition: ${engineData.beltsCondition}
Engine Noise: ${engineData.engineNoise}

Keep it concise and suitable for a vehicle inspection report.`;

  const result = await model.generateContent(prompt);
  const text = await result.response.text();
  return text;
}

module.exports = { generateGeminiSummary };
