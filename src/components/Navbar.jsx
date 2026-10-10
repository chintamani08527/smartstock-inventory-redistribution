import React, { useState } from 'react';
import { 
  Store, 
  Scan, 
  Bell, 
  User, 
  LogOut, 
  Globe, 
  Sparkles, 
  ChevronDown, 
  Check, 
  Volume2,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

export default function Navbar({
  stores,
  selectedStoreId,
  onSelectStore,
  user,
  onLogout,
  onOpenBarcodeScanner,
  onOpenNotifications,
  unreadAlertCount,
  currentLang,
  onChangeLang,
  onTriggerVoiceSummary,
  onResetData
}) {
  const [showStoreDropdown, setShowStoreDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const selectedStore = stores.find(s => s.id === selectedStoreId);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Slogan */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white p-2.5 rounded-xl shadow-sm flex items-center justify-center">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-600 bg-clip-text text-transparent">
                  SmartStock
                </span>
                <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Tier-2 Retail AI
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden md:block">
                Inventory Expiry & Multi-Branch Redistribution Engine
              </p>
            </div>
          </div>

          {/* Active Store Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowStoreDropdown(!showStoreDropdown)}
              className="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1.5 rounded-xl text-sm font-semibold transition border border-slate-200"
            >
              <Store className="w-4 h-4 text-blue-600" />
              <span className="max-w-[150px] sm:max-w-[220px] truncate">
                {selectedStoreId === 'ALL' ? '🏪 All Store Branches (Multi-Store)' : selectedStore?.shortName || selectedStore?.name}
              </span>
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </button>

            {showStoreDropdown && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Select Active Store / Branch
                </div>
                <button
                  onClick={() => { onSelectStore('ALL'); setShowStoreDropdown(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-blue-50 transition ${selectedStoreId === 'ALL' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'}`}
                >
                  <span className="flex items-center space-x-2">
                    <span>🏬</span>
                    <span>All Stores Combined</span>
                  </span>
                  {selectedStoreId === 'ALL' && <Check className="w-4 h-4 text-blue-600" />}
                </button>
                <div className="border-t border-slate-100 my-1"></div>
                {stores.map(store => (
                  <button
                    key={store.id}
                    onClick={() => { onSelectStore(store.id); setShowStoreDropdown(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-slate-50 transition ${selectedStoreId === store.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'}`}
                  >
                    <div>
                      <p className="font-medium">{store.shortName}</p>
                      <p className="text-xs text-slate-400 truncate">{store.location}</p>
                    </div>
                    {selectedStoreId === store.id && <Check className="w-4 h-4 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Action Icons & User Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3">

            {/* Quick Barcode Scanner Button */}
            <button
              onClick={onOpenBarcodeScanner}
              className="flex items-center space-x-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-xl text-sm font-semibold transition border border-indigo-200"
              title="Scan Product Barcode"
            >
              <Scan className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">Scan Barcode</span>
            </button>

            {/* Voice Audio Readout Button */}
            <button
              onClick={onTriggerVoiceSummary}
              className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition relative"
              title="Listen to Today's Inventory Summary (Audio Assist)"
            >
              <Volume2 className="w-5 h-5 text-blue-600" />
            </button>

            {/* Language Selector */}
            <select
              value={currentLang}
              onChange={(e) => onChangeLang(e.target.value)}
              className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-slate-200 outline-none cursor-pointer hidden md:block"
            >
              <option value="EN">🇬🇧 English</option>
              <option value="HI">🇮🇳 हिंदी (Hindi)</option>
              <option value="HINGLISH">🇮🇳 Hinglish</option>
            </select>

            {/* Notification Bell Button */}
            <button
              onClick={onOpenNotifications}
              className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition relative"
              title="View Alerts & Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadAlertCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-xs">
                  {unreadAlertCount}
                </span>
              )}
            </button>

            {/* Reset Data Button */}
            <button
              onClick={onResetData}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition hidden lg:block"
              title="Reset Demo Data to Initial State"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* User Profile Avatar Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center space-x-2 pl-2 border-l border-slate-200"
              >
                <div className="w-9 h-9 bg-blue-100 text-blue-800 font-bold rounded-xl flex items-center justify-center text-base border border-blue-200">
                  {user?.avatar || '👨‍💼'}
                </div>
                <div className="text-left hidden lg:block">
                  <p className="text-xs font-bold text-slate-800 leading-none">{user?.name || 'Shopkeeper'}</p>
                  <p className="text-[10px] text-slate-400 leading-tight mt-0.5">{user?.role || 'Store Owner'}</p>
                </div>
              </button>

              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="font-bold text-sm text-slate-800">{user?.name}</p>
                    <p className="text-xs text-slate-500">{user?.phone}</p>
                    <span className="inline-block mt-1 bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Verified Shopkeeper
                    </span>
                  </div>
                  <button
                    onClick={() => { onResetData(); setShowUserDropdown(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-600 hover:bg-slate-50 flex items-center space-x-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Demo Data</span>
                  </button>
                  <button
                    onClick={() => { onLogout(); setShowUserDropdown(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center space-x-2 font-semibold"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
