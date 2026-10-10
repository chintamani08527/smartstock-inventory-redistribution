import React, { useState } from 'react';
import { X, Bell, Mail, MessageSquare, Smartphone, Check, Save } from 'lucide-react';

export default function NotificationSettingsModal({ isOpen, onClose }) {
  const [settings, setSettings] = useState({
    dashboard: true,
    email: true,
    whatsapp: true,
    sms: false,
    whatsappNumber: '+91 98765 43210',
    emailAddress: 'rajesh@guptastores.com',
    alertTypes: {
      expiry: true,
      excess: true,
      lowStock: true,
      redistribution: true
    }
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-purple-100 text-purple-700 rounded-xl">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Notification Settings</h3>
              <p className="text-xs text-slate-500">Configure real-time shopkeeper alert channels</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          
          {/* Dashboard Notifications */}
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-xs font-bold text-slate-800">Dashboard In-App Alerts</p>
                <p className="text-[11px] text-slate-500">Show popups and top alert banners on dashboard</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.dashboard}
              onChange={(e) => setSettings(s => ({ ...s, dashboard: e.target.checked }))}
              className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
            />
          </div>

          {/* WhatsApp Notifications */}
          <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-xs font-bold text-emerald-900">WhatsApp Instant Alerts 🟢</p>
                <p className="text-[11px] text-emerald-700">Receive 1-click redistribution approvals on WhatsApp</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.whatsapp}
              onChange={(e) => setSettings(s => ({ ...s, whatsapp: e.target.checked }))}
              className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
            />
          </div>

          {/* Email Notifications */}
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="text-xs font-bold text-slate-800">Email Digest</p>
                <p className="text-[11px] text-slate-500">Daily morning summary of expiring stock</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.email}
              onChange={(e) => setSettings(s => ({ ...s, email: e.target.checked }))}
              className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
            />
          </div>

          {/* SMS Notifications */}
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-5 h-5 text-amber-600" />
              <div>
                <p className="text-xs font-bold text-slate-800">SMS Critical Alerts</p>
                <p className="text-[11px] text-slate-500">Emergency SMS for items expiring in &lt; 24 hours</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.sms}
              onChange={(e) => setSettings(s => ({ ...s, sms: e.target.checked }))}
              className="w-5 h-5 accent-amber-600 rounded cursor-pointer"
            />
          </div>

        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition flex items-center space-x-2 shadow-md"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Saved Preferences!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Alert Settings</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
