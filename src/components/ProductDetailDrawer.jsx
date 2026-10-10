import React from 'react';
import { X, ArrowRightLeft, AlertTriangle, TrendingUp, Calendar, Tag, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function ProductDetailDrawer({ product, store, stores, isOpen, onClose, onInitiateTransfer }) {
  if (!isOpen || !product) return null;

  const today = new Date(2026, 9, 7);
  const exp = new Date(product.expiryDate);
  const daysRemaining = Math.max(0, Math.ceil((exp - today) / (1000 * 60 * 60 * 24)));
  const totalValue = product.quantity * product.sellingPrice;
  const expectedSalesBeforeExpiry = daysRemaining * product.dailySales;
  const potentialExcess = Math.max(0, product.quantity - expectedSalesBeforeExpiry);

  // Generate 7-day sales and depletion trajectory data
  const chartData = Array.from({ length: 7 }, (_, i) => {
    const dayName = i === 0 ? 'Today' : `Day ${i + 1}`;
    const projectedStock = Math.max(0, product.quantity - (i * product.dailySales));
    return {
      day: dayName,
      sales: product.dailySales + Math.floor((Math.sin(i) * 2)),
      stock: projectedStock
    };
  });

  const targetStore = stores.find(s => s.id !== product.storeId);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-xl h-full shadow-2xl overflow-y-auto flex flex-col justify-between animate-in slide-in-from-right duration-200">
        
        {/* Top Header */}
        <div>
          <div className="bg-slate-900 text-white p-6 sticky top-0 z-10 flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-3xl border border-white/20">
                {product.image || '📦'}
              </div>
              <div>
                <span className="bg-blue-500/30 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {product.category}
                </span>
                <h2 className="text-xl font-extrabold text-white mt-1 leading-tight">{product.name}</h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Barcode: {product.barcode} | Batch: {product.batchNumber}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            
            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center">
                <p className="text-[11px] font-bold text-slate-400 uppercase">Current Stock</p>
                <p className="text-2xl font-extrabold text-slate-800 mt-1">{product.quantity} <span className="text-xs font-normal text-slate-500">units</span></p>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center">
                <p className="text-[11px] font-bold text-slate-400 uppercase">Days Remaining</p>
                <p className={`text-2xl font-extrabold mt-1 ${daysRemaining <= 2 ? 'text-red-600' : daysRemaining <= 5 ? 'text-amber-600' : 'text-green-600'}`}>
                  {daysRemaining} <span className="text-xs font-normal">days</span>
                </p>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center">
                <p className="text-[11px] font-bold text-slate-400 uppercase">Daily Sales</p>
                <p className="text-2xl font-extrabold text-blue-600 mt-1">{product.dailySales} <span className="text-xs font-normal text-slate-500">/day</span></p>
              </div>
            </div>

            {/* Financial & Price Details */}
            <div className="bg-blue-50/60 rounded-2xl p-4 border border-blue-100 grid grid-cols-3 gap-2 text-xs">
              <div>
                <span className="text-slate-500">Purchase Price:</span>
                <p className="font-bold text-slate-800 text-sm">₹{product.purchasePrice}</p>
              </div>
              <div>
                <span className="text-slate-500">Selling Price:</span>
                <p className="font-bold text-slate-800 text-sm">₹{product.sellingPrice}</p>
              </div>
              <div>
                <span className="text-slate-500">Total Stock Value:</span>
                <p className="font-bold text-blue-700 text-sm">₹{totalValue.toLocaleString('en-IN')}</p>
              </div>
            </div>

            {/* AI Smart Recommendation Box */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-200 space-y-3">
              <div className="flex items-center space-x-2 text-amber-800 font-bold text-sm">
                <Sparkles className="w-5 h-5 text-amber-600 animate-spin" />
                <span>AI Smart Recommendation</span>
              </div>

              {potentialExcess > 0 ? (
                <div>
                  <p className="text-xs text-amber-900 font-medium leading-relaxed">
                    ⚠️ <strong>High Expiry Risk:</strong> You have {product.quantity} units, but based on sales pace ({product.dailySales}/day), you will only sell ~{expectedSalesBeforeExpiry} units before expiry. 
                    <strong> {potentialExcess} units are expected to spoil!</strong>
                  </p>
                  <div className="mt-3 pt-3 border-t border-amber-200/60 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-bold text-slate-600">Recommended Action:</p>
                      <p className="text-xs font-semibold text-amber-900">
                        Transfer {Math.round(potentialExcess * 0.8)} units to {targetStore ? targetStore.shortName : 'Store B'}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        onInitiateTransfer(product);
                        onClose();
                      }}
                      className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center space-x-1.5 shadow-sm"
                    >
                      <ArrowRightLeft className="w-4 h-4" />
                      <span>Transfer Now</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-xs text-green-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>Stock pace is healthy! Expected to sell out completely prior to expiry date.</span>
                </div>
              )}
            </div>

            {/* Sales & Depletion Trajectory Chart */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Projected 7-Day Stock Depletion Curve
              </h4>
              <div className="h-44 bg-slate-50 p-2 rounded-2xl border border-slate-200">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Area type="monotone" dataKey="stock" name="Remaining Stock" stroke="#2563eb" fill="#93c5fd" fillOpacity={0.4} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Store & Location info */}
            <div className="text-xs text-slate-500 border-t border-slate-100 pt-4 flex justify-between">
              <span>Current Branch: <strong>{store?.name || 'Indiranagar Main Store'}</strong></span>
              <span>Expiry Date: <strong>{product.expiryDate}</strong></span>
            </div>

          </div>
        </div>

        {/* Footer Action */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-semibold rounded-xl transition"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
}
