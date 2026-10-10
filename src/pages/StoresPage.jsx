import React from 'react';
import { Store, MapPin, Users, Phone, Plus, ArrowRight, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';
import { calculateHealthScore } from '../data/mockData';

export default function StoresPage({ stores, products, redistributions, onSelectStore, onOpenAddBranchModal }) {
  return (
    <div className="space-y-6 pb-12">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Multi-Store & Branch Network</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor inventory health scores across all retail outlets and transfer stock seamlessly
          </p>
        </div>

        <button
          onClick={onOpenAddBranchModal}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add New Store / Branch</span>
        </button>
      </div>

      {/* STORES GRID CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map(store => {
          const storeProducts = products.filter(p => p.storeId === store.id);
          const health = calculateHealthScore(store.id, products, redistributions);

          const today = new Date(2026, 9, 7);
          const expiringCount = storeProducts.filter(p => {
            const exp = new Date(p.expiryDate);
            const daysLeft = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
            return daysLeft > 0 && daysLeft <= 7;
          }).length;

          const lowStockCount = storeProducts.filter(p => p.quantity <= p.minStock).length;
          const excessStockCount = storeProducts.filter(p => p.quantity >= p.maxStock).length;

          return (
            <div 
              key={store.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div>
                
                {/* Top Header & Health Badge */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-blue-100 text-blue-700 rounded-2xl">
                      <Store className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-800 text-base">{store.shortName}</h3>
                      <span className="text-[10px] text-slate-400 font-mono">{store.id} • {store.type}</span>
                    </div>
                  </div>

                  {/* Dynamic Circular Radial Progress Badge */}
                  <div className="text-right">
                    <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${
                      health >= 80 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {health}% Health
                    </span>
                  </div>
                </div>

                {/* Location & Contact Info */}
                <div className="mt-4 space-y-1 text-xs text-slate-600">
                  <p className="flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{store.location}</span>
                  </p>
                  <p className="flex items-center space-x-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Manager: <strong>{store.manager || 'Ramesh Patel'}</strong> ({store.employees} staff)</span>
                  </p>
                </div>

                {/* Key Store Inventory Metrics */}
                <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold">Total</span>
                    <p className="font-extrabold text-slate-800 mt-0.5">{storeProducts.length}</p>
                  </div>
                  <div>
                    <span className="text-amber-600 text-[10px] uppercase font-bold">Expiring</span>
                    <p className="font-extrabold text-amber-600 mt-0.5">{expiringCount}</p>
                  </div>
                  <div>
                    <span className="text-yellow-600 text-[10px] uppercase font-bold">Low</span>
                    <p className="font-extrabold text-yellow-600 mt-0.5">{lowStockCount}</p>
                  </div>
                  <div>
                    <span className="text-blue-600 text-[10px] uppercase font-bold">Excess</span>
                    <p className="font-extrabold text-blue-600 mt-0.5">{excessStockCount}</p>
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectStore(store.id)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1.5 shadow-xs"
              >
                <span>Inspect {store.shortName} Inventory</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          );
        })}
      </div>

    </div>
  );
}
