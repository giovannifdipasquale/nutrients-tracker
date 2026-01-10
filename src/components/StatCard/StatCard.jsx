import React, { useEffect } from 'react';

const StatCard = ({ title, object, description }) => {
    useEffect(() => {
        const storedFood = localStorage.getItem('myFoodList');
        const parsedFood = JSON.parse(storedFood || '[]');
    }, []);
    return (
        <div className="sm:col-span-6 col-span-12 bg-white rounded-lg shadow-xl overflow-hidden m-4">
            <div className="bg-violet-100 px-4 py-3 font-semibold text-md uppercase text-center">
                {title}
            </div>
            <div className="p-4">
                <div className="border border-violet-100 rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                        <tbody>
                            {object && Object.keys(object).map((key, index, arr) => {
                                const isLastRow = index === arr.length - 1;
                                return (
                                    <tr
                                        className={`border-b border-lavender ${isLastRow ? 'border-b-0' : ''}`}
                                        key={key}
                                        style={{
                                            background: `linear-gradient(to right, #fef2f2 ${object[key].percent || 0}%, transparent ${object[key].percent || 0}%)`
                                        }}
                                    >
                                        <td className="p-2 font-medium text-slate-600 pl-3">{key}</td>
                                        <td className="p-2 pr-3 text-right text-slate-500">{object[key].value} {object[key].unit}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StatCard;
