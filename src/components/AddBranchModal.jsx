import React, { useState } from 'react';
import { X, Store, Plus, MapPin, Building2, Users } from 'lucide-react';

export default function AddBranchModal({ isOpen, onClose, onAddStore }) {
  const [formData, setFormData] = useState({
    name: '',
    shortName: '',
    location: '',
    type: 'Supermarket / Grocery',
    employees: 4,
    phone: '+91 98765 00000',
    manager: '',
    distanceKm: 5.0
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStoreId = `STR-00${Math.floor(6 + Math.random() * 90)}`;
    onAddStore({
      ...formData,
      id: newStoreId,
      shortName: formData.shortName || formData.name.split(' ')[0] + ' Branch',
      isMain: false,
      distanceKm: Number(formData.distanceKm)
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Add New Branch / Store</h3>
              <p className="text-xs text-slate-500">Expand your retail network for inter-store redistribution</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Store / Branch Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Gupta Supermart - Whitefield Branch"
              value={formData.name}
              onChange={(e) => setFormData(s => ({ ...s, name: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Short Display Label</label>
            <input
              type="text"
              placeholder="e.g. Store F (Whitefield)"
              value={formData.shortName}
              onChange={(e) => setFormData(s => ({ ...s, shortName: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Store Address / Location *</label>
            <input
              type="text"
              required
              placeholder="e.g. ITPL Main Road, Hoodi Circle, Bengaluru"
              value={formData.location}
              onChange={(e) => setFormData(s => ({ ...s, location: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Store Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(s => ({ ...s, type: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="Supermarket / Grocery">Supermarket / Grocery</option>
                <option value="Express Convenience Store">Express Store</option>
                <option value="Transit Kiosk">Transit Kiosk</option>
                <option value="Wholesale Hub">Wholesale Hub</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Number of Employees</label>
              <input
                type="number"
                min="1"
                value={formData.employees}
                onChange={(e) => setFormData(s => ({ ...s, employees: Number(e.target.value) }))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Store Manager</label>
              <input
                type="text"
                placeholder="e.g. Ramesh Patel"
                value={formData.manager}
                onChange={(e) => setFormData(s => ({ ...s, manager: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Distance from Main Store (km)</label>
              <input
                type="number"
                step="0.5"
                value={formData.distanceKm}
                onChange={(e) => setFormData(s => ({ ...s, distanceKm: Number(e.target.value) }))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl">
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-md transition flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Branch Store</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
