import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  Plus, 
  Scan, 
  FileSpreadsheet, 
  Eye, 
  Edit3, 
  Trash2, 
  ArrowRightLeft, 
  Grid, 
  List, 
  AlertTriangle,
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function InventoryPage({
  products,
  stores,
  selectedStoreId,
  onOpenAddModal,
  onOpenEditModal,
  onDeleteProduct,
  onOpenProductDetail,
  onOpenTransferModal,
  onOpenBarcodeScanner,
  onOpenCSVModal
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'

  const today = new Date(2026, 9, 7);

  // Filter products by selected store and search term
  const filteredProducts = products.filter(p => {
    const matchesStore = selectedStoreId === 'ALL' || p.storeId === selectedStoreId;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.barcode.includes(searchTerm) ||
                          p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || p.category === categoryFilter;

    let matchesStatus = true;
    const exp = new Date(p.expiryDate);
    const daysLeft = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));

    if (statusFilter === 'EXPIRING_SOON') matchesStatus = daysLeft > 0 && daysLeft <= 7;
    else if (statusFilter === 'EXPIRED') matchesStatus = daysLeft <= 0;
    else if (statusFilter === 'LOW_STOCK') matchesStatus = p.quantity <= p.minStock;
    else if (statusFilter === 'EXCESS') matchesStatus = p.quantity >= p.maxStock;

    return matchesStore && matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header & Main Control Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Inventory Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track product stock levels, expiry dates, and initiate inter-branch transfers
          </p>
        </div>

        {/* Action Buttons: Add Product, Scan Barcode, Import CSV */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenBarcodeScanner}
            className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold px-3.5 py-2.5 rounded-xl border border-indigo-200 transition flex items-center space-x-1.5 shadow-xs"
          >
            <Scan className="w-4 h-4 text-indigo-600" />
            <span>Scan Barcode</span>
          </button>

          <button
            onClick={onOpenCSVModal}
            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold px-3.5 py-2.5 rounded-xl border border-emerald-200 transition flex items-center space-x-1.5 shadow-xs"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Import / Export CSV</span>
          </button>

          <button
            onClick={onOpenAddModal}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl shadow-md transition flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add New Product</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search product, barcode, category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 text-xs border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white font-medium"
            >
              <option value="ALL">All Categories ({categories.length})</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {/* Status Filter Dropdown */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white font-medium"
            >
              <option value="ALL">All Statuses</option>
              <option value="EXPIRING_SOON">⚠️ Expiring Soon (&le; 7 days)</option>
              <option value="EXPIRED">🔴 Expired Stock</option>
              <option value="LOW_STOCK">🟡 Low Stock</option>
              <option value="EXCESS">🔵 Excess Stock</option>
            </select>

            {/* Table / Grid Toggle */}
            <div className="flex items-center border border-slate-300 rounded-xl p-1 bg-slate-50">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition ${viewMode === 'table' ? 'bg-white shadow-xs text-blue-600' : 'text-slate-400'}`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition ${viewMode === 'grid' ? 'bg-white shadow-xs text-blue-600' : 'text-slate-400'}`}
                title="Grid Card View"
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* PRODUCTS DISPLAY: TABLE VIEW */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Product Info</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Barcode</th>
                  <th className="py-3.5 px-4">Stock (Min / Max)</th>
                  <th className="py-3.5 px-4">Expiry Date</th>
                  <th className="py-3.5 px-4">Days Left</th>
                  <th className="py-3.5 px-4">Daily Sales</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="py-12 text-center text-slate-400">
                      No matching products found in inventory. Try clearing search filters or add a new product.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map(product => {
                    const exp = new Date(product.expiryDate);
                    const daysLeft = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
                    const store = stores.find(s => s.id === product.storeId);

                    return (
                      <tr key={product.id} className="hover:bg-slate-50/80 transition">
                        
                        {/* Product Info */}
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2.5">
                            <span className="text-2xl">{product.image || '📦'}</span>
                            <div>
                              <p className="font-extrabold text-slate-800 text-xs">{product.name}</p>
                              <p className="text-[10px] text-slate-400">{store?.shortName || 'Store A'}</p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3 px-4">
                          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                            {product.category}
                          </span>
                        </td>

                        {/* Barcode */}
                        <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                          {product.barcode}
                        </td>

                        {/* Current Stock / Min / Max */}
                        <td className="py-3 px-4">
                          <div>
                            <span className={`font-bold text-sm ${product.quantity <= product.minStock ? 'text-amber-600' : product.quantity >= product.maxStock ? 'text-blue-600' : 'text-slate-800'}`}>
                              {product.quantity} units
                            </span>
                            <p className="text-[10px] text-slate-400">Min: {product.minStock} | Max: {product.maxStock}</p>
                          </div>
                        </td>

                        {/* Expiry Date */}
                        <td className="py-3 px-4 font-semibold text-slate-700">
                          {product.expiryDate}
                        </td>

                        {/* Days Remaining */}
                        <td className="py-3 px-4">
                          <span className={`font-extrabold px-2 py-0.5 rounded-full text-[11px] ${
                            daysLeft <= 0 ? 'bg-red-100 text-red-700' :
                            daysLeft <= 2 ? 'bg-red-100 text-red-700' :
                            daysLeft <= 5 ? 'bg-amber-100 text-amber-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {daysLeft <= 0 ? 'Expired' : `${daysLeft} days`}
                          </span>
                        </td>

                        {/* Daily Sales */}
                        <td className="py-3 px-4 font-bold text-slate-700">
                          {product.dailySales} / day
                        </td>

                        {/* Status Badges */}
                        <td className="py-3 px-4">
                          {daysLeft <= 0 ? (
                            <span className="bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                              EXPIRED
                            </span>
                          ) : daysLeft <= 2 ? (
                            <span className="bg-red-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                              CRITICAL EXPIRY
                            </span>
                          ) : product.quantity <= product.minStock ? (
                            <span className="bg-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                              LOW STOCK
                            </span>
                          ) : product.quantity >= product.maxStock ? (
                            <span className="bg-blue-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                              EXCESS STOCK
                            </span>
                          ) : (
                            <span className="bg-green-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                              SAFE
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end space-x-1">
                            <button
                              onClick={() => onOpenProductDetail(product)}
                              className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => onOpenTransferModal(product)}
                              className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
                              title="Transfer to Branch"
                            >
                              <ArrowRightLeft className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => onOpenEditModal(product)}
                              className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg"
                              title="Edit Product"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => onDeleteProduct(product.id)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* GRID CARD VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map(product => {
            const exp = new Date(product.expiryDate);
            const daysLeft = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
            const store = stores.find(s => s.id === product.storeId);

            return (
              <div key={product.id} className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-start justify-between">
                    <span className="text-3xl">{product.image || '📦'}</span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      daysLeft <= 2 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {daysLeft <= 0 ? 'Expired' : `${daysLeft}d left`}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-800 text-sm mt-2">{product.name}</h3>
                  <p className="text-[10px] text-slate-400">{store?.shortName}</p>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-slate-400 text-[10px]">Stock:</span>
                      <p className="font-bold text-slate-800">{product.quantity} units</p>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px]">Price:</span>
                      <p className="font-bold text-blue-600">₹{product.sellingPrice}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <button
                    onClick={() => onOpenProductDetail(product)}
                    className="text-xs font-bold text-blue-600 hover:underline"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onOpenTransferModal(product)}
                    className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-xl transition flex items-center space-x-1"
                  >
                    <ArrowRightLeft className="w-3.5 h-3.5" />
                    <span>Transfer</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
