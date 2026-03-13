import React, { useState } from 'react';
import { generateMealIdeas } from '@/services/aiGoogleGenAI';

const ConsultAI = ({ missingMacros }) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleConsultAI = async () => {
        setShowSuggestions(!showSuggestions);
        if (!showSuggestions && meals.length === 0) {
            setLoading(true);
            const missingMeals = await generateMealIdeas(missingMacros);
            if (missingMeals) {
                setMeals(missingMeals);
            }
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center w-full mt-6">
            <button
                onClick={handleConsultAI}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center py-2 px-6 rounded-lg transition"
            >
                <i className="bi bi-stars mr-2"></i>
                <span>Consult AI</span>
            </button>

            {showSuggestions && (
                <div className="w-full max-w-4xl mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {loading ? (
                        <div className="col-span-full flex justify-center py-8">
                            <span className="text-slate-500">Loading suggestions...</span>
                        </div>
                    ) : (
                        meals.map((meal, index) => (
                            <div key={index} className="border border-slate-200 rounded-xl p-5 flex flex-col shadow-sm bg-white h-full">
                                <h3 className="text-lg font-bold text-slate-800 mb-2">{meal.meal_name}</h3>
                                <p className="text-sm text-slate-600 mb-4 flex-grow">{meal.short_description}</p>
                                <div className="mb-4">
                                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Ingredients</h4>
                                    <ul className="list-disc list-inside text-sm text-slate-700 flex flex-col gap-1">
                                        {meal.ingredients.map((item, id) => (
                                            <li key={id}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-auto grid grid-cols-4 gap-2 border-t border-slate-100 pt-4">
                                    <div className="text-center">
                                        <div className="text-xs text-slate-500">Kcal</div>
                                        <div className="font-semibold text-slate-800">{meal.macros.calories}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xs text-slate-500">Pro</div>
                                        <div className="font-semibold text-slate-800">{meal.macros.protein}g</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xs text-slate-500">Carb</div>
                                        <div className="font-semibold text-slate-800">{meal.macros.carbohydrates}g</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xs text-slate-500">Fat</div>
                                        <div className="font-semibold text-slate-800">{meal.macros.fat}g</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default ConsultAI;
