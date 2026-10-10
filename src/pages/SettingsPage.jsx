import React, { useState } from 'react';
import { Settings, RefreshCw, Save, ShieldCheck, Globe, Store, User, Bell } from 'lucide-react';

export default function SettingsPage({ user, onResetData, currentLang, onChangeLang }) {
  const [storeName, setStoreName] = useState('Gupta General Store');
  const [managerName, setManagerName] = useState(user?.name || 'Rajesh Kumar');
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">System Settings & Store Profile</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure shopkeeper profile, language preferences, and demo system reset
        </p>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
        
        <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
          <div className="p-2.5 bg-blue-100 text-blue-700 rounded-2xl">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-800">Shopkeeper Account Profile</h3>
            <p className="text-xs text-slate-500">Owner contact & store identification</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Shopkeeper Name</label>
            <input
              type="text"
              value={managerName}
              onChange={(e) => setManagerName(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Store / Business Name</label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Interface Language</label>
            <select
              value={currentLang}
              onChange={(e) => onChangeLang(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="EN">🇬🇧 English</option>
              <option value="HI">🇮🇳 हिंदी (Hindi)</option>
              <option value="HINGLISH">🇮🇳 Hinglish</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">System Version</label>
            <input
              type="text"
              disabled
              value="SmartStock SaaS v2.4 (Tier-2 AI Active)"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-500 font-mono"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          {savedMessage && (
            <span className="text-xs font-bold text-emerald-600">
              ✓ Settings saved successfully!
            </span>
          )}
          <div className="flex items-center space-x-3 ml-auto">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md transition flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </div>
        </div>

      </form>

      {/* Demo Reset Card */}
      <div className="bg-red-50/70 rounded-3xl p-6 border border-red-200 flex items-center justify-between">
        <div>
          <h3 className="text-base font-extrabold text-red-900">Reset Demo System Data</h3>
          <p className="text-xs text-red-700 mt-1 max-w-lg">
            Restore all initial 5 store branches, 20+ realistic Indian retail products, active redistribution transfers, and priority alerts back to clean demo state.
          </p>
        </div>

        <button
          onClick={onResetData}
          className="bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold px-5 py-3 rounded-xl shadow-md transition flex items-center space-x-2 shrink-0"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reset All Demo Data</span>
        </button>
      </div>

    </div>
  );
}
