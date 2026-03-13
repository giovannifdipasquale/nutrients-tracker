import React, { createContext, useContext, useState, useEffect } from 'react';
import { normalizeFood } from '@/utils/foodMapper';
import { supabase } from '@/services/supabaseClient';
import { useAuth } from './AuthProvider';
const FoodContext = createContext();

export const useFood = () => useContext(FoodContext);

export const FoodProvider = ({ children }) => {
    // Initial state reads from storage once
    const [foodList, setFoodList] = useState([]);
    const [foods, setFoods] = useState([]);
    const [currentFood, setCurrentFood] = useState(null);
    const { user } = useAuth();
    // // USE-EFFECT: Auto-save to storage whenever foodList changes
    // useEffect(() => {
    //     localStorage.setItem('myFoodList', JSON.stringify(foodList));
    //     console.log(foodList);
    // }, [foodList]);
    // Function to load data from DB
    const fetchFoodList = async () => {
        const { data, error } = await supabase
            .from('my_food_list')
            .select('*')
            .order('created_at', { ascending: false }); // The most recent first

        if (error) {
            console.error("Error loading:", error);
        } else {
            // Map the data to return it to the format that your frontend expects
            const formattedData = data.map(item => ({
                db_id: item.db_id, // The new ID of Supabase
                id: item.usda_id,   // The original USDA ID
                name: item.name,
                grams: item.grams,
                nutrients: item.raw_data   // Spread the nutrients saved in JSONB
            }));
            setFoodList(formattedData);
        }
    };

    // When mounted -> fetch food list from db
    useEffect(() => {
        fetchFoodList();
    }, [user]);
    
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
    const addFood = async (foodToAdd, grams = 100) => {
        // stdzing foodToAdd structure 
        // const foodToAdd = {
        //     id: food.id,
        //     name: food.name,
        //     nutrients: {...}
        //     portions: [...]
        // }
        // preparing food structure for database
        const newFoodRow = {
            usda_id: foodToAdd.id.toString(),
            name: foodToAdd.name,
            grams: grams,
            raw_data: foodToAdd.nutrients
        };
        const { data, error } = await supabase
            .from('my_food_list')
            .insert([newFoodRow])
            .select()
            .single();

        // Error handling
        if (error) {
            console.error("Error saving food to DB:", error.message);
            return;
        }
        console.log("Food saved in Supabase! Here is the generated row:", data);
        const newlyAddedFood = {
            db_id: data.db_id,
            id: data.usda_id,
            name: data.name,
            grams: data.grams,
            nutrients: data.raw_data
        };
        setFoodList(prev => [newlyAddedFood, ...prev]);
        console.log(foodList);

        setCurrentFood(null);
    };
    const chooseAmount = async (food) => {
        const fdcId = food.id;
        const foodById = await getFoodById(fdcId);
        setCurrentFood(foodById);
    };

    const removeFood = async (db_idToRemove) => {
        const { error } = await supabase
            .from('my_food_list')
            .delete()
            .eq('db_id', db_idToRemove);

        if (error) {
            console.error("Error deleting food from DB:", error.message);
            return;
        }
        setFoodList(prev => prev.filter((food) => food.db_id !== db_idToRemove));
    };

    const resetFoodList = async () => {
        // remove ever row from table
        const { error } = await supabase
            .from("my_food_list")
            .delete()
            .neq("usda_id", 0);

        if (error) {
            console.error("Error deleting food from DB:", error.message);
            return;
        }
        // empty food list
        setFoodList([]);
        localStorage.removeItem("myFoodList");
    };


    return (
        <FoodContext.Provider value={{ foodList, setFoodList, chooseAmount, addFood, removeFood, resetFoodList, foods, getFoods, currentFood, setCurrentFood }}>
            {children}
        </FoodContext.Provider>
    );
};