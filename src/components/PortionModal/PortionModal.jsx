import React, { useRef, useEffect, useState } from 'react';
import { useFood } from '@/context/FoodContext';
function PortionModal() {
    const { currentFood, setCurrentFood } = useFood();
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
            <div className="bg-white w-full flex flex-col">
                <header className="bg-violet-100 px-6 py-4 border-b border-violet-200">
                    <h2 className="text-xl font-bold uppercase text-slate-800 tracking-wide text-center">
                        {currentFood.description}
                    </h2>
                </header>

                <div className="p-6 space-y-8">
                    {/* Portion Selection */}
                    <div>
                        <p className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">
                            Select Portion
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {currentFood.foodPortions?.map((portion, index) => {
                                const isSelected = grams == portion.gramWeight;
                                return (
                                    <button
                                        key={index}
                                        onClick={() => setGrams(portion.gramWeight)}
                                        className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${isSelected
                                            ? 'border-violet-500 text-violet-700 bg-violet-50'
                                            : 'border-slate-100 text-slate-600 hover:border-violet-200 hover:text-slate-800'
                                            }`}
                                    >
                                        {portion.gramWeight}g
                                        {portion.portionDescription && <span className="block text-xs font-normal opacity-75">{portion.portionDescription}</span>}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Manual Input */}
                    <div>
                        <p className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">
                            Manual Input (g)
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={() => setGrams(Math.max(0, Number(grams) - 1))}
                                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition"
                            >
                                <span className="text-xl font-medium mb-1">-</span>
                            </button>

                            <div className="relative">
                                <input
                                    value={grams}
                                    onChange={(e) => setGrams(e.target.value)}
                                    type="number"
                                    className="w-24 text-center text-2xl font-bold text-slate-800 border-b-2 border-slate-200 focus:border-violet-500 outline-none py-1 bg-transparent"
                                />
                                <span className="absolute right-0 bottom-2 text-slate-400 text-sm font-medium">g</span>
                            </div>

                            <button
                                onClick={() => setGrams(Number(grams) + 1)}
                                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition"
                            >
                                <span className="text-xl font-medium mb-1">+</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex gap-4 pt-4 border-t border-slate-100">
                    <button
                        onClick={() => setCurrentFood(null)}
                        className="flex-1 py-3 px-4 rounded-lg text-slate-500 font-semibold hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                        Discard
                    </button>
                    <button
                        onClick={() => { /* TODO: Save logic */ }}
                        className="flex-1 py-3 px-4 rounded-lg bg-slate-800 text-white font-semibold shadow-lg hover:bg-slate-700 transition-all hover:shadow-xl active:scale-[0.98]"
                    >
                        Save
                    </button>
                </div>
            </div>
        </dialog>
    );
}


export default PortionModal