import React, { useEffect, useState } from 'react';
import { useFood } from '@/context/FoodContext';

function Summary() {
    const [isOpen, setIsOpen] = useState(false);
    const { foodList, removeFood } = useFood();
    const numberOfFood = foodList.length;
    useEffect(() => {
        if (numberOfFood === 0) {
            setIsOpen(false);
        }
    }, [foodList]);
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [setIsOpen]);
    return (
        <div>
            <button
                onClick={() => setIsOpen(true)}
                className={`relative text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 ${numberOfFood === 0 ? 'opacity-50' : ''}`}
                type="button"
                disabled={numberOfFood === 0}
            >
                My Foods
                <span className="absolute -top-2 -right-2 flex items-center justify-center bg-vibrant-coral text-coffee-bean text-xs font-medium h-5 w-5 rounded-full">
                    {numberOfFood}
                </span>
            </button>

            <div
                id="default-modal"
                tabIndex="-1"
                aria-hidden={!isOpen}
                className={`${isOpen ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black/50`}
            >
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-white-alt rounded-lg shadow-sm md:p-6">
                        <button onClick={() => setIsOpen(false)} className="absolute top-3 right-4 text-gray-400 hover:text-gray-900 text-xl font-bold">
                            ✕
                        </button>
                        <h3 className="text-center text-3xl font-bold pb-4"> MY FOODS </h3>
                        <div className="">
                            {foodList.map((food, index) => (
                                <div key={index} className="flex justify-between border-b border-gray-200">
                                    <div className='p-2'>{food.name}</div>
                                    <div className='p-2'>
                                        <button className='border border-vibrant-coral text-vibrant-coral hover-bg-vibrant-coral hover-text-white-alt font-medium px-2 rounded-md' onClick={() => removeFood(food.id)}>Remove</button>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Summary