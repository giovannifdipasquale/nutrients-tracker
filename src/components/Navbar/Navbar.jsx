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
            <div className="relative w-full p-4 flex justify-between items-center">
                <div className="flex gap-4 items-center z-10">
                    {user ? (
                        <>
                            <Link to="/dashboard" className="bg-emerald-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-emerald-700 transition">
                                <i className="bi bi-microsoft"></i>
                                <span>Dashboard</span>
                            </Link>
                            <button onClick={signOut} className="border border-slate-300 text-slate-700 px-4 py-2 rounded flex items-center gap-2 hover:bg-slate-100 transition">
                                <i className="bi bi-box-arrow-right"></i>
                                <span>Sign Out</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-slate-600 hover:text-slate-900 px-4 py-2 font-medium flex items-center gap-2 transition">
                                <i className="bi bi-box-arrow-in-right"></i>
                                <span>Login</span>
                            </Link>
                            <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700 transition">
                                <i className="bi bi-person-plus"></i>
                                <span>Sign Up</span>
                            </Link>
                        </>
                    )}
                </div>

                {!user && (
                    <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 shadow-sm">
                            <i className="bi bi-info-circle-fill"></i>
                            <span>Sign up or log in to start saving your foods!</span>
                        </div>
                    </div>
                )}

                <div className="flex gap-4 items-center z-10">
                    {user && <Summary />}
                    <Link to="/" className="text-slate-600 hover:text-slate-900 px-3 py-2 font-medium flex items-center gap-2">
                        <i class="bi bi-house-door-fill"></i>

                        <span>Home</span>
                    </Link>
                    <ResetButton />
                </div>
            </div>
            <PortionModal />
        </div>
    );
};

export default Navbar;
