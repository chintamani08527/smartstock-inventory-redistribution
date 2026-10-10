import React, { useState } from 'react';
import { X, ArrowRightLeft, Store, Navigation, AlertTriangle, CheckCircle, Sparkles, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TransferModal({ isOpen, onClose, product, sourceStore, stores, onConfirmTransfer }) {
  const [destStoreId, setDestStoreId] = useState('');
  const [transferQty, setTransferQty] = useState(25);
  const [isApproved, setIsApproved] = useState(false);

  if (!isOpen || !product) return null;

  const destinationStores = stores.filter(s => s.id !== (sourceStore?.id || product.storeId));
  const selectedDestStore = stores.find(s => s.id === destStoreId) || destinationStores[0];

  const handleApprove = () => {
    setIsApproved(true);
    
    // Confetti celebration for successful redistribution setup
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    setTimeout(() => {
      onConfirmTransfer({
        productId: product.id,
        productName: product.name,
        sourceStoreId: sourceStore?.id || product.storeId,
        sourceStoreName: sourceStore?.shortName || 'Store A',
        destStoreId: selectedDestStore?.id,
        destStoreName: selectedDestStore?.shortName || 'Store B',
        transferQty: Number(transferQty),
        reason: `Automated smart redistribution: ${product.name} transferred to prevent expiry and meet demand.`,
        createdDate: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      setIsApproved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-blue-600 text-white rounded-2xl shadow-md">
              <ArrowRightLeft className="w-6 h-6" />
            </div>
            <div>
              <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Smart Redistribution Approval
              </span>
              <h3 className="text-lg font-extrabold text-slate-800 mt-0.5">Approve Product Transfer</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Summary */}
        <div className="mt-4 bg-slate-50 rounded-2xl p-3 border border-slate-200 flex items-center space-x-3">
          <span className="text-3xl">{product.image || '📦'}</span>
          <div>
            <p className="font-extrabold text-sm text-slate-800">{product.name}</p>
            <p className="text-xs text-slate-500">
              Current Available Stock: <strong>{product.quantity} units</strong> | Expiry: <strong>{product.expiryDate}</strong>
            </p>
          </div>
        </div>

        {/* Transfer Visual Route */}
        <div className="mt-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-emerald-50 rounded-2xl p-4 border border-indigo-100">
          <div className="grid grid-cols-2 gap-4 relative">
            
            {/* Source Store */}
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Source Store (Excess Stock)</span>
              <p className="font-bold text-xs text-slate-800 mt-0.5 truncate">
                {sourceStore?.shortName || 'Store A (Indiranagar)'}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">Sales Pace: {product.dailySales || 10} / day</p>
            </div>

            {/* Destination Store Selector */}
            <div className="bg-white p-3 rounded-xl border border-blue-300 shadow-xs">
              <span className="text-[10px] font-bold text-blue-600 uppercase">Destination Store (High Demand)</span>
              <select
                value={destStoreId || destinationStores[0]?.id}
                onChange={(e) => setDestStoreId(e.target.value)}
                className="w-full text-xs font-bold text-slate-800 bg-transparent outline-none mt-0.5"
              >
                {destinationStores.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.shortName} ({s.distanceKm} km away)
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">Demand Level: VERY HIGH 🔥</p>
            </div>

          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-indigo-900 font-medium bg-white/70 px-3 py-1.5 rounded-xl border border-indigo-100">
            <span className="flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-indigo-600" />
              <span>Distance: <strong>{selectedDestStore?.distanceKm || 4.2} km</strong></span>
            </span>
            <span>Est. Transport Time: <strong>~18 mins</strong></span>
          </div>
        </div>

        {/* Transfer Quantity Controls */}
        <div className="mt-4">
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Quantity to Transfer (Units):
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="range"
              min="5"
              max={product.quantity}
              step="5"
              value={transferQty}
              onChange={(e) => setTransferQty(Number(e.target.value))}
              className="flex-1 accent-blue-600"
            />
            <input
              type="number"
              min="1"
              max={product.quantity}
              value={transferQty}
              onChange={(e) => setTransferQty(Number(e.target.value))}
              className="w-20 px-3 py-1.5 text-center font-bold text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Why Recommendation explanation */}
        <div className="mt-4 bg-amber-50 rounded-xl p-3 border border-amber-200 text-xs text-amber-900 space-y-1">
          <p className="font-bold flex items-center space-x-1 text-amber-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Smart Algorithm Reasoning:</span>
          </p>
          <p className="text-[11px] leading-relaxed">
            "Source store has more stock than it can sell before expiry, while destination store has high customer demand and low inventory."
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            onClick={handleApprove}
            disabled={isApproved}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-bold rounded-xl shadow-md transition flex items-center space-x-2"
          >
            {isApproved ? (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-300 animate-bounce" />
                <span>Transfer Approved!</span>
              </>
            ) : (
              <>
                <ArrowRightLeft className="w-4 h-4" />
                <span>Approve & Dispatch Transfer</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
