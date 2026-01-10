// src/config/driData.js

/**
 * DRI (Dietary Reference Intakes) Source of Truth
 * Source: National Academies of Sciences, Engineering, and Medicine
 *
 * rda = Recommended Dietary Allowance (Goal for 97% of people)
 * ai  = Adequate Intake (Goal when RDA is not established)
 * ul  = Tolerable Upper Intake Level (Do not exceed)
 */

export const DRI_DATA = [
    // ===========================================================================
    // INFANTS (0 - 12 months)
    // ===========================================================================
    {
        category: "infants",
        ageRange: [0, 0.5], // 0-6 months
        macros: {
            protein: { ai: 9.1, unit: "g" },
            fat: { ai: 31, unit: "g" },
            carbs: { ai: 60, unit: "g" },
            fiber: { ai: null, unit: "g" },
            sugars: { ul: null, unit: "g" } // Avoid added sugars completely
        },
        micros: {
            sodium: { ai: 110, ul: null, unit: "mg" },
            iron: { ai: 0.27, ul: 40, unit: "mg" },
            calcium: { ai: 200, ul: 1000, unit: "mg" },
            magnesium: { ai: 30, ul: null, unit: "mg" },
            potassium: { ai: 400, ul: null, unit: "mg" },
            vitC: { ai: 40, ul: null, unit: "mg" },
            vitD: { ai: 10, ul: 25, unit: "ug" }, // 400 IU
            vitA: { ai: 400, ul: 600, unit: "ug" },
            vitB12: { ai: 0.4, ul: null, unit: "ug" }
        }
    },
    {
        category: "infants",
        ageRange: [0.5, 1], // 7-12 months
        macros: {
            protein: { ai: 11, unit: "g" },
            fat: { ai: 30, unit: "g" },
            carbs: { ai: 95, unit: "g" },
            fiber: { ai: null, unit: "g" },
            sugars: { ul: null, unit: "g" }
        },
        micros: {
            sodium: { ai: 370, ul: null, unit: "mg" },
            iron: { rda: 11, ul: 40, unit: "mg" },
            calcium: { ai: 260, ul: 1500, unit: "mg" },
            magnesium: { ai: 75, ul: null, unit: "mg" },
            potassium: { ai: 860, ul: null, unit: "mg" },
            vitC: { ai: 50, ul: null, unit: "mg" },
            vitD: { ai: 10, ul: 38, unit: "ug" },
            vitA: { ai: 500, ul: 600, unit: "ug" },
            vitB12: { ai: 0.5, ul: null, unit: "ug" }
        }
    },

    // ===========================================================================
    // CHILDREN (1 - 8 years)
    // ===========================================================================
    {
        category: "children",
        ageRange: [1, 3],
        macros: {
            protein: { rda: 13, unit: "g" },
            fat: { ai: null, unit: "g" }, // AMDR 30-40% of cals
            carbs: { rda: 130, unit: "g" },
            fiber: { ai: 19, unit: "g" },
            sugars: { ul: null, unit: "g" }
        },
        micros: {
            sodium: { ai: 800, ul: 1200, unit: "mg" },
            iron: { rda: 7, ul: 40, unit: "mg" },
            calcium: { rda: 700, ul: 2500, unit: "mg" },
            magnesium: { rda: 80, ul: 65, unit: "mg" }, // UL for supplements only
            potassium: { ai: 2000, ul: null, unit: "mg" },
            vitC: { rda: 15, ul: 400, unit: "mg" },
            vitD: { rda: 15, ul: 63, unit: "ug" }, // 600 IU
            vitA: { rda: 300, ul: 600, unit: "ug" },
            vitB12: { rda: 0.9, ul: null, unit: "ug" }
        }
    },
    {
        category: "children",
        ageRange: [4, 8],
        macros: {
            protein: { rda: 19, unit: "g" },
            fat: { ai: null, unit: "g" }, // AMDR 25-35%
            carbs: { rda: 130, unit: "g" },
            fiber: { ai: 25, unit: "g" },
            sugars: { ul: null, unit: "g" }
        },
        micros: {
            sodium: { ai: 1000, ul: 1500, unit: "mg" },
            iron: { rda: 10, ul: 40, unit: "mg" },
            calcium: { rda: 1000, ul: 2500, unit: "mg" },
            magnesium: { rda: 130, ul: 110, unit: "mg" }, // UL for supplements only
            potassium: { ai: 2300, ul: null, unit: "mg" },
            vitC: { rda: 25, ul: 650, unit: "mg" },
            vitD: { rda: 15, ul: 75, unit: "ug" },
            vitA: { rda: 400, ul: 900, unit: "ug" },
            vitB12: { rda: 1.2, ul: null, unit: "ug" }
        }
    },

    // ===========================================================================
    // MALES
    // ===========================================================================
    {
        category: "males",
        ageRange: [9, 13],
        macros: {
            protein: { rda: 34, unit: "g" },
            carbs: { rda: 130, unit: "g" },
            fiber: { ai: 31, unit: "g" },
            sugars: { ul: null, unit: "g" }
        },
        micros: {
            sodium: { ai: 1200, ul: 1800, unit: "mg" },
            iron: { rda: 8, ul: 40, unit: "mg" },
            calcium: { rda: 1300, ul: 3000, unit: "mg" },
            magnesium: { rda: 240, ul: 350, unit: "mg" },
            potassium: { ai: 2500, ul: null, unit: "mg" },
            vitC: { rda: 45, ul: 1200, unit: "mg" },
            vitD: { rda: 15, ul: 100, unit: "ug" },
            vitA: { rda: 600, ul: 1700, unit: "ug" },
            vitB12: { rda: 1.8, ul: null, unit: "ug" }
        }
    },
    {
        category: "males",
        ageRange: [14, 18],
        macros: {
            protein: { rda: 52, unit: "g" },
            carbs: { rda: 130, unit: "g" },
            fiber: { ai: 38, unit: "g" },
            sugars: { ul: null, unit: "g" }
        },
        micros: {
            sodium: { ai: 1500, ul: 2300, unit: "mg" },
            iron: { rda: 11, ul: 45, unit: "mg" },
            calcium: { rda: 1300, ul: 3000, unit: "mg" },
            magnesium: { rda: 410, ul: 350, unit: "mg" }, // Note: RDA > Supplement UL
            potassium: { ai: 3000, ul: null, unit: "mg" },
            vitC: { rda: 75, ul: 1800, unit: "mg" },
            vitD: { rda: 15, ul: 100, unit: "ug" },
            vitA: { rda: 900, ul: 2800, unit: "ug" },
            vitB12: { rda: 2.4, ul: null, unit: "ug" }
        }
    },
    {
        category: "males",
        ageRange: [19, 50],
        macros: {
            protein: { rda: 56, unit: "g" },
            carbs: { rda: 130, unit: "g" },
            fiber: { ai: 38, unit: "g" },
            sugars: { ul: null, unit: "g" }
        },
        micros: {
            sodium: { ai: 1500, ul: 2300, unit: "mg" },
            iron: { rda: 8, ul: 45, unit: "mg" },
            calcium: { rda: 1000, ul: 2500, unit: "mg" },
            magnesium: { rda: 400, ul: 350, unit: "mg" },
            potassium: { ai: 3400, ul: null, unit: "mg" },
            vitC: { rda: 90, ul: 2000, unit: "mg" },
            vitD: { rda: 15, ul: 100, unit: "ug" },
            vitA: { rda: 900, ul: 3000, unit: "ug" },
            vitB12: { rda: 2.4, ul: null, unit: "ug" }
        }
    },
    {
        category: "males",
        ageRange: [51, 999],
        macros: {
            protein: { rda: 56, unit: "g" },
            carbs: { rda: 130, unit: "g" },
            fiber: { ai: 30, unit: "g" },
            sugars: { ul: null, unit: "g" }
        },
        micros: {
            sodium: { ai: 1500, ul: 2300, unit: "mg" },
            iron: { rda: 8, ul: 45, unit: "mg" },
            calcium: { rda: 1000, ul: 2000, unit: "mg" }, // Increases to 1200 at age 70+
            magnesium: { rda: 420, ul: 350, unit: "mg" },
            potassium: { ai: 3400, ul: null, unit: "mg" },
            vitC: { rda: 90, ul: 2000, unit: "mg" },
            vitD: { rda: 15, ul: 100, unit: "ug" }, // Increases to 20ug at age 70+
            vitA: { rda: 900, ul: 3000, unit: "ug" },
            vitB12: { rda: 2.4, ul: null, unit: "ug" }
        }
    },

    // ===========================================================================
    // FEMALES
    // ===========================================================================
    {
        category: "females",
        ageRange: [9, 13],
        macros: {
            protein: { rda: 34, unit: "g" },
            carbs: { rda: 130, unit: "g" },
            fiber: { ai: 26, unit: "g" },
            sugars: { ul: null, unit: "g" }
        },
        micros: {
            sodium: { ai: 1200, ul: 1800, unit: "mg" },
            iron: { rda: 8, ul: 40, unit: "mg" },
            calcium: { rda: 1300, ul: 3000, unit: "mg" },
            magnesium: { rda: 240, ul: 350, unit: "mg" },
            potassium: { ai: 2300, ul: null, unit: "mg" },
            vitC: { rda: 45, ul: 1200, unit: "mg" },
            vitD: { rda: 15, ul: 100, unit: "ug" },
            vitA: { rda: 600, ul: 1700, unit: "ug" },
            vitB12: { rda: 1.8, ul: null, unit: "ug" }
        }
    },
    {
        category: "females",
        ageRange: [14, 18],
        macros: {
            protein: { rda: 46, unit: "g" },
            carbs: { rda: 130, unit: "g" },
            fiber: { ai: 26, unit: "g" },
            sugars: { ul: null, unit: "g" }
        },
        micros: {
            sodium: { ai: 1500, ul: 2300, unit: "mg" },
            iron: { rda: 15, ul: 45, unit: "mg" }, // Menstruation onset
            calcium: { rda: 1300, ul: 3000, unit: "mg" },
            magnesium: { rda: 360, ul: 350, unit: "mg" },
            potassium: { ai: 2300, ul: null, unit: "mg" },
            vitC: { rda: 65, ul: 1800, unit: "mg" },
            vitD: { rda: 15, ul: 100, unit: "ug" },
            vitA: { rda: 700, ul: 2800, unit: "ug" },
            vitB12: { rda: 2.4, ul: null, unit: "ug" }
        }
    },
    {
        category: "females",
        ageRange: [19, 50],
        macros: {
            protein: { rda: 46, unit: "g" },
            carbs: { rda: 130, unit: "g" },
            fiber: { ai: 25, unit: "g" },
            sugars: { ul: null, unit: "g" }
        },
        micros: {
            sodium: { ai: 1500, ul: 2300, unit: "mg" },
            iron: { rda: 18, ul: 45, unit: "mg" }, // High iron needs
            calcium: { rda: 1000, ul: 2500, unit: "mg" },
            magnesium: { rda: 310, ul: 350, unit: "mg" },
            potassium: { ai: 2600, ul: null, unit: "mg" },
            vitC: { rda: 75, ul: 2000, unit: "mg" },
            vitD: { rda: 15, ul: 100, unit: "ug" },
            vitA: { rda: 700, ul: 3000, unit: "ug" },
            vitB12: { rda: 2.4, ul: null, unit: "ug" }
        }
    },
    {
        category: "females",
        ageRange: [51, 999],
        macros: {
            protein: { rda: 46, unit: "g" },
            carbs: { rda: 130, unit: "g" },
            fiber: { ai: 21, unit: "g" },
            sugars: { ul: null, unit: "g" }
        },
        micros: {
            sodium: { ai: 1500, ul: 2300, unit: "mg" },
            iron: { rda: 8, ul: 45, unit: "mg" }, // Menopause (Iron drops)
            calcium: { rda: 1200, ul: 2000, unit: "mg" }, // Bone health priority
            magnesium: { rda: 320, ul: 350, unit: "mg" },
            potassium: { ai: 2600, ul: null, unit: "mg" },
            vitC: { rda: 75, ul: 2000, unit: "mg" },
            vitD: { rda: 15, ul: 100, unit: "ug" }, // Increases to 20ug at 70+
            vitA: { rda: 700, ul: 3000, unit: "ug" },
            vitB12: { rda: 2.4, ul: null, unit: "ug" }
        }
    },

    // ===========================================================================
    // PREGNANCY (Simplified 19-50y)
    // ===========================================================================
    {
        category: "pregnancy",
        ageRange: [19, 50],
        macros: {
            protein: { rda: 71, unit: "g" },
            carbs: { rda: 175, unit: "g" },
            fiber: { ai: 28, unit: "g" },
            sugars: { ul: null, unit: "g" }
        },
        micros: {
            sodium: { ai: 1500, ul: 2300, unit: "mg" },
            iron: { rda: 27, ul: 45, unit: "mg" },
            calcium: { rda: 1000, ul: 2500, unit: "mg" },
            magnesium: { rda: 360, ul: 350, unit: "mg" },
            potassium: { ai: 2900, ul: null, unit: "mg" },
            vitC: { rda: 85, ul: 2000, unit: "mg" },
            vitD: { rda: 15, ul: 100, unit: "ug" },
            vitA: { rda: 770, ul: 3000, unit: "ug" }, // Careful with Vit A in pregnancy
            vitB12: { rda: 2.6, ul: null, unit: "ug" }
        }
    },

    // ===========================================================================
    // LACTATION (Simplified 19-50y)
    // ===========================================================================
    {
        category: "lactation",
        ageRange: [19, 50],
        macros: {
            protein: { rda: 71, unit: "g" },
            carbs: { rda: 210, unit: "g" },
            fiber: { ai: 29, unit: "g" },
            sugars: { ul: null, unit: "g" }
        },
        micros: {
            sodium: { ai: 1500, ul: 2300, unit: "mg" },
            iron: { rda: 9, ul: 45, unit: "mg" }, // Lower iron than pregnancy
            calcium: { rda: 1000, ul: 2500, unit: "mg" },
            magnesium: { rda: 310, ul: 350, unit: "mg" },
            potassium: { ai: 2800, ul: null, unit: "mg" },
            vitC: { rda: 120, ul: 2000, unit: "mg" },
            vitD: { rda: 15, ul: 100, unit: "ug" },
            vitA: { rda: 1300, ul: 3000, unit: "ug" }, // High Vit A need for milk
            vitB12: { rda: 2.8, ul: null, unit: "ug" }
        }
    }
];