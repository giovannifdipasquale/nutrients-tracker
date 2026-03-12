import React, { useState } from 'react'
import { supabase } from '@/supabaseClient'
import { useNavigate } from 'react-router'


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
        <div className='flex justify-center items-center h-screen'>
            <div className="w-full max-w-xs">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    </div>
                    {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Login
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    &copy;2024 Acme Corp. All rights reserved.
                </p>
            </div>
        </div>
    )
}
