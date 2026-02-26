import React, { createContext, useContext, useState, useEffect } from 'react';
import { normalizeFood } from '@/utils/foodMapper';

const FoodContext = createContext();

export const useFood = () => useContext(FoodContext);

export const FoodProvider = ({ children }) => {
    // Initial state reads from storage once
    const [foodList, setFoodList] = useState(() => {
        const stored = localStorage.getItem('myFoodList');
        return stored ? JSON.parse(stored) : [];
    });
    const [foods, setFoods] = useState([]);
    const [currentFood, setCurrentFood] = useState(null);

    // USE-EFFECT: Auto-save to storage whenever foodList changes
    useEffect(() => {
        localStorage.setItem('myFoodList', JSON.stringify(foodList));
        console.log(foodList);
    }, [foodList]);

    const getFoods = async (query = '') => {
        const API_KEY = import.meta.env.VITE_USDA_API_KEY;

        // If query is empty, valid search is needed, so we search 'standard' to populate list
        const searchTerm = query || 'raw';

        // We request distinct dataTypes to get the best data (Foundation is best)
        const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${searchTerm}&dataType=Foundation,SR%20Legacy&pageSize=25&api_key=${API_KEY}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data.foods);

            // 1. Transform Data using the Adapter (foodMapper.js)
            const processedFoods = (data.foods || []).map(food => normalizeFood(food, 1));

            // 2. Sort Logic: Alphabetical by name
            processedFoods.sort((a, b) => a.name.localeCompare(b.name));
            console.log(processedFoods);
            setFoods(processedFoods);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }

    // GET METHODS
    const getFoodById = async (fdcId = '') => {
        const API_KEY = import.meta.env.VITE_USDA_API_KEY;

        // If query is empty, valid search is needed, so we search 'standard' to populate list
        const searchTerm = fdcId || '';

        // We request distinct dataTypes to get the best data (Foundation is best)
        const url = `https://api.nal.usda.gov/fdc/v1/food/${searchTerm}?api_key=${API_KEY}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            const processedFood = normalizeFood(data);
            console.log(data);
            console.log(processedFood);

            return processedFood;
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }

    // ADD (+CHOOSE AMOUNT) / REMOVE / RESET
    const addFood = (foodToAdd, grams = 100) => {
        // stdzing foodToAdd structure 
        // const foodToAdd = {
        //     id: food.id,
        //     name: food.name,
        //     nutrients: {...}
        //     portions: [...]
        // }
        const foodToAddPlusGrams = {
            ...foodToAdd,
            grams: grams
        }
        setFoodList(prev => [...prev, foodToAddPlusGrams]);
        setCurrentFood(null);
    };
    const chooseAmount = async (food) => {
        const fdcId = food.id;
        const foodById = await getFoodById(fdcId);
        setCurrentFood(foodById);
    };

    const removeFood = (indexToRemove) => {
        setFoodList(prev => prev.filter((food) => food.id !== indexToRemove));
    };

    const resetFoodList = () => {
        setFoodList([]);
        localStorage.removeItem('myFoodList');
    };


    return (
        <FoodContext.Provider value={{ foodList, setFoodList, chooseAmount, addFood, removeFood, resetFoodList, foods, getFoods, currentFood, setCurrentFood }}>
            {children}
        </FoodContext.Provider>
    );
};