import React, { useState } from 'react';
import { X, FileSpreadsheet, Download, Upload, CheckCircle2 } from 'lucide-react';

export default function CSVImportExportModal({ isOpen, onClose, products, onImportProducts }) {
  const [importedCount, setImportedCount] = useState(null);

  if (!isOpen) return null;

  const handleExportCSV = () => {
    const headers = ["ID", "Name", "Category", "Barcode", "Quantity", "ExpiryDate", "SellingPrice", "PurchasePrice", "DailySales"];
    const csvRows = [
      headers.join(','),
      ...products.map(p => [
        p.id,
        `"${p.name}"`,
        `"${p.category}"`,
        p.barcode,
        p.quantity,
        p.expiryDate,
        p.sellingPrice,
        p.purchasePrice,
        p.dailySales
      ].join(','))
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `smartstock_inventory_${new Date().toISOString().split('T')[0]}.csv`);
    a.click();
  };

  const handleSimulateImport = () => {
    // Simulated CSV import of 3 products
    const newItems = [
      {
        id: `PRD-${Math.floor(600 + Math.random() * 300)}`,
        name: "Haldiram's Bhujia Sev 400g",
        category: "Snacks & Biscuits",
        brand: "Haldiram",
        barcode: "8901152001044",
        batchNumber: "BCH-2026-H88",
        quantity: 60,
        minStock: 15,
        maxStock: 80,
        expiryDate: "2026-10-18",
        purchaseDate: "2026-10-01",
        sellingPrice: 95,
        purchasePrice: 75,
        dailySales: 7,
        storeId: "STR-001",
        image: "🍪"
      },
      {
        id: `PRD-${Math.floor(600 + Math.random() * 300)}`,
        name: "Nestle Everyday Milk Powder 400g",
        category: "Dairy & Fresh",
        brand: "Nestle",
        barcode: "8901058882012",
        batchNumber: "BCH-2026-N99",
        quantity: 24,
        minStock: 10,
        maxStock: 50,
        expiryDate: "2026-10-14",
        purchaseDate: "2026-09-28",
        sellingPrice: 240,
        purchasePrice: 200,
        dailySales: 4,
        storeId: "STR-001",
        image: "🥛"
      }
    ];

    setImportedCount(newItems.length);
    onImportProducts(newItems);

    setTimeout(() => {
      setImportedCount(null);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
        
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Excel / CSV Data Exchange</h3>
              <p className="text-xs text-slate-500">Import or download full inventory stock sheets</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          
          {/* Download CSV Option */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
            <div>
              <p className="font-bold text-xs text-slate-800">Export Current Stock Sheet</p>
              <p className="text-[11px] text-slate-500">Download {products.length} products as CSV file</p>
            </div>
            <button
              onClick={handleExportCSV}
              className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center space-x-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>

          {/* Import CSV Simulation */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl">
            <p className="font-bold text-xs text-blue-900">Import Batch Excel / CSV File</p>
            <p className="text-[11px] text-blue-700 mt-0.5">Bulk upload new stock arrivals from supplier invoice</p>

            <div className="mt-3 border-2 border-dashed border-blue-300 rounded-xl p-4 text-center bg-white/70">
              <Upload className="w-8 h-8 text-blue-500 mx-auto mb-1" />
              <p className="text-xs font-semibold text-slate-700">Drag & Drop .CSV File Here</p>
              <p className="text-[10px] text-slate-400">or click button below to simulate auto-import</p>
            </div>

            <button
              onClick={handleSimulateImport}
              className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center space-x-2"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Simulate Excel Import (Sample Stock)</span>
            </button>
          </div>

          {importedCount !== null && (
            <div className="p-3 bg-green-100 text-green-800 rounded-xl text-xs font-bold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Successfully imported {importedCount} new products into inventory!</span>
            </div>
          )}

        </div>

        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100 rounded-xl">
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
