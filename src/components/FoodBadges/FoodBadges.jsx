import React from 'react';
import { useFood } from '@/context/FoodContext';

const FoodBadges = () => {
    const { foodList, removeFood } = useFood();

    return (
        <div className="w-full bg-white border-b border-gray-100 py-3 px-4 shadow-sm overflow-x-auto">
            <div className="flex gap-4 flex-wrap">
                {foodList && foodList.map((food, index) => (
                    <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200"
                    >
                        {food.name || 'Unknown Food'}
                        <button
                            type="button"
                            className="flex-shrink-0 ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-emerald-600 hover:bg-emerald-200 hover:text-emerald-500 focus:outline-none focus:bg-emerald-500 focus:text-white"
                            onClick={() => removeFood(index)}
                        >
                            <span className="sr-only">Remove {food.name}</span>
                            <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                                <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                            </svg>
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default FoodBadges;
