import { NUTRIENT_MAP } from '@/config/nutrientConfig';
import { DRI_DATA } from '@/config/driConfig';

// Helper to extract value from array based on IDs
const getValue = (nutrients, targetIds) => {
    const found = nutrients.find(n => {
        if (n.nutrientNumber) {
            const nutrientNumber = String(n.nutrientNumber);
            return targetIds.includes(nutrientNumber);
        }
        else {
            const nutrientNumber = String(n.nutrient.number);
            return targetIds.includes(nutrientNumber);
        }
    });
    return found ? (found.value || found.amount || 0) : 0;
};

export const normalizeFood = (apiFood, amount = 1) => {
    // Create the clean object
    const cleanFood = {
        id: apiFood.fdcId,
        name: apiFood.description,
        nutrients: {},
        foodPortions: apiFood.foodPortions || []
    };
    if (apiFood.fdcId == 171691) {
        console.log('Processing food:', apiFood.description, 'Amount:', amount);
    }

    // Loop through our config to populate nutrients
    Object.keys(NUTRIENT_MAP).forEach(key => {
        cleanFood.nutrients[key] = {};
        Object.keys(NUTRIENT_MAP[key]).forEach(nutrientKey => {
            cleanFood.nutrients[key][nutrientKey] = {};
            // extracting nutrient value 
            if (apiFood.fdcId == 171691) {
                console.log('nutrientKey:', nutrientKey);
                console.log('nutrientNumber:', NUTRIENT_MAP[key][nutrientKey].nutrientNumber);
            }
            const value = getValue(apiFood.foodNutrients, NUTRIENT_MAP[key][nutrientKey].nutrientNumber);
            if (apiFood.fdcId == 171691) {
                console.log('value:', value);
            }

            // convert nutrient value to float
            const floatValue = parseFloat(value);

            // round nutrient value to second decimal
            const roundedNutrientValue = Math.round(floatValue * 100) / 100;

            // multiply by fraction (x/100 where x is the amount of grams ate) 
            const amountedQuantity = roundedNutrientValue * amount;

            // assign to key
            cleanFood.nutrients[key][nutrientKey]["value"] = amountedQuantity;
            cleanFood.nutrients[key][nutrientKey]['unit'] = NUTRIENT_MAP[key][nutrientKey].unit;

            if (apiFood.fdcId == 171691) {
                console.log('amountedQuantity:', amountedQuantity);
            }

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

                    if (apiFood.fdcId == 171691) {
                        console.log('DRI values found for', nutrientKey, ':', driNutrientValues);
                    }
                }
            }
        });
    });



    if (apiFood.fdcId == 171691) {
        console.log('Final normalized food object:', cleanFood);
    }

    return cleanFood;
};