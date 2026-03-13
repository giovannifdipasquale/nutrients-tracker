import React, { useEffect, useState } from 'react';
import StatCard from '@/components/StatCard/StatCard';
import { useFood } from '@/context/FoodContext';
import ConsultAI from '../components/ConsultAI/ConsultAI';
const Dashboard = () => {
    const { foodList } = useFood();
    const [totals, setTotals] = useState({});
    const [missingMacros, setMissingMacros] = useState({});
    // generating totals of nutrients
    const generateTotalNutrients = (foodList) => {
        const objTotals = {};
        const objMissingNutrients = {};
        // summing all the nutrients
        foodList.forEach((food) => {
            Object.keys(food.nutrients).forEach((categoryKey) => {
                if (!objTotals[categoryKey]) {
                    objTotals[categoryKey] = {};
                }
                Object.keys(food.nutrients[categoryKey]).forEach((nutrientKey) => {
                    if (!objTotals[categoryKey][nutrientKey]) {
                        objTotals[categoryKey][nutrientKey] = {
                            value: 0,
                            unit: food.nutrients[categoryKey][nutrientKey].unit,
                            percent: 0
                        };
                    }
                    objTotals[categoryKey][nutrientKey].value += parseFloat(food.nutrients[categoryKey][nutrientKey].value);
                    objTotals[categoryKey][nutrientKey].value = Math.round(objTotals[categoryKey][nutrientKey].value * 100) / 100;
                    const driNutrientValues = food.nutrients[categoryKey][nutrientKey];
                    if ('rda' in driNutrientValues && driNutrientValues.rda !== null) {
                        // percent part
                        objTotals[categoryKey][nutrientKey].percent = Math.round((objTotals[categoryKey][nutrientKey].value / driNutrientValues.rda) * 100);
                        // missing part
                        objTotals[categoryKey][nutrientKey].missing = Math.round((driNutrientValues.rda - objTotals[categoryKey][nutrientKey].value) * 100) / 100;
                        console.log(objTotals[categoryKey][nutrientKey].missing);
                        if (objTotals[categoryKey][nutrientKey].missing == 'carbs') {
                            console.log('carbds');

                        }


                        // full part
                        objTotals[categoryKey][nutrientKey].full = Math.round((driNutrientValues.rda) * 100) / 100;
                        // missing macros part
                        // if (objTotals[categoryKey][nutrientKey].missing) {
                        //     objMissingNutrients[categoryKey][nutrientKey] = objTotals[categoryKey][nutrientKey].missing;
                        // }


                    }
                    else if ('ai' in driNutrientValues && driNutrientValues.ai !== null) {
                        // percent part
                        objTotals[categoryKey][nutrientKey].percent = Math.round((objTotals[categoryKey][nutrientKey].value / driNutrientValues.ai) * 100);
                        // missing part
                        objTotals[categoryKey][nutrientKey].missing = Math.round((driNutrientValues.ai - objTotals[categoryKey][nutrientKey].value) * 100) / 100;
                        // full part
                        objTotals[categoryKey][nutrientKey].full = Math.round((driNutrientValues.ai) * 100) / 100;
                        // missing macros part
                        // if (objTotals[categoryKey][nutrientKey].missing) {
                        //     objMissingNutrients[categoryKey][nutrientKey].value = objTotals[categoryKey][nutrientKey].missing;
                        // }
                    }
                    else if ('ul' in driNutrientValues && driNutrientValues.ul !== null) {
                        //  percent part
                        objTotals[categoryKey][nutrientKey].percent = Math.round((objTotals[categoryKey][nutrientKey].value / driNutrientValues.ul) * 100);
                        // missing part
                        objTotals[categoryKey][nutrientKey].missing = Math.round((driNutrientValues.ul - objTotals[categoryKey][nutrientKey].value) * 100) / 100;
                        // full part
                        objTotals[categoryKey][nutrientKey].full = Math.round(driNutrientValues.ul * 100) / 100;
                        // missing macros part
                        // if (objTotals[categoryKey][nutrientKey].missing) {
                        //     objMissingNutrients[categoryKey][nutrientKey].value = objTotals[categoryKey][nutrientKey].missing;
                        // }
                    }
                    const missingAmount = objTotals[categoryKey][nutrientKey].missing;
                    if (missingAmount > 0) {
                        if (!objMissingNutrients[categoryKey]) {
                            objMissingNutrients[categoryKey] = {};
                        }
                        objMissingNutrients[categoryKey][nutrientKey] = missingAmount;
                    }

                })
            })
        });
        setTotals(() => objTotals);
        setMissingMacros(() => objMissingNutrients.macros);
        console.log(objTotals);
        console.log(objMissingNutrients);

    }
    useEffect(() => {
        generateTotalNutrients(foodList);

    }, [foodList]);

    if (!totals.micros && !totals.macros) return (
        <div className="flex justify-center items-center h-screen">
            <p> Nessun cibo aggiunto</p>
        </div>
    );
    return (
        <>
            <div className="grid grid-cols-12 gap-1">
                {totals.macros && (
                    <StatCard
                        title="Macros"
                        object={totals.macros}
                        description="Total macros"
                    />
                )}
                {totals.micros && (
                    <StatCard
                        title="Micros"
                        object={totals.micros}
                        description="Total micros"
                    />
                )}
            </div>
            <ConsultAI missingMacros={missingMacros} />
        </>
    );
};

export default Dashboard;
