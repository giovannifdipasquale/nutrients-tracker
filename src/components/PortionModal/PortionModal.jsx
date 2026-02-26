import React, { useRef, useEffect, useState } from 'react';
import { useFood } from '@/context/FoodContext';
function PortionModal() {
    const { currentFood, setCurrentFood, addFood } = useFood();
    const dialogRef = useRef(null);
    const [grams, setGrams] = useState(0);
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (currentFood) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    }, [currentFood]);

    if (!currentFood) return null;
    return (
        <dialog
            ref={dialogRef}
            className="m-auto rounded-xl shadow-2xl p-0 backdrop:bg-black/50 backdrop:backdrop-blur-sm overflow-hidden w-full max-w-md"
            onClose={() => setCurrentFood(null)}
        >
            <div className="bg-white-alt w-full flex flex-col">
                <header className="px-6 py-4 border-b border-coffee-bean" style={{ borderBottomColor: "rgba(33, 15, 4, 0.15)" }}>
                    <h2 className="text-xl font-bold uppercase text-coffee-bean tracking-wide text-center">
                        {currentFood.description}
                    </h2>
                </header>

                <div className="p-6 space-y-8">
                    {/* Portion Selection */}
                    <div>
                        <p className="text-sm font-semibold text-coffee-bean opacity-70 mb-3 uppercase tracking-wider">
                            Select Std Portions
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {currentFood.foodPortions?.map((portion, index) => {
                                const isSelected = grams == portion.gramWeight;
                                return (
                                    <button
                                        key={index}
                                        onClick={() => setGrams(portion.gramWeight)}
                                        className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${isSelected
                                            ? 'border-vibrant-coral text-vibrant-coral bg-white'
                                            : 'border-coffee-bean text-coffee-bean bg-white-alt hover:border-vibrant-coral hover:text-vibrant-coral'
                                            }`}
                                        style={!isSelected ? { borderColor: "rgba(33, 15, 4, 0.2)" } : {}}
                                    >
                                        ({portion.amount}&nbsp;{portion.modifier || 'unit'})&nbsp;
                                        {portion.gramWeight}g
                                        {portion.portionDescription && <span className="block text-xs font-normal opacity-75">{portion.portionDescription}</span>}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Manual Input */}
                    <div>
                        <p className="text-sm font-semibold text-coffee-bean opacity-70 mb-3 uppercase tracking-wider">
                            Manual Input (g)
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={() => setGrams(Math.max(0, Number(grams) - 1))}
                                className="w-10 h-10 rounded-full border border-coffee-bean bg-white-alt flex items-center justify-center text-coffee-bean opacity-80 hover:border-vibrant-coral hover:text-vibrant-coral hover:opacity-100 transition"
                                style={{ borderColor: "rgba(33, 15, 4, 0.2)" }}
                            >
                                <span className="text-xl font-medium mb-1">-</span>
                            </button>

                            <div className="relative">
                                <input
                                    value={grams}
                                    onChange={(e) => setGrams(e.target.value)}
                                    type="number"
                                    className="w-24 text-center text-2xl font-bold text-coffee-bean border-b-2 border-coffee-bean outline-none py-1 bg-transparent transition-colors focus:border-vibrant-coral"
                                    style={{ borderBottomColor: "rgba(33, 15, 4, 0.2)" }}
                                />
                                <span className="absolute right-0 bottom-2 text-coffee-bean opacity-50 text-sm font-medium">g</span>
                            </div>

                            <button
                                onClick={() => setGrams(Number(grams) + 1)}
                                className="w-10 h-10 rounded-full border border-coffee-bean bg-white-alt flex items-center justify-center text-coffee-bean opacity-80 hover:border-vibrant-coral hover:text-vibrant-coral hover:opacity-100 transition"
                                style={{ borderColor: "rgba(33, 15, 4, 0.2)" }}
                            >
                                <span className="text-xl font-medium mb-1">+</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex gap-4 pt-4 border-t border-coffee-bean p-6" style={{ borderTopColor: "rgba(33, 15, 4, 0.1)" }}>
                    <button
                        onClick={() => setCurrentFood(null)}
                        className="flex-1 py-3 px-4 rounded-lg text-coffee-bean opacity-70 font-semibold hover:text-vibrant-coral transition-colors"
                    >
                        Discard
                    </button>
                    <button
                        onClick={() => {
                            addFood(currentFood, grams)
                        }}
                        className="flex-1 py-3 px-4 rounded-lg bg-coffee-bean text-white-alt font-semibold shadow-lg hover:opacity-90 hover:shadow-xl active:scale-[0.98] transition-all"
                    >
                        Save
                    </button>
                </div>
            </div>
        </dialog>
    );
}


export default PortionModal