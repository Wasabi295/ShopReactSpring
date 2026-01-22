import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function RegisterPage() {
    const [form, setForm] = useState({ username: '', password: '', isAdmin: false });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/users/register', form);
            alert('Cont creat cu succes! Acum te poți loga.');
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.error || 'Eroare la înregistrare');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Creează cont</h2>
                <p className="text-gray-500 text-center mb-8">Înregistrează-te pentru a începe cumpărăturile</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nume utilizator</label>
                        <input
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            placeholder="ex: ionpop"
                            value={form.username}
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Parolă</label>
                        <input
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            type="password"
                            placeholder="Cel puțin 6 caractere"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            required
                            minLength={6}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="isAdmin"
                            checked={form.isAdmin}
                            onChange={(e) => setForm({ ...form, isAdmin: e.target.checked })}
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor="isAdmin" className="text-sm text-gray-700">
                            Cont de administrator
                        </label>
                        <span className="text-xs text-gray-400 ml-2">(Doar pentru staff)</span>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                            loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
                        }`}
                    >
                        {loading ? 'Se înregistrează...' : 'Creează cont'}
                    </button>

                    <p className="text-center text-gray-600 text-sm mt-6">
                        Ai deja cont?{' '}
                        <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
                            Loghează-te aici
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}