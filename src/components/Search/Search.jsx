import React, { useState, useEffect } from 'react';
import FoodCard from '@/components/FoodCard/FoodCard';
import { useFood } from '@/context/FoodContext';
import Spinner from '../Spinner/Spinner';

const Search = () => {
    // --- STATE ---
    const [searchString, setSearchString] = useState('');
    const [loading, setLoading] = useState(false);

    const { getFoods } = useFood();
    const { foods } = useFood();

    // --- HANDLERS ---
    const handleSearch = async () => {
        setLoading(true);
        if (searchString === '') {
            await getFoods('Apple');
        } else {
            await getFoods(searchString);
        }
        setLoading(false);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    // --- EFFECT (Initial Load) ---
    useEffect(() => {
        handleSearch();
    }, []);
    // --- RENDER ---
    return (
        <div className="w-full max-w-2xl">

            {/* Results Section - Added padding bottom to prevent content from being hidden behind fixed search */}
            <div className="space-y-4 pb-20">
                {loading ? (
                    <div className="flex justify-center items-center h-64 transform scale-125">
                        <Spinner />
                    </div>
                ) : (
                    // Pass the clean, normalized food object to the Card component
                    foods.map((food) => (
                        <FoodCard food={food} key={food.id} />
                    ))
                )}
            </div>

            {/* Search Input Section - Fixed at Bottom */}
            <div
                className="fixed bottom-0 left-0 right-0 bg-white-alt border-t border-coffee-bean p-4 shadow-lg z-40 transition-colors"
                style={{ borderTopColor: "rgba(33, 15, 4, 0.15)" }}
            >
                <div className="max-w-md mx-auto relative">
                    <input
                        className="w-full bg-white text-coffee-bean text-sm border border-coffee-bean rounded-lg pl-4 pr-24 py-3 shadow-inner focus:outline-none focus:border-vibrant-coral focus:ring-1 focus:ring-vibrant-coral transition-colors"
                        style={{ borderColor: "rgba(33, 15, 4, 0.2)" }}
                        placeholder="Search food (e.g., Apple, Pasta)..."
                        value={searchString}
                        onChange={(e) => setSearchString(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        className="absolute top-1.5 right-1.5 bg-coffee-bean text-white-alt text-xs px-4 py-2 rounded-md hover:opacity-90 transition shadow-sm font-medium active:scale-[0.98]"
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