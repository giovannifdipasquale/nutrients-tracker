import React from 'react';
import Button from '@/components/Button/Button';
const FoodCard = ({ food }) => {
    const nutrients = food.nutrients;
    return (
        <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-4">
            <div className="flex bg-violet-100 px-4 py-3 font-semibold text-slate-800 flex justify-between items-center">
                <div>
                    {food.name}
                    <span className="text-xs text-gray-400">(100g)</span>
                </div>
                <div>
                    <Button food={food} />
                </div>
            </div>
            <div className="p-4 space-y-4 flex justify-around">

                {nutrients && Object.keys(nutrients).map((key) => {
                    return (
                        <div key={key}>
                            <div className="">
                                <div className="border border-violet-100 rounded-lg overflow-hidden">
                                    <table className="w-full text-sm">
                                        <tbody>
                                            {Object.keys(nutrients[key]).map((nutrientKey, index, arr) => {
                                                const isLastRow = index === arr.length - 1;
                                                return (
                                                    <tr className={`border-b border-lavender ${isLastRow ? 'border-b-0' : ''}`} key={nutrientKey}>
                                                        <td style={{ width: '90%' }} className="bg-gray-50 p-2 font-medium text-slate-600">{nutrientKey}</td>
                                                        <td className="p-2 text-right text-slate-500">{nutrients[key][nutrientKey].value} {nutrients[key][nutrientKey].unit}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )
                })}


            </div>
        </div>
    );
};

export default FoodCard;