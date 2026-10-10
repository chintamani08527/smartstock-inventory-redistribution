import React, { useState, useEffect } from 'react';
import { X, Plus, Save, Package } from 'lucide-react';

export default function AddEditProductModal({ isOpen, onClose, onSave, productToEdit, stores }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Dairy & Fresh',
    brand: '',
    barcode: '',
    batchNumber: '',
    quantity: 50,
    purchaseDate: '2026-10-01',
    expiryDate: '2026-10-15',
    sellingPrice: 50,
    purchasePrice: 40,
    minStock: 15,
    maxStock: 80,
    dailySales: 5,
    storeId: 'STR-001',
    image: '📦'
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        ...productToEdit,
        quantity: Number(productToEdit.quantity),
        sellingPrice: Number(productToEdit.sellingPrice),
        purchasePrice: Number(productToEdit.purchasePrice),
        minStock: Number(productToEdit.minStock),
        maxStock: Number(productToEdit.maxStock),
        dailySales: Number(productToEdit.dailySales || 5)
      });
    } else {
      setFormData({
        name: '',
        category: 'Dairy & Fresh',
        brand: '',
        barcode: `890${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        batchNumber: `BCH-2026-${Math.floor(10 + Math.random() * 89)}`,
        quantity: 40,
        purchaseDate: '2026-10-01',
        expiryDate: '2026-10-12',
        sellingPrice: 60,
        purchasePrice: 45,
        minStock: 15,
        maxStock: 80,
        dailySales: 6,
        storeId: stores[0]?.id || 'STR-001',
        image: '📦'
      });
    }
  }, [productToEdit, isOpen, stores]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['quantity', 'sellingPrice', 'purchasePrice', 'minStock', 'maxStock', 'dailySales'].includes(name)
        ? Number(value)
        : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: productToEdit ? productToEdit.id : `PRD-${Math.floor(100 + Math.random() * 900)}`
    });
    onClose();
  };

  const categoryIcons = {
    'Dairy & Fresh': '🥛',
    'Bakery': '🍞',
    'Snacks & Biscuits': '🍪',
    'Cooking Oils & Staples': '🏺',
    'Beverages': '🧃',
    'Confectionery': '🍫',
    'OTC Health Care': '💊',
    'Personal Care': '🧼'
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                {productToEdit ? 'Edit Product Details' : 'Add New Inventory Product'}
              </h3>
              <p className="text-xs text-slate-500">Fill details for automated expiry & redistribution tracking</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Product Name *</label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Amul Taaza Toned Milk 500ml"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={(e) => {
                  handleChange(e);
                  setFormData(prev => ({ ...prev, image: categoryIcons[e.target.value] || '📦' }));
                }}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="Dairy & Fresh">🥛 Dairy & Fresh</option>
                <option value="Bakery">🍞 Bakery</option>
                <option value="Snacks & Biscuits">🍪 Snacks & Biscuits</option>
                <option value="Cooking Oils & Staples">🏺 Cooking Oils & Staples</option>
                <option value="Beverages">🧃 Beverages</option>
                <option value="Confectionery">🍫 Confectionery</option>
                <option value="OTC Health Care">💊 OTC Health Care</option>
                <option value="Personal Care">🧼 Personal Care</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Brand Name</label>
              <input
                type="text"
                name="brand"
                placeholder="e.g. Amul, Parle, Britannia"
                value={formData.brand}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Barcode / EAN</label>
              <input
                type="text"
                name="barcode"
                placeholder="8901262..."
                value={formData.barcode}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Batch Number</label>
              <input
                type="text"
                name="batchNumber"
                placeholder="BCH-2026-M88"
                value={formData.batchNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Store / Branch Location *</label>
              <select
                name="storeId"
                value={formData.storeId}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {stores.map(store => (
                  <option key={store.id} value={store.id}>
                    {store.shortName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Current Stock Quantity *</label>
              <input
                type="number"
                name="quantity"
                required
                min="0"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Daily Sales Rate (units/day)</label>
              <input
                type="number"
                name="dailySales"
                min="1"
                value={formData.dailySales}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Expiry Date *</label>
              <input
                type="date"
                name="expiryDate"
                required
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Purchase Date</label>
              <input
                type="date"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Purchase Price (₹)</label>
              <input
                type="number"
                name="purchasePrice"
                min="0"
                value={formData.purchasePrice}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Selling Price (₹)</label>
              <input
                type="number"
                name="sellingPrice"
                min="0"
                value={formData.sellingPrice}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Minimum Stock Threshold</label>
              <input
                type="number"
                name="minStock"
                min="1"
                value={formData.minStock}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Maximum Stock Limit</label>
              <input
                type="number"
                name="maxStock"
                min="1"
                value={formData.maxStock}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-100 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-md transition flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{productToEdit ? 'Save Changes' : 'Add Product to Inventory'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
