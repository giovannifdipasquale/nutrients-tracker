import React, { useState } from 'react'
import { supabase } from '@/services/supabaseClient'
import { useNavigate, Link } from 'react-router'


export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setSuccess(false)
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        if (error) {
            setError(error.message)
        } else {
            console.log('Login successful', data);
            setSuccess(true)
            navigate('/')
        }
    }

    return (
        <div className='flex-1 flex flex-col justify-center items-center w-full px-4 mt-12'>
            <div className="w-full max-w-sm">
                <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl px-8 pt-8 pb-8 mb-4 border border-slate-100">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Welcome Back</h2>
                    <div className="mb-4">
                        <label className="block text-slate-700 text-sm font-semibold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input className="shadow-sm appearance-none border border-slate-300 rounded-lg w-full py-2.5 px-3 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
                    </div>
                    <div className="mb-6">
                        <label className="block text-slate-700 text-sm font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="shadow-sm appearance-none border border-slate-300 rounded-lg w-full py-2.5 px-3 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <div className="flex flex-col gap-4 mt-6">
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition" type="submit">
                            Log In
                        </button>
                    </div>
                    
                    <div className="mt-6 text-center">
                        <p className="text-sm text-slate-600">
                            Don't have an account?{' '}
                            <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-800 transition">Sign up</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}
