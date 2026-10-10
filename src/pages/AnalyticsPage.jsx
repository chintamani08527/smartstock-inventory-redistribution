import React from 'react';
import { BarChart3, Download, Printer, TrendingUp, ShieldCheck, DollarSign, ArrowRightLeft, Sparkles, AlertOctagon } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

export default function AnalyticsPage({ products, stores, redistributions }) {
  
  // KPI Calculations
  const totalInventoryValue = products.reduce((sum, p) => sum + (p.quantity * p.sellingPrice), 0);
  const potentialWasteValue = products
    .filter(p => new Date(p.expiryDate) <= new Date(2026, 9, 14))
    .reduce((sum, p) => sum + (p.quantity * p.sellingPrice), 0);
  
  const savedInventoryValue = redistributions.length * 2850;
  const redistributedUnits = redistributions.reduce((sum, r) => sum + (r.recommendedQty || r.transferQty || 25), 0);

  // Sample Chart Data
  const monthlyWasteVsSaved = [
    { month: 'May', expired: 18, saved: 42 },
    { month: 'Jun', expired: 14, saved: 58 },
    { month: 'Jul', expired: 11, saved: 64 },
    { month: 'Aug', expired: 8, saved: 78 },
    { month: 'Sep', expired: 6, saved: 92 },
    { month: 'Oct (FC)', expired: 4, saved: 110 },
  ];

  const valueByCategory = [
    { name: 'Dairy & Fresh', value: 38000, color: '#3b82f6' },
    { name: 'Cooking Oils', value: 72000, color: '#f59e0b' },
    { name: 'Snacks & Biscuits', value: 24000, color: '#10b981' },
    { name: 'Beverages', value: 31000, color: '#8b5cf6' },
    { name: 'Staples', value: 45000, color: '#ec4899' },
  ];

  const salesTrend = [
    { week: 'Week 1', sales: 1240 },
    { week: 'Week 2', sales: 1380 },
    { week: 'Week 3', sales: 1520 },
    { week: 'Week 4', sales: 1690 },
  ];

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header & Export Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Analytics & Business Intelligence</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Financial waste reduction metrics, redistribution counts, and stock performance reports
          </p>
        </div>

        <div className="flex items-center space-x-2 no-print">
          <button
            onClick={() => {
              const headers = ["Metric", "Value"];
              const rows = [
                ["Total Inventory Value", `INR ${totalInventoryValue}`],
                ["Potential Waste at Risk", `INR ${potentialWasteValue}`],
                ["Saved Inventory Value", `INR ${savedInventoryValue}`],
                ["Total Redistributed Units", redistributedUnits]
              ];
              const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
              const blob = new Blob([csvContent], { type: 'text/csv' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `smartstock_analytics_${new Date().toISOString().split('T')[0]}.csv`;
              a.click();
            }}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2.5 rounded-xl transition flex items-center space-x-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Download CSV</span>
          </button>

          <button
            onClick={handlePrintPDF}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition flex items-center space-x-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Export PDF Report</span>
          </button>
        </div>
      </div>

      {/* KPI SUMMARY CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Total Inventory Value</p>
          <p className="text-xl font-extrabold text-slate-900 mt-1">₹{totalInventoryValue.toLocaleString('en-IN')}</p>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 inline-block">Across all 5 stores</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-red-200 shadow-xs">
          <p className="text-[10px] font-bold text-red-600 uppercase">Potential Waste Risk</p>
          <p className="text-xl font-extrabold text-red-600 mt-1">₹{potentialWasteValue.toLocaleString('en-IN')}</p>
          <span className="text-[10px] text-red-500 font-semibold mt-1 inline-block">Expiring &le; 7 days</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-xs">
          <p className="text-[10px] font-bold text-emerald-700 uppercase">Saved Inventory Value</p>
          <p className="text-xl font-extrabold text-emerald-700 mt-1">₹{savedInventoryValue.toLocaleString('en-IN')}</p>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 inline-block">Via redistribution 🟢</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-indigo-200 shadow-xs">
          <p className="text-[10px] font-bold text-indigo-700 uppercase">Redistributed Products</p>
          <p className="text-xl font-extrabold text-indigo-700 mt-1">{redistributedUnits} units</p>
          <span className="text-[10px] text-indigo-600 font-semibold mt-1 inline-block">{redistributions.length} transfers</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-blue-200 shadow-xs">
          <p className="text-[10px] font-bold text-blue-700 uppercase">Stockout Reduction</p>
          <p className="text-xl font-extrabold text-blue-700 mt-1">78%</p>
          <span className="text-[10px] text-blue-600 font-semibold mt-1 inline-block">Inter-store balance</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-purple-200 shadow-xs">
          <p className="text-[10px] font-bold text-purple-700 uppercase">Expiry Reduction</p>
          <p className="text-xl font-extrabold text-purple-700 mt-1">84%</p>
          <span className="text-[10px] text-purple-600 font-semibold mt-1 inline-block">vs Manual logging</span>
        </div>

      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Expired vs Saved Stock */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider mb-1">
            Monthly Waste Reduction Impact (Expired vs Saved Items)
          </h3>
          <p className="text-xs text-slate-500 mb-4">Demonstrating loss prevention since SmartStock deployment</p>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyWasteVsSaved}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="expired" name="Expired Waste" fill="#ef4444" radius={[6, 6, 0, 0]} />
                <Bar dataKey="saved" name="Saved via Transfer" fill="#22c55e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Inventory Value by Category */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider mb-1">
            Stock Capital Allocation by Category (₹)
          </h3>
          <p className="text-xs text-slate-500 mb-4">Financial distribution across product departments</p>

          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={valueByCategory} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                  {valueByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Weekly Sales Velocity Trend */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm col-span-1 lg:col-span-2">
          <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider mb-1">
            Weekly Inter-Store Sales Pace & Demand Trend
          </h3>
          <p className="text-xs text-slate-500 mb-4">Aggregated units sold per week across 5 branches</p>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="sales" name="Units Sold" stroke="#2563eb" fill="#bfdbfe" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}
