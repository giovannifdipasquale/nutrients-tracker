import React from 'react';
import { useFood } from '@/context/FoodContext';

const ResetButton = () => {

    const { resetFoodList } = useFood();
    const handleReset = () => {
        if (window.confirm('Are you sure you want to reset all data? This will clear your food list.')) {
            resetFoodList();
        }
    };

    return (
        <button
            onClick={handleReset}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
        >
            <i className="bi bi-arrow-counterclockwise"></i>
            <span>Reset App</span>
        </button>
    );
};

export default ResetButton;
