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
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
        >
            Reset App
        </button>
    );
};

export default ResetButton;
