import React, { useState } from 'react';
import { Clock, AlertTriangle, ArrowRightLeft, Sparkles, Calendar, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function ExpiryMonitorPage({ products, stores, onOpenTransferModal, onOpenProductDetail }) {
  const [activeUrgencyTab, setActiveUrgencyTab] = useState('ALL'); // ALL, CRITICAL, HIGH, MEDIUM, SAFE
  const [viewFormat, setViewFormat] = useState('cards'); // 'cards' or 'calendar'

  const today = new Date(2026, 9, 7);

  // Group products by urgency
  const categorizedProducts = products.map(p => {
    const exp = new Date(p.expiryDate);
    const daysLeft = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
    
    let urgency = 'SAFE';
    if (daysLeft <= 2) urgency = 'CRITICAL';
    else if (daysLeft <= 5) urgency = 'HIGH';
    else if (daysLeft <= 7) urgency = 'MEDIUM';

    const expectedSales = Math.max(0, daysLeft * p.dailySales);
    const estimatedLeftover = Math.max(0, p.quantity - expectedSales);

    return {
      ...p,
      daysLeft,
      urgency,
      expectedSales,
      estimatedLeftover
    };
  });

  const criticalList = categorizedProducts.filter(p => p.urgency === 'CRITICAL');
  const highList = categorizedProducts.filter(p => p.urgency === 'HIGH');
  const mediumList = categorizedProducts.filter(p => p.urgency === 'MEDIUM');
  const safeList = categorizedProducts.filter(p => p.urgency === 'SAFE');

  const filteredProducts = activeUrgencyTab === 'ALL'
    ? categorizedProducts.filter(p => p.daysLeft <= 7) // Show expiring soon by default
    : categorizedProducts.filter(p => p.urgency === activeUrgencyTab);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-red-100 text-red-700 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase">
              Urgency Radar
            </span>
            <span className="text-xs text-slate-400 font-mono">Today: Oct 7, 2026</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight mt-1">
            Expiry Monitoring & Risk Forecast
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated calculations for Days Remaining = Expiry Date - Today & Estimated Leftover Waste
          </p>
        </div>

        {/* View Toggle (Cards vs Timeline Calendar) */}
        <div className="flex items-center space-x-2 border border-slate-300 rounded-xl p-1 bg-white">
          <button
            onClick={() => setViewFormat('cards')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${viewFormat === 'cards' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600'}`}
          >
            Urgency Cards
          </button>
          <button
            onClick={() => setViewFormat('calendar')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${viewFormat === 'calendar' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600'}`}
          >
            🗓️ Timeline Calendar
          </button>
        </div>
      </div>

      {/* URGENCY SUMMARY KPI TABS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        {/* CRITICAL Card */}
        <button
          onClick={() => setActiveUrgencyTab('CRITICAL')}
          className={`p-4 rounded-2xl border text-left transition ${activeUrgencyTab === 'CRITICAL' ? 'bg-red-600 text-white shadow-lg' : 'bg-white border-red-200 text-slate-800'}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase">🔴 CRITICAL</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeUrgencyTab === 'CRITICAL' ? 'bg-white/20 text-white' : 'bg-red-100 text-red-700'}`}>
              1–2 Days
            </span>
          </div>
          <p className="text-3xl font-extrabold mt-2">{criticalList.length}</p>
          <p className={`text-[11px] mt-1 ${activeUrgencyTab === 'CRITICAL' ? 'text-red-100' : 'text-slate-500'}`}>
            Requires immediate redistribution
          </p>
        </button>

        {/* HIGH Card */}
        <button
          onClick={() => setActiveUrgencyTab('HIGH')}
          className={`p-4 rounded-2xl border text-left transition ${activeUrgencyTab === 'HIGH' ? 'bg-amber-500 text-white shadow-lg' : 'bg-white border-amber-200 text-slate-800'}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase">🟠 HIGH</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeUrgencyTab === 'HIGH' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'}`}>
              3–5 Days
            </span>
          </div>
          <p className="text-3xl font-extrabold mt-2">{highList.length}</p>
          <p className={`text-[11px] mt-1 ${activeUrgencyTab === 'HIGH' ? 'text-amber-100' : 'text-slate-500'}`}>
            Action recommended soon
          </p>
        </button>

        {/* MEDIUM Card */}
        <button
          onClick={() => setActiveUrgencyTab('MEDIUM')}
          className={`p-4 rounded-2xl border text-left transition ${activeUrgencyTab === 'MEDIUM' ? 'bg-yellow-500 text-white shadow-lg' : 'bg-white border-yellow-200 text-slate-800'}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase">🟡 MEDIUM</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeUrgencyTab === 'MEDIUM' ? 'bg-white/20 text-white' : 'bg-yellow-100 text-yellow-800'}`}>
              6–7 Days
            </span>
          </div>
          <p className="text-3xl font-extrabold mt-2">{mediumList.length}</p>
          <p className={`text-[11px] mt-1 ${activeUrgencyTab === 'MEDIUM' ? 'text-yellow-100' : 'text-slate-500'}`}>
            Monitor daily sales pace
          </p>
        </button>

        {/* SAFE Card */}
        <button
          onClick={() => setActiveUrgencyTab('SAFE')}
          className={`p-4 rounded-2xl border text-left transition ${activeUrgencyTab === 'SAFE' ? 'bg-green-600 text-white shadow-lg' : 'bg-white border-green-200 text-slate-800'}`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase">🟢 SAFE</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeUrgencyTab === 'SAFE' ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'}`}>
              &gt; 7 Days
            </span>
          </div>
          <p className="text-3xl font-extrabold mt-2">{safeList.length}</p>
          <p className={`text-[11px] mt-1 ${activeUrgencyTab === 'SAFE' ? 'text-green-100' : 'text-slate-500'}`}>
            Healthy stock buffer
          </p>
        </button>

      </div>

      {/* VIEW 1: URGENCY PRODUCT CARDS */}
      {viewFormat === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => {
            const store = stores.find(s => s.id === product.storeId);
            const targetStore = stores.find(s => s.id !== product.storeId);

            return (
              <div 
                key={product.id}
                className={`bg-white rounded-3xl p-5 border shadow-sm flex flex-col justify-between space-y-4 ${
                  product.urgency === 'CRITICAL' ? 'border-red-300 ring-2 ring-red-100' :
                  product.urgency === 'HIGH' ? 'border-amber-300' :
                  product.urgency === 'MEDIUM' ? 'border-yellow-300' : 'border-slate-200'
                }`}
              >
                <div>
                  
                  {/* Top Urgency Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{product.image || '📦'}</span>
                    <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${
                      product.urgency === 'CRITICAL' ? 'bg-red-600 text-white animate-pulse' :
                      product.urgency === 'HIGH' ? 'bg-amber-500 text-white' :
                      product.urgency === 'MEDIUM' ? 'bg-yellow-500 text-white' :
                      'bg-green-600 text-white'
                    }`}>
                      {product.daysLeft <= 0 ? '🔴 EXPIRED' : `Expires in ${product.daysLeft} days`}
                    </span>
                  </div>

                  {/* Title & Store */}
                  <h3 className="font-extrabold text-slate-800 text-base mt-3">{product.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">Branch: {store?.shortName || 'Store A'}</p>

                  {/* Calculated Metrics */}
                  <div className="mt-4 bg-slate-50 rounded-2xl p-3 border border-slate-200 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400 text-[10px]">Current Quantity:</span>
                      <p className="font-extrabold text-slate-800">{product.quantity} units</p>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px]">Daily Sales Rate:</span>
                      <p className="font-bold text-blue-600">{product.dailySales} / day</p>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px]">Expected Sales:</span>
                      <p className="font-bold text-slate-700">{product.expectedSales} units</p>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px]">Estimated Leftover:</span>
                      <p className={`font-extrabold ${product.estimatedLeftover > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {product.estimatedLeftover} units
                      </p>
                    </div>
                  </div>

                  {/* System Automated Recommendation */}
                  <div className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-2xl border border-indigo-100 space-y-1">
                    <div className="flex items-center space-x-1 text-indigo-900 font-bold text-xs">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      <span>System Recommendation:</span>
                    </div>
                    <p className="text-xs text-indigo-950 font-medium">
                      {product.estimatedLeftover > 0 
                        ? `Transfer ${Math.round(product.estimatedLeftover * 0.8)} units to ${targetStore ? targetStore.shortName : 'Store B'}`
                        : 'Maintain current sales pace. No action required.'}
                    </p>
                  </div>

                </div>

                {/* Footer Buttons */}
                <div className="pt-3 border-t border-slate-100 flex items-center space-x-2">
                  <button
                    onClick={() => onOpenProductDetail(product)}
                    className="flex-1 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition text-center"
                  >
                    View Recommendation
                  </button>
                  {product.estimatedLeftover > 0 && (
                    <button
                      onClick={() => onOpenTransferModal(product)}
                      className="py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition flex items-center space-x-1"
                    >
                      <ArrowRightLeft className="w-3.5 h-3.5" />
                      <span>Transfer</span>
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* VIEW 2: TIMELINE CALENDAR VIEW */
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-base font-extrabold text-slate-800">🗓️ Upcoming 7-Day Expiry Schedule</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-7 gap-3">
            {Array.from({ length: 7 }, (_, i) => {
              const dateObj = new Date(2026, 9, 7 + i);
              const dateStr = dateObj.toISOString().split('T')[0];
              const dateLabel = dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
              
              const dayProducts = categorizedProducts.filter(p => p.expiryDate === dateStr);

              return (
                <div key={dateStr} className="bg-slate-50 rounded-2xl p-3 border border-slate-200 flex flex-col justify-between min-h-[220px]">
                  <div>
                    <div className="text-center pb-2 border-b border-slate-200">
                      <p className="text-[10px] font-extrabold text-slate-400 uppercase">{i === 0 ? 'Today' : `Day +${i}`}</p>
                      <p className="text-xs font-extrabold text-slate-800">{dateLabel}</p>
                    </div>

                    <div className="mt-3 space-y-2">
                      {dayProducts.length === 0 ? (
                        <p className="text-[10px] text-slate-400 text-center py-4">No expiries</p>
                      ) : (
                        dayProducts.map(p => (
                          <div 
                            key={p.id}
                            onClick={() => onOpenProductDetail(p)}
                            className="bg-white p-2 rounded-xl border border-red-200 shadow-xs cursor-pointer hover:border-red-400 transition"
                          >
                            <p className="font-bold text-[11px] text-slate-800 truncate">{p.name}</p>
                            <p className="text-[9px] text-red-600 font-extrabold">{p.quantity} units</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="text-[10px] text-center font-bold text-slate-400 pt-2 border-t border-slate-200">
                    {dayProducts.length} Expiring
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
