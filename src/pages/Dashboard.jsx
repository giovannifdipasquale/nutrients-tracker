import React, { useEffect, useState } from 'react';
import StatCard from '@/components/StatCard/StatCard';
import { useFood } from '@/context/FoodContext';

const Dashboard = () => {
    const { foodList } = useFood();
    const [totals, setTotals] = useState({});
    const generateTotalNutrients = (foodList) => {
        const objTotals = {};
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
                        objTotals[categoryKey][nutrientKey].percent = Math.round((objTotals[categoryKey][nutrientKey].value / driNutrientValues.rda) * 100);
                    }
                    else if ('ai' in driNutrientValues && driNutrientValues.ai !== null) {
                        objTotals[categoryKey][nutrientKey].percent = Math.round((objTotals[categoryKey][nutrientKey].value / driNutrientValues.ai) * 100);
                    }
                    else if ('ul' in driNutrientValues && driNutrientValues.ul !== null) {
                        objTotals[categoryKey][nutrientKey].percent = Math.round((objTotals[categoryKey][nutrientKey].value / driNutrientValues.ul) * 100);
                    }

                })
            })
        });
        setTotals(() => objTotals);
        console.log(objTotals);

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
        <div className='grid grid-cols-12 gap-1'>
            {totals.macros && <StatCard title="Macros" object={totals.macros} description="Total macros" />}
            {totals.micros && <StatCard title="Micros" object={totals.micros} description="Total micros" />}
        </div>
    );
};

export default Dashboard;
