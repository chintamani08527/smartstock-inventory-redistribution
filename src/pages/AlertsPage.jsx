import React, { useState } from 'react';
import { Bell, Check, X, Eye, Settings, Filter, Sparkles, MessageSquare } from 'lucide-react';

export default function AlertsPage({ alerts, products, stores, onAcceptAlert, onRejectAlert, onOpenProductDetail, onOpenNotificationSettings }) {
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const filteredAlerts = categoryFilter === 'ALL'
    ? alerts
    : alerts.filter(a => a.categoryCode === categoryFilter);

  const getAlertColorClasses = (color) => {
    switch (color) {
      case 'red': return 'bg-red-50 border-red-200 text-red-900';
      case 'orange': return 'bg-orange-50 border-orange-200 text-orange-900';
      case 'yellow': return 'bg-yellow-50 border-yellow-200 text-yellow-900';
      case 'blue': return 'bg-blue-50 border-blue-200 text-blue-900';
      case 'purple': return 'bg-purple-50 border-purple-200 text-purple-900';
      default: return 'bg-slate-50 border-slate-200 text-slate-900';
    }
  };

  const getBadgeClass = (color) => {
    switch (color) {
      case 'red': return 'bg-red-600 text-white';
      case 'orange': return 'bg-orange-500 text-white';
      case 'yellow': return 'bg-yellow-500 text-white';
      case 'blue': return 'bg-blue-600 text-white';
      case 'purple': return 'bg-purple-600 text-white';
      default: return 'bg-slate-700 text-white';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header & Settings Trigger */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Smart Alert System</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated notifications for stock expiry, excess inventory, low stock, and transfer recommendations
          </p>
        </div>

        <button
          onClick={onOpenNotificationSettings}
          className="bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-300 transition flex items-center space-x-2 shadow-xs"
        >
          <Settings className="w-4 h-4 text-purple-600" />
          <span>Notification Channel Settings</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        <button
          onClick={() => setCategoryFilter('ALL')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${categoryFilter === 'ALL' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700'}`}
        >
          All Alerts ({alerts.length})
        </button>
        <button
          onClick={() => setCategoryFilter('EXPIRY')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${categoryFilter === 'EXPIRY' ? 'bg-red-600 text-white' : 'bg-white border border-slate-200 text-red-700'}`}
        >
          🔴 Expiry Alerts
        </button>
        <button
          onClick={() => setCategoryFilter('EXCESS')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${categoryFilter === 'EXCESS' ? 'bg-orange-500 text-white' : 'bg-white border border-slate-200 text-orange-700'}`}
        >
          🟠 Excess Stock Alerts
        </button>
        <button
          onClick={() => setCategoryFilter('LOW_STOCK')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${categoryFilter === 'LOW_STOCK' ? 'bg-yellow-500 text-white' : 'bg-white border border-slate-200 text-yellow-700'}`}
        >
          🟡 Low Stock Alerts
        </button>
        <button
          onClick={() => setCategoryFilter('REDISTRIBUTION')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${categoryFilter === 'REDISTRIBUTION' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-blue-700'}`}
        >
          🔵 Redistribution Alerts
        </button>
        <button
          onClick={() => setCategoryFilter('DEMAND')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${categoryFilter === 'DEMAND' ? 'bg-purple-600 text-white' : 'bg-white border border-slate-200 text-purple-700'}`}
        >
          🟣 Demand Alerts
        </button>
      </div>

      {/* Alert Cards List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 text-slate-400">
            <Bell className="w-12 h-12 text-slate-300 mx-auto mb-2" />
            <p className="font-bold text-sm">No active alerts in this category!</p>
            <p className="text-xs text-slate-400 mt-0.5">Your inventory is currently optimal.</p>
          </div>
        ) : (
          filteredAlerts.map(alertItem => {
            const product = products.find(p => p.id === alertItem.productId);

            return (
              <div 
                key={alertItem.id}
                className={`rounded-3xl p-5 border shadow-sm transition flex flex-col md:flex-row md:items-center justify-between gap-4 ${getAlertColorClasses(alertItem.color)}`}
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${getBadgeClass(alertItem.color)}`}>
                      {alertItem.type}
                    </span>
                    <span className="text-xs font-bold text-slate-500">{alertItem.storeName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">• {alertItem.date}</span>
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900">{alertItem.productName}</h3>
                  <p className="text-xs text-slate-700 leading-relaxed max-w-2xl">
                    <strong>Reason:</strong> {alertItem.reason}
                  </p>

                  <div className="bg-white/80 backdrop-blur-xs p-3 rounded-2xl border border-slate-200 text-xs text-slate-800 font-semibold space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Recommended Action:</span>
                    <p className="text-blue-900">{alertItem.recommendedAction}</p>
                  </div>
                </div>

                {/* Interactive Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    onClick={() => onAcceptAlert(alertItem)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl shadow-xs transition flex items-center space-x-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Accept Recommendation</span>
                  </button>

                  <button
                    onClick={() => onRejectAlert(alertItem.id)}
                    className="bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold px-3 py-2.5 rounded-xl border border-slate-300 transition flex items-center space-x-1"
                  >
                    <X className="w-3.5 h-3.5 text-slate-500" />
                    <span>Reject</span>
                  </button>

                  {product && (
                    <button
                      onClick={() => onOpenProductDetail(product)}
                      className="p-2.5 bg-white hover:bg-slate-100 text-slate-600 rounded-xl border border-slate-300 transition"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  )}
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
