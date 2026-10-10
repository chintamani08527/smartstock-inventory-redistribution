import React, { useState } from 'react';
import { Sparkles, Store, ShieldCheck, ArrowRight, UserCheck, KeyRound, Building, Phone } from 'lucide-react';
import { DEMO_USERS } from '../data/mockData';

export default function LoginPage({ onLoginSuccess }) {
  const [phoneOrEmail, setPhoneOrEmail] = useState('9876543210');
  const [password, setPassword] = useState('shopkeeper123');
  const [storeName, setStoreName] = useState('Gupta General Store');
  const [storeLocation, setStoreLocation] = useState('Indiranagar, Bengaluru');
  const [storeType, setStoreType] = useState('Supermarket / Grocery');
  const [employees, setEmployees] = useState('8');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess({
      name: 'Rajesh Kumar',
      role: 'Master Admin / Owner',
      phone: phoneOrEmail,
      storeName: storeName,
      storeLocation: storeLocation,
      avatar: '👨‍💼'
    });
  };

  const handleQuickLogin = (user) => {
    onLoginSuccess({
      name: user.name,
      role: user.role,
      phone: user.phone,
      storeName: user.mainStore,
      avatar: user.avatar
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-slate-700">
        
        {/* Left Branding Banner */}
        <div className="bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <Sparkles className="w-8 h-8 text-blue-300 animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight">SmartStock</h1>
                <p className="text-xs text-blue-200 font-medium">Inventory Expiry & Redistribution Alert System</p>
              </div>
            </div>

            <div className="space-y-4 my-8">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  <strong>Zero Waste Guarantee:</strong> Automatically detects products expiring in 1-7 days.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  <strong>Inter-Store Redistribution:</strong> Move excess stock from Store A to high-demand Store B before loss occurs.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  <strong>Tier-2 Shopkeeper Friendly:</strong> Large text, 1-click approvals, Hinglish & audio support.
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-blue-300">
            <span>Powered by Smart AI Engine</span>
            <span className="bg-blue-500/20 px-2.5 py-1 rounded-full text-[10px] font-bold text-white uppercase">v2.4 Live</span>
          </div>

          {/* Decorative SVG Circles */}
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-blue-600/20 rounded-full blur-2xl"></div>
        </div>

        {/* Right Login & Setup Form */}
        <div className="p-8 flex flex-col justify-center space-y-6">
          
          <div>
            <span className="text-xs font-extrabold text-blue-600 tracking-wider uppercase">Shopkeeper Portal</span>
            <h2 className="text-2xl font-extrabold text-slate-800 mt-1">Welcome Back 👋</h2>
            <p className="text-xs text-slate-500 mt-1">Log in to manage your inventory health & branch transfers</p>
          </div>

          {/* Preset Quick Login Buttons */}
          <div className="space-y-2">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Quick Demo Login (1-Click):</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {DEMO_USERS.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => handleQuickLogin(user)}
                  className="flex items-center space-x-2 p-2.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl transition text-left text-xs"
                >
                  <span className="text-xl">{user.avatar}</span>
                  <div className="truncate">
                    <p className="font-bold text-slate-800 truncate">{user.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">{user.role}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-3 text-[10px] text-slate-400 font-bold uppercase">Or Log In Manually</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number or Email</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={phoneOrEmail}
                  onChange={(e) => setPhoneOrEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center space-x-2 text-sm"
            >
              <span>Access Shopkeeper Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
