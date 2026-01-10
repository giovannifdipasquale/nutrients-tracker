import React, { useState, useEffect } from 'react';
import FoodCard from '@/components/FoodCard/FoodCard';
import { useFood } from '@/context/FoodContext';

const Search = () => {
    // --- STATE ---
    const [searchString, setSearchString] = useState('');
    const [loading, setLoading] = useState(false);

    const { getFoods } = useFood();
    const { foods } = useFood();

    // --- HANDLERS ---
    const handleSearch = async () => {
        setLoading(true);
        await getFoods(searchString);
        setLoading(false);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    // --- EFFECT (Initial Load) ---
    useEffect(() => {
        getFoods('Apple');
    }, []);

    // --- RENDER ---
    return (
        <div className="w-full max-w-md mx-auto p-4">

            {/* Results Section - Added padding bottom to prevent content from being hidden behind fixed search */}
            <div className="space-y-4 pb-20">
                {loading ? (
                    <p className="text-center text-gray-500 text-sm">Loading...</p>
                ) : (
                    // Pass the clean, normalized food object to the Card component
                    foods.map((food) => (
                        <FoodCard food={food} key={food.id} />
                    ))
                )}
            </div>

            {/* Search Input Section - Fixed at Bottom */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-40">
                <div className="max-w-md mx-auto relative">
                    <input
                        className="w-full bg-gray-50 text-slate-700 text-sm border border-slate-300 rounded-lg pl-4 pr-24 py-3 shadow-inner focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                        placeholder="Search food (e.g., Apple, Pasta)..."
                        value={searchString}
                        onChange={(e) => setSearchString(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        className="absolute top-1.5 right-1.5 bg-slate-800 text-white text-xs px-4 py-2 rounded-md hover:bg-slate-700 transition shadow-sm font-medium"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Search;