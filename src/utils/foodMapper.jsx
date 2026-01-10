import { NUTRIENT_MAP } from '@/config/nutrientConfig';
import { DRI_DATA } from '@/config/driConfig';

// Helper to extract value from array based on IDs
const getValue = (nutrients, targetIds) => {
    const found = nutrients.find(n => {
        const nutrientNumber = String(n.nutrientNumber);
        return targetIds.includes(nutrientNumber);
    });
    return found ? (found.value || found.amount || 0) : 0;
};

export const normalizeFood = (apiFood) => {
    // Create the clean object
    const cleanFood = {
        id: apiFood.fdcId,
        name: apiFood.description,
        nutrients: {}
    };

    // Loop through our config to populate nutrients
    Object.keys(NUTRIENT_MAP).forEach(key => {
        cleanFood.nutrients[key] = {};
        Object.keys(NUTRIENT_MAP[key]).forEach(nutrientKey => {
            cleanFood.nutrients[key][nutrientKey] = {};
            cleanFood.nutrients[key][nutrientKey]['value'] = getValue(apiFood.foodNutrients, NUTRIENT_MAP[key][nutrientKey].nutrientNumber);
            cleanFood.nutrients[key][nutrientKey]['unit'] = NUTRIENT_MAP[key][nutrientKey].unit;
            const driObj = DRI_DATA.find(d => d.category === "males" && d.ageRange[0] > 18);
            if (driObj) {
                const driNutrientValues = driObj[key]?.[nutrientKey];
                if (driNutrientValues) {
                    if ('rda' in driNutrientValues && driNutrientValues.rda !== null) {
                        cleanFood.nutrients[key][nutrientKey]['rda'] = driNutrientValues.rda;
                    }
                    else if ('ai' in driNutrientValues && driNutrientValues.ai !== null) {
                        cleanFood.nutrients[key][nutrientKey]['ai'] = driNutrientValues.ai;
                    }
                    else if ('ul' in driNutrientValues && driNutrientValues.ul !== null) {
                        cleanFood.nutrients[key][nutrientKey]['ul'] = driNutrientValues.ul;
                    }

                }
            }
        });
    });



    return cleanFood;
};