import React, { useState, useEffect } from 'react';
import { generateMealIdeas } from '@/services/aiGoogleGenAI';
const ConsultAI = ({ missingMacros }) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const handleConsultAI = () => {
        setShowSuggestions(!showSuggestions);
        console.log("Consult AI");
        const missingMeals = generateMealIdeas(missingMacros);
        console.log(missingMeals);

    };
    useEffect(() => {
        console.log(missingMacros);
    }, [missingMacros]);
    return (
        <div className="flex flex-col items-center w-full mt-6">
            <button
                onClick={handleConsultAI}

                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
                <i className="bi bi-stars mr-3"></i>
                Consult AI
            </button>

            {showSuggestions && (
                <div className="w-full max-w-2xl mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Placeholder for AI meal cards */}
                    <div className="border border-slate-200 rounded-xl p-4 shadow-sm bg-white">
                        <p className="text-slate-500 text-center py-4">Meals suggestions will appear here</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConsultAI;
