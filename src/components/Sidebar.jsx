import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Clock, 
  Bell, 
  ArrowRightLeft, 
  Store, 
  BarChart3, 
  Settings,
  Sparkles,
  Zap,
  HelpCircle
} from 'lucide-react';

export default function Sidebar({ activeTab, onSelectTab, alertCount, redistributionCount }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'inventory', label: 'Inventory', icon: Package, badge: null },
    { id: 'expiry', label: 'Expiry Monitor', icon: Clock, badge: 'Urgent', badgeColor: 'bg-red-500 text-white' },
    { id: 'alerts', label: 'Alerts', icon: Bell, badge: alertCount > 0 ? alertCount : null, badgeColor: 'bg-amber-500 text-white' },
    { 
      id: 'redistribution', 
      label: 'Redistribution', 
      icon: ArrowRightLeft, 
      badge: 'Core Feature', 
      badgeColor: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold',
      highlight: true 
    },
    { id: 'stores', label: 'Stores', icon: Store, badge: '5 Branches' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: null },
    { id: 'settings', label: 'Settings', icon: Settings, badge: null },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-[calc(100vh-4rem)] flex flex-col justify-between p-4 no-print shrink-0 hidden md:flex">
      
      {/* Navigation List */}
      <div className="space-y-1">
        <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Main Menu
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition group ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/50' 
                  : item.highlight
                    ? 'bg-slate-800/80 text-blue-300 hover:bg-slate-800 border border-blue-500/30'
                    : 'hover:bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-5 h-5 transition ${isActive ? 'text-white' : item.highlight ? 'text-blue-400' : 'text-slate-400 group-hover:text-white'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${item.badgeColor || 'bg-slate-700 text-slate-300'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Educational / Quick Help Card */}
      <div className="bg-gradient-to-br from-slate-800 to-indigo-950/80 rounded-2xl p-3.5 border border-indigo-500/20 text-xs">
        <div className="flex items-center space-x-2 text-indigo-300 font-bold mb-1">
          <Zap className="w-4 h-4 text-amber-400 animate-bounce" />
          <span>Smart Assistant Tip</span>
        </div>
        <p className="text-slate-300 text-[11px] leading-relaxed">
          The Redistribution engine automatically scans all 5 branches daily to match overstocked expiring items with high-demand stores!
        </p>
      </div>

    </aside>
  );
}
