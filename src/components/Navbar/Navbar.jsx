import React from 'react';
import { Link } from 'react-router';
import { useAuth } from '@/context/AuthProvider';
import { supabase } from '@/services/supabaseClient';
import Summary from '../Summary/Summary.jsx';
import ResetButton from '../ResetButton/ResetButton.jsx';
import PortionModal from '../PortionModal/PortionModal.jsx';

const Navbar = () => {
    const { user } = useAuth();
    async function signOut() {
        const { error } = await supabase.auth.signOut()
    }

    return (
        <div className="sticky top-0 z-50 bg-white shadow-md w-full">
            <div className="w-full p-4 flex justify-between items-center">
                <div className="flex gap-4 items-center">
                    {user ? (
                        <>
                            <Link to="/dashboard" className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition">Dashboard</Link>
                            <button onClick={signOut} className="border border-slate-300 text-slate-700 px-4 py-2 rounded hover:bg-slate-100 transition">Sign Out</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-slate-600 hover:text-slate-900 px-4 py-2 font-medium transition">Login</Link>
                            <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Sign Up</Link>
                        </>
                    )}
                </div>
                <div className="flex gap-4 items-center">
                    <Summary />
                    <Link to="/" className="text-slate-600 hover:text-slate-900 px-3 py-2 font-medium">Home</Link>
                    <ResetButton />
                </div>
            </div>
            <PortionModal />
        </div>
    );
};

export default Navbar;
