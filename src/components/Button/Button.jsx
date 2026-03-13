import React from 'react'
import { useFood } from '@/context/FoodContext';
import { useAuth } from '@/context/AuthProvider';

function Button({ food }) {
    const { user } = useAuth();
    const { chooseAmount } = useFood();

    if (!user) {
        return (
            <div>
                <button disabled className="bg-slate-200 text-white text-xs px-3 py-1.5 rounded transition cursor-not-allowed">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                </button>
            </div>
        )
    }
    else {
        return (
            <div>
                <button onClick={() => chooseAmount(food)} className="bg-slate-800 text-white text-xs px-3 py-1.5 rounded hover:bg-slate-700 transition cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                </button>
            </div>
        )
    }
}
export default Button
//     < svg xmlns = "http://www.w3.org/2000/svg" fill = "none" viewBox = "0 0 24 24" strokeWidth = { 1.5} stroke = "currentColor" className = "size-6" >
//         <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
// </svg >
