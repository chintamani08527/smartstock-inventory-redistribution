import React from 'react';
import { 
  Package, 
  Clock, 
  AlertOctagon, 
  TrendingDown, 
  Layers, 
  ArrowRightLeft, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  ShieldAlert, 
  Percent, 
  ChevronRight,
  Zap,
  Tag,
  Store
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie } from 'recharts';

export default function DashboardPage({
  user,
  products,
  stores,
  redistributions,
  alerts,
  healthScore,
  onSelectTab,
  onOpenTransferModal,
  onOpenProductDetail,
  onAcceptAlert
}) {

  // Dynamic calculations relative to current date (2026-10-07)
  const today = new Date(2026, 9, 7);

  const expiringSoonProducts = products.filter(p => {
    const exp = new Date(p.expiryDate);
    const daysLeft = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
    return daysLeft > 0 && daysLeft <= 7;
  });

  const expiredProducts = products.filter(p => {
    const exp = new Date(p.expiryDate);
    const daysLeft = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
    return daysLeft <= 0;
  });

  const lowStockProducts = products.filter(p => p.quantity <= p.minStock);
  const excessStockProducts = products.filter(p => p.quantity >= p.maxStock);

  // Status breakdown data for Pie chart
  const pieData = [
    { name: 'Safe Stock', value: Math.max(1, products.length - expiringSoonProducts.length - expiredProducts.length - lowStockProducts.length), color: '#22c55e' },
    { name: 'Expiring Soon', value: expiringSoonProducts.length, color: '#f59e0b' },
    { name: 'Expired', value: expiredProducts.length, color: '#ef4444' },
    { name: 'Low Stock', value: lowStockProducts.length, color: '#eab308' },
    { name: 'Excess Stock', value: excessStockProducts.length, color: '#3b82f6' },
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Welcome Header */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md uppercase tracking-wider">
                Store Inventory Dashboard
              </span>
              <span className="text-xs text-blue-200 font-medium">Oct 7, 2026</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-2 tracking-tight">
              Good Morning, {user?.name || 'Shopkeeper'} 👋
            </h1>
            <p className="text-sm text-blue-100 mt-1 max-w-xl">
              Here is your overall inventory health today. SmartStock detected <strong>{redistributions.length} active inter-store redistribution opportunities</strong> to prevent product expiry!
            </p>
          </div>

          {/* Dynamic Circular Health Score Gauge */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex items-center space-x-4 shrink-0">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle cx="32" cy="32" r="26" stroke="rgba(255,255,255,0.2)" strokeWidth="6" fill="transparent" />
                <circle 
                  cx="32" 
                  cy="32" 
                  r="26" 
                  stroke={healthScore >= 80 ? "#4ade80" : healthScore >= 60 ? "#fbbf24" : "#f87171"} 
                  strokeWidth="6" 
                  strokeDasharray="163" 
                  strokeDashoffset={163 - (163 * healthScore) / 100} 
                  strokeLinecap="round" 
                  fill="transparent" 
                />
              </svg>
              <span className="absolute font-extrabold text-lg text-white">{healthScore}%</span>
            </div>
            <div>
              <p className="text-[11px] font-bold text-blue-200 uppercase">Inventory Health</p>
              <p className="text-sm font-extrabold text-white">
                {healthScore >= 80 ? '🟢 Healthy' : healthScore >= 60 ? '🟠 Needs Attention' : '🔴 Critical Action'}
              </p>
              <button 
                onClick={() => onSelectTab('analytics')}
                className="text-[11px] text-blue-200 underline font-semibold hover:text-white mt-0.5 block"
              >
                View Breakdown →
              </button>
            </div>
          </div>
        </div>

        {/* Decorative blur element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
      </div>

      {/* Visual Workflow Header (10-Second Problem Overview) */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider flex items-center space-x-1">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>10-Second Inventory Pipeline Summary</span>
          </span>
          <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
            Real-time Sync Active
          </span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-center text-xs">
          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-400 font-bold">1. Total Stock</span>
            <p className="font-extrabold text-sm text-slate-800 mt-0.5">{products.length} Products</p>
          </div>
          <div className="p-2.5 bg-red-50 rounded-xl border border-red-200">
            <span className="text-red-600 font-bold">2. Expiry Risk</span>
            <p className="font-extrabold text-sm text-red-700 mt-0.5">{expiringSoonProducts.length} Items</p>
          </div>
          <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-200">
            <span className="text-blue-600 font-bold">3. Excess Stock</span>
            <p className="font-extrabold text-sm text-blue-700 mt-0.5">{excessStockProducts.length} Overstocked</p>
          </div>
          <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200">
            <span className="text-amber-600 font-bold">4. Low Stock</span>
            <p className="font-extrabold text-sm text-amber-700 mt-0.5">{lowStockProducts.length} Reorder</p>
          </div>
          <div className="p-2.5 bg-indigo-50 rounded-xl border border-indigo-200 col-span-2">
            <span className="text-indigo-600 font-bold">5. Smart Redistribution</span>
            <p className="font-extrabold text-sm text-indigo-800 mt-0.5">{redistributions.length} Transfers Ready 🔄</p>
          </div>
        </div>
      </div>

      {/* 6 LARGE SUMMARY KPI CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        
        {/* Card 1: Total Products */}
        <div 
          onClick={() => onSelectTab('inventory')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Total Products</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-110 transition">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-800 mt-2">{products.length.toLocaleString()}</p>
          <span className="inline-block mt-1 text-[10px] font-bold text-slate-400">across 5 branches</span>
        </div>

        {/* Card 2: Expiring Soon */}
        <div 
          onClick={() => onSelectTab('expiry')}
          className="bg-white p-4 rounded-2xl border border-amber-300 shadow-xs hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-700 uppercase">Expiring Soon</span>
            <div className="p-2 bg-amber-100 text-amber-600 rounded-xl group-hover:scale-110 transition">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-amber-600 mt-2">{expiringSoonProducts.length}</p>
          <span className="inline-block mt-1 text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
            within 7 days
          </span>
        </div>

        {/* Card 3: Expired Products */}
        <div 
          onClick={() => onSelectTab('expiry')}
          className="bg-white p-4 rounded-2xl border border-red-300 shadow-xs hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-red-700 uppercase">Expired Items</span>
            <div className="p-2 bg-red-100 text-red-600 rounded-xl group-hover:scale-110 transition">
              <AlertOctagon className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-red-600 mt-2">{expiredProducts.length}</p>
          <span className="inline-block mt-1 text-[10px] font-bold bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
            Immediate disposal
          </span>
        </div>

        {/* Card 4: Low Stock */}
        <div 
          onClick={() => onSelectTab('inventory')}
          className="bg-white p-4 rounded-2xl border border-yellow-300 shadow-xs hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-yellow-700 uppercase">Low Stock</span>
            <div className="p-2 bg-yellow-100 text-yellow-600 rounded-xl group-hover:scale-110 transition">
              <TrendingDown className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-yellow-600 mt-2">{lowStockProducts.length}</p>
          <span className="inline-block mt-1 text-[10px] font-bold bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
            Reorder needed
          </span>
        </div>

        {/* Card 5: Excess Stock */}
        <div 
          onClick={() => onSelectTab('inventory')}
          className="bg-white p-4 rounded-2xl border border-blue-200 shadow-xs hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-700 uppercase">Excess Stock</span>
            <div className="p-2 bg-blue-100 text-blue-600 rounded-xl group-hover:scale-110 transition">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-blue-600 mt-2">{excessStockProducts.length}</p>
          <span className="inline-block mt-1 text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
            Overstocked
          </span>
        </div>

        {/* Card 6: Redistribution Opportunities */}
        <div 
          onClick={() => onSelectTab('redistribution')}
          className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-2xl border border-indigo-300 shadow-xs hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-indigo-700 uppercase">Redistributions</span>
            <div className="p-2 bg-indigo-600 text-white rounded-xl group-hover:scale-110 transition shadow-sm">
              <ArrowRightLeft className="w-5 h-5 animate-pulse" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-indigo-800 mt-2">{redistributions.length}</p>
          <span className="inline-block mt-1 text-[10px] font-extrabold bg-indigo-600 text-white px-2 py-0.5 rounded-full">
            Save ₹{ (redistributions.length * 1450).toLocaleString() }
          </span>
        </div>

      </div>

      {/* MAIN INNOVATION BANNER: EXPIRING INVENTORY REDISTRIBUTION WORKFLOW */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 text-white shadow-xl border border-indigo-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                CORE INNOVATION
              </span>
              <span className="text-xs text-indigo-200">Smart Store-to-Store Stock Balancing</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">
              Expiring Inventory ➔ Identify Excess ➔ Find Demand ➔ Recommend Redistribution
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Instead of discarding items that expire in 2–5 days, SmartStock identifies nearby stores with high sales velocity and low stock to generate instant transfer proposals!
            </p>
          </div>

          <button
            onClick={() => onSelectTab('redistribution')}
            className="bg-blue-500 hover:bg-blue-400 text-white font-extrabold text-xs px-5 py-3 rounded-2xl shadow-lg transition flex items-center space-x-2 shrink-0 border border-blue-300/40"
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span>Open Redistribution Engine →</span>
          </button>
        </div>
      </div>

      {/* TODAY'S PRIORITY ALERTS SECTION */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-slate-800 flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-ping"></span>
              <span>Today's Priority Alerts</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Actionable recommendations generated by system analysis</p>
          </div>
          <button
            onClick={() => onSelectTab('alerts')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
          >
            <span>View All Alerts ({alerts.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Priority Alert Cards */}
        <div className="space-y-3">
          
          {/* Sample Alert 1: Expiry Alert (🔴 Milk packets) */}
          <div className="p-4 bg-red-50/70 rounded-2xl border border-red-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start space-x-3">
              <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0 font-bold">
                🔴
              </div>
              <div>
                <span className="text-[10px] font-extrabold bg-red-100 text-red-800 px-2 py-0.5 rounded-full uppercase">
                  Critical Expiry Alert
                </span>
                <p className="text-sm font-extrabold text-slate-800 mt-1">
                  12 Milk packets expire in 2 days (Store A - Indiranagar)
                </p>
                <p className="text-xs text-slate-600 mt-0.5">
                  Expected sales before expiry: 50 units | Potential waste: 30 units (₹840)
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => {
                  const milk = products.find(p => p.id === 'PRD-101') || products[0];
                  onOpenTransferModal(milk);
                }}
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition shadow-xs flex items-center space-x-1"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>Move to Store B</span>
              </button>
              <button
                onClick={() => alert('Flash 25% discount applied for remaining stock at Store A!')}
                className="bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl border border-slate-300 transition"
              >
                Discount / Sell First
              </button>
            </div>
          </div>

          {/* Sample Alert 2: Excess Stock Alert (🟠 Biscuits) */}
          <div className="p-4 bg-orange-50/70 rounded-2xl border border-orange-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start space-x-3">
              <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 font-bold">
                🟠
              </div>
              <div>
                <span className="text-[10px] font-extrabold bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full uppercase">
                  Excess Stock Alert
                </span>
                <p className="text-sm font-extrabold text-slate-800 mt-1">
                  25 Biscuit packets are excess at Store A
                </p>
                <p className="text-xs text-slate-600 mt-0.5">
                  Recommended: Transfer 35 units to Store B (MG Road Metro Arcade)
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                const biscuit = products.find(p => p.id === 'PRD-103') || products[2];
                onOpenTransferModal(biscuit);
              }}
              className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs flex items-center space-x-1 shrink-0"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Transfer to Store B</span>
            </button>
          </div>

          {/* Sample Alert 3: Low Stock Alert (🟡 Cooking Oil) */}
          <div className="p-4 bg-yellow-50/70 rounded-2xl border border-yellow-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start space-x-3">
              <div className="w-9 h-9 rounded-xl bg-yellow-100 text-yellow-700 flex items-center justify-center shrink-0 font-bold">
                🟡
              </div>
              <div>
                <span className="text-[10px] font-extrabold bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full uppercase">
                  Low Stock Warning
                </span>
                <p className="text-sm font-extrabold text-slate-800 mt-1">
                  Fortune Sunlite Cooking Oil stock is low (5 units remaining)
                </p>
                <p className="text-xs text-slate-600 mt-0.5">
                  Recommended reorder quantity: 30 units | Minimum required: 25 units
                </p>
              </div>
            </div>

            <button
              onClick={() => alert('Reorder request of 30 units sent to distributor!')}
              className="bg-yellow-600 hover:bg-yellow-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs flex items-center space-x-1 shrink-0"
            >
              <Package className="w-3.5 h-3.5" />
              <span>Reorder 30 Units</span>
            </button>
          </div>

        </div>

      </div>

      {/* VISUAL CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Inventory Health Breakdown */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider mb-2">
            Inventory Risk & Stock Breakdown
          </h3>
          <p className="text-xs text-slate-500 mb-4">Distribution of items by expiry status and stock levels</p>

          <div className="h-60 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4 text-[11px] text-slate-600 font-semibold border-t border-slate-100 pt-3">
            {pieData.map(item => (
              <div key={item.name} className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                <span className="truncate">{item.name}: <strong>{item.value}</strong></span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Top Products Needing Action */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider mb-2">
              Top Products Approaching Expiry
            </h3>
            <p className="text-xs text-slate-500 mb-4">Products with least days remaining before wastage</p>

            <div className="space-y-3">
              {expiringSoonProducts.slice(0, 4).map(product => {
                const days = Math.max(0, Math.ceil((new Date(product.expiryDate) - today) / (1000 * 60 * 60 * 24)));
                return (
                  <div 
                    key={product.id}
                    onClick={() => onOpenProductDetail(product)}
                    className="p-3 bg-slate-50 hover:bg-blue-50 rounded-2xl border border-slate-200 transition cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{product.image || '📦'}</span>
                      <div>
                        <p className="font-bold text-xs text-slate-800">{product.name}</p>
                        <p className="text-[10px] text-slate-500">Stock: {product.quantity} units | Pace: {product.dailySales}/day</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-extrabold px-2.5 py-1 rounded-full ${days <= 2 ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                        {days} days left
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => onSelectTab('expiry')}
            className="mt-4 w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
          >
            View Complete Expiry Monitor →
          </button>
        </div>

      </div>

    </div>
  );
}
