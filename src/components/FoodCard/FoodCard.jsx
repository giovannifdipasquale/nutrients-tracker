import React from 'react';
import Button from '@/components/Button/Button';
const FoodCard = ({ food }) => {
    const nutrients = food.nutrients;
    return (
        <div className="bg-white-alt rounded-lg shadow-xl overflow-hidden mb-4 border border-coffee-bean" style={{ borderColor: "rgba(33, 15, 4, 0.1)" }}>
            <div
                className="flex px-4 py-3 font-semibold text-coffee-bean flex justify-between items-center border-b border-coffee-bean"
                style={{ borderBottomColor: "rgba(33, 15, 4, 0.15)" }}
            >
                <div>
                    {food.name}
                    <span className="text-xs mx-3 text-coffee-bean opacity-60">(100g)</span>
                </div>
                <div>
                    <Button food={food} />
                </div>
            </div>
            <div className="p-4 flex flex-wrap gap-4 justify-around">
                {nutrients && Object.keys(nutrients).map((key) => {
                    return (
                        <div className="flex-1 min-w-[200px]" key={key}>
                            <div className="">
                                <div
                                    className="border border-coffee-bean rounded-lg overflow-hidden bg-white shadow-sm"
                                    style={{ borderColor: "rgba(33, 15, 4, 0.15)" }}
                                >
                                    <table className="w-full text-sm">
                                        <tbody className="w-full">
                                            {Object.keys(nutrients[key]).map((nutrientKey, index, arr) => {
                                                const isLastRow = index === arr.length - 1;
                                                return (
                                                    <tr
                                                        className={`w-full border-b border-coffee-bean ${isLastRow ? 'border-b-0' : ''}`}
                                                        style={!isLastRow ? { borderBottomColor: "rgba(33, 15, 4, 0.1)" } : {}}
                                                        key={nutrientKey}
                                                    >
                                                        <td className="p-3 font-medium text-coffee-bean opacity-80">{nutrientKey}</td>
                                                        <td className="p-3 text-right text-coffee-bean opacity-60">{nutrients[key][nutrientKey].value} {nutrients[key][nutrientKey].unit}</td>
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