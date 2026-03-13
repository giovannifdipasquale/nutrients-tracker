import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

/**
 * Sends missing macros to Gemini AI and returns 3 meal suggestions.
 * @param {Object} missingMacros - { calories: number, protein: number, carbohydrates: number, fat: number }
 * @returns {Promise<Array|null>} - Returns an array of meal objects or null on failure.
 */
export const generateMealIdeas = async (missingMacros) => {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-3-flash-preview",
            generationConfig: {
                responseMimeType: "application/json",
            }
        });
        const prompt = `
        ROLE: You are an expert nutritionist and a data API.
        TASK: You will receive the missing macronutrients needed to reach a user's daily goal. You must suggest exactly 3 meal options that satisfy these macros.
        RULES: 
        1. NEVER add introductory or concluding text.
        2. Respond EXCLUSIVELY with a valid JSON array.
        3. The sum of the meal's macros must be as close as possible to the missing macros.

        REQUIRED JSON FORMAT:
        [
          {
            "meal_name": "String",
            "short_description": "String",
            "ingredients": ["String", "String"],
            "macros": { "calories": Number, "protein": Number, "carbohydrates": Number, "fat": Number }
          }
        ]

        USER INPUT:
        I am missing: ${missingMacros.protein}g protein, ${missingMacros.carbohydrates}g carbohydrates, ${missingMacros.fiber}g fiber.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);

        return JSON.parse(text);

    } catch (error) {
        console.error("AI Service Error:", error);
        return null;
    }
};