
import { GoogleGenAI, Type } from "@google/genai";
import { CarCategory } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getCarRecommendation = async (userPrompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User is looking for a rental car. Their needs: "${userPrompt}". 
      Recommend which categories (Sedan, SUV, Luxury, Electric, Sports) suit them and why. 
      Respond with specific reasons for each category.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedCategories: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of CarCategory values that match the user's needs."
            },
            explanation: {
              type: Type.STRING,
              description: "A friendly, expert explanation of why these were chosen."
            }
          },
          required: ["recommendedCategories", "explanation"]
        }
      }
    });

    const data = JSON.parse(response.text);
    return data;
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      recommendedCategories: [CarCategory.SEDAN],
      explanation: "I'm having a little trouble thinking right now, but a standard Sedan is usually a great all-around choice!"
    };
  }
};
