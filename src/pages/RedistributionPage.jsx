import React, { useState } from 'react';
import { 
  ArrowRightLeft, 
  Store, 
  Sparkles, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Flame,
  Info
} from 'lucide-react';
import { computeRedistributionRecommendation } from '../data/mockData';

export default function RedistributionPage({ 
  redistributions, 
  products, 
  stores, 
  onApproveTransfer,
  onUpdateTransferStatus
}) {
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [selectedSourceId, setSelectedSourceId] = useState(stores[0]?.id || '');
  const [selectedDestId, setSelectedDestId] = useState(stores[1]?.id || '');

  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];
  const selectedSourceStore = stores.find(s => s.id === selectedSourceId) || stores[0];
  const selectedDestStore = stores.find(s => s.id === selectedDestId) || stores[1];

  const calculatedRec = computeRedistributionRecommendation(selectedProduct, selectedSourceStore, selectedDestStore);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner Highlighting Main Innovation */}
      <div className="bg-gradient-to-r from-blue-800 via-indigo-800 to-purple-900 rounded-3xl p-6 text-white shadow-xl border border-indigo-500/30 relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              ⭐ MAIN PROJECT INNOVATION ⭐
            </span>
            <span className="text-xs text-indigo-200">Demand-Based Inter-Branch Balancing</span>
          </div>

          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Inter-Store Smart Redistribution System
          </h1>

          <p className="text-xs text-slate-200 max-w-3xl leading-relaxed">
            Retail stores frequently face financial loss when products expire before sale at Store A, while nearby Store B runs out of stock. 
            SmartStock links branches in real-time to move excess stock to high-demand stores before expiration!
          </p>
        </div>

        {/* Decorative Badge */}
        <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 hidden lg:block text-right">
          <p className="text-[10px] text-indigo-200 font-bold uppercase">Average Loss Saved</p>
          <p className="text-2xl font-extrabold text-amber-300">₹42,800 / mo</p>
        </div>
      </div>

      {/* WORKED SMART ALERT EXAMPLE CARD (Prompt Item 15) */}
      <div className="bg-white rounded-3xl p-6 border-2 border-indigo-200 shadow-md space-y-4">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <span className="p-2 bg-amber-100 text-amber-700 rounded-xl">
              <AlertTriangle className="w-5 h-5" />
            </span>
            <div>
              <span className="text-[10px] font-extrabold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full uppercase">
                ⚠️ EXPIRY + REDISTRIBUTION LIVE ALERT EXAMPLE
              </span>
              <h2 className="text-base font-extrabold text-slate-800 mt-0.5">
                Amul Taaza Toned Milk 500ml Redistribution Proposal
              </h2>
            </div>
          </div>
          <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Priority Score: 94 / 100 🔥
          </span>
        </div>

        {/* Store Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Source Store Box */}
          <div className="p-4 bg-orange-50/80 rounded-2xl border border-orange-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-orange-900 uppercase">SOURCE STORE: Store A (Indiranagar)</span>
              <span className="bg-orange-200 text-orange-900 text-[10px] font-bold px-2 py-0.5 rounded-full">Excess Stock</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs font-semibold text-slate-700 pt-1">
              <div>
                <span className="text-slate-400 text-[10px]">Current Stock:</span>
                <p className="font-extrabold text-slate-900">80 units</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px]">Expires In:</span>
                <p className="font-extrabold text-red-600">5 days</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px]">Expected Sales:</span>
                <p className="font-extrabold text-slate-800">50 units</p>
              </div>
            </div>
            <p className="text-[11px] text-orange-800 font-bold border-t border-orange-200 pt-2">
              Potential Excess Unsold Stock: <span className="text-red-700">30 units</span>
            </p>
          </div>

          {/* Destination Store Box */}
          <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-emerald-900 uppercase">NEARBY STORE: Store B (MG Road)</span>
              <span className="bg-emerald-200 text-emerald-900 text-[10px] font-bold px-2 py-0.5 rounded-full">High Demand 🔥</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs font-semibold text-slate-700 pt-1">
              <div>
                <span className="text-slate-400 text-[10px]">Current Stock:</span>
                <p className="font-extrabold text-slate-900">10 units</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px]">Daily Demand:</span>
                <p className="font-extrabold text-emerald-700">20 / day</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px]">Distance:</span>
                <p className="font-extrabold text-slate-800">4.2 km</p>
              </div>
            </div>
            <p className="text-[11px] text-emerald-800 font-bold border-t border-emerald-200 pt-2">
              Stockout Risk: <span className="text-emerald-700">Stockout in 12 hours!</span>
            </p>
          </div>

        </div>

        {/* Recommended Action & Potential Benefit */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-2xl border border-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-xs font-extrabold text-blue-900">Recommended Action:</p>
            <p className="text-sm font-bold text-slate-900 mt-0.5">
              "Transfer 25 units of Amul Milk 500ml from Store A → Store B"
            </p>
            <p className="text-[11px] text-indigo-700 mt-1">
              💡 <strong>Potential Benefit:</strong> Prevents approximately 25 units (₹700) from becoming unsellable while satisfying MG Road customer demand!
            </p>
          </div>

          <button
            onClick={() => {
              const milk = products.find(p => p.id === 'PRD-101') || products[0];
              onApproveTransfer({
                productId: milk.id,
                productName: milk.name,
                sourceStoreName: 'Store A (Indiranagar)',
                destStoreName: 'Store B (MG Road)',
                transferQty: 25,
                reason: 'Prevented 25 units milk expiry loss via transfer to high-demand MG Road store.',
                createdDate: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              });
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold px-6 py-3 rounded-2xl shadow-md transition flex items-center space-x-2 shrink-0"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Approve Redistribution</span>
          </button>
        </div>

      </div>

      {/* ACTIVE REDISTRIBUTION REQUESTS & WORKFLOW TRACKER */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-800">
            Active Inter-Store Transfers & Workflow Tracker
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Pending ➔ In Transit ➔ Received ➔ Completed
          </span>
        </div>

        <div className="space-y-3">
          {redistributions.length === 0 ? (
            <p className="text-center py-8 text-slate-400 text-xs font-semibold">
              No active transfer requests. Use the calculator below to generate a new transfer!
            </p>
          ) : (
            redistributions.map((item) => (
              <div 
                key={item.id}
                className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400">{item.id}</span>
                    <h3 className="font-extrabold text-sm text-slate-800">{item.productName}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      <strong>{item.sourceStoreName}</strong> ➔ <strong>{item.destStoreName}</strong> ({item.distanceKm || 4.2} km)
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-extrabold px-3 py-1 rounded-full">
                      Qty: {item.recommendedQty || item.transferQty} units
                    </span>
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${
                      item.status === 'Completed' ? 'bg-green-600 text-white' :
                      item.status === 'In Transit' ? 'bg-amber-500 text-white' :
                      item.status === 'Received' ? 'bg-indigo-600 text-white' :
                      'bg-blue-600 text-white'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>

                {/* Status Progress Bar */}
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] font-bold">
                  {['Pending', 'In Transit', 'Received', 'Completed'].map((stage, idx) => {
                    const stages = ['Pending', 'In Transit', 'Received', 'Completed'];
                    const currentIdx = stages.indexOf(item.status);
                    const isPassed = idx <= currentIdx;

                    return (
                      <button
                        key={stage}
                        onClick={() => onUpdateTransferStatus(item.id, stage)}
                        className={`flex items-center space-x-1 transition ${isPassed ? 'text-blue-700 font-extrabold' : 'text-slate-400 hover:text-slate-600'}`}
                      >
                        <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] ${isPassed ? 'bg-blue-600 text-white' : 'bg-slate-300 text-slate-600'}`}>
                          {idx + 1}
                        </span>
                        <span>{stage}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

      </div>

      {/* SMART RECOMMENDATION ENGINE SIMULATOR (Prompt Item 7) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-800">Smart Recommendation Priority Calculator</h2>
            <p className="text-xs text-slate-500">Calculate priority score formula: Expiry Risk + Stock Level + Sales Velocity + Demand + Distance</p>
          </div>
        </div>

        {/* Interactive Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Select Product</label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full px-3 py-2 text-xs font-bold border border-slate-300 rounded-xl bg-white outline-none"
            >
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.quantity} units)</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Source Branch</label>
            <select
              value={selectedSourceId}
              onChange={(e) => setSelectedSourceId(e.target.value)}
              className="w-full px-3 py-2 text-xs font-bold border border-slate-300 rounded-xl bg-white outline-none"
            >
              {stores.map(s => (
                <option key={s.id} value={s.id}>{s.shortName}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Destination Branch</label>
            <select
              value={selectedDestId}
              onChange={(e) => setSelectedDestId(e.target.value)}
              className="w-full px-3 py-2 text-xs font-bold border border-slate-300 rounded-xl bg-white outline-none"
            >
              {stores.filter(s => s.id !== selectedSourceId).map(s => (
                <option key={s.id} value={s.id}>{s.shortName} ({s.distanceKm} km)</option>
              ))}
            </select>
          </div>
        </div>

        {/* Dynamic Calculation Result */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-5 rounded-2xl text-white space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-300 uppercase">Calculated Redistribution Priority Score</span>
            <span className="bg-blue-500 text-white font-extrabold text-base px-3 py-1 rounded-full">
              {calculatedRec.priorityScore} / 100
            </span>
          </div>

          <p className="text-xs text-slate-200 leading-relaxed">
            <strong>System Logic Explanation:</strong> "{calculatedRec.explanation}"
          </p>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => {
                onApproveTransfer({
                  productId: selectedProduct.id,
                  productName: selectedProduct.name,
                  sourceStoreName: selectedSourceStore.shortName,
                  destStoreName: selectedDestStore.shortName,
                  transferQty: calculatedRec.recommendedTransferQty,
                  reason: calculatedRec.explanation,
                  createdDate: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                });
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition"
            >
              Create Transfer Request ({calculatedRec.recommendedTransferQty} units)
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
