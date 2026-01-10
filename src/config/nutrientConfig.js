// src/config/nutrientConfig.js

export const NUTRIENT_MAP = {
    // Macros
    macros: {
        energy: { nutrientNumber: ["208", "957", "958"], unit: 'kcal' },
        protein: { nutrientNumber: ["203"], unit: 'g' },
        fat: { nutrientNumber: ["204", "298"], unit: 'g' },
        carbs: { nutrientNumber: ["205"], unit: 'g' },
        fiber: { nutrientNumber: ["291"], unit: 'g' },
        sugars: { nutrientNumber: ["269", "2000"], unit: 'g' },
    },

    // Micros
    micros: {
        sodium: { nutrientNumber: ["307"], unit: 'mg' },
        iron: { nutrientNumber: ["303"], unit: 'mg' },
        calcium: { nutrientNumber: ["301"], unit: 'mg' },
        magnesium: { nutrientNumber: ["304"], unit: 'mg' },
        potassium: { nutrientNumber: ["306"], unit: 'mg' },
        vitC: { nutrientNumber: ["401"], unit: 'mg' },
        vitD: { nutrientNumber: ["328", "324"], unit: 'ug' }, // Prefer ug over IU
        vitA: { nutrientNumber: ["320", "318"], unit: 'ug' },  // Prefer RAE over IU
        vitB12: { nutrientNumber: ["418"], unit: 'ug' }  // Prefer RAE over IU
    }
};