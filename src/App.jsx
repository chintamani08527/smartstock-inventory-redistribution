import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import InventoryPage from './pages/InventoryPage';
import ExpiryMonitorPage from './pages/ExpiryMonitorPage';
import AlertsPage from './pages/AlertsPage';
import RedistributionPage from './pages/RedistributionPage';
import StoresPage from './pages/StoresPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';

// Modals
import BarcodeScannerModal from './components/BarcodeScannerModal';
import AddEditProductModal from './components/AddEditProductModal';
import ProductDetailDrawer from './components/ProductDetailDrawer';
import TransferModal from './components/TransferModal';
import NotificationSettingsModal from './components/NotificationSettingsModal';
import CSVImportExportModal from './components/CSVImportExportModal';
import AddBranchModal from './components/AddBranchModal';

// Mock Data Initializers
import { 
  INITIAL_STORES, 
  INITIAL_PRODUCTS, 
  INITIAL_REDISTRIBUTIONS, 
  INITIAL_ALERTS, 
  DEMO_USERS,
  calculateHealthScore 
} from './data/mockData';

export default function App() {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState(DEMO_USERS[0]);

  // Active Store & Navigation State
  const [selectedStoreId, setSelectedStoreId] = useState('ALL');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentLang, setCurrentLang] = useState('EN');

  // Persistence State
  const [stores, setStores] = useState(() => {
    const saved = localStorage.getItem('smartstock_stores');
    return saved ? JSON.parse(saved) : INITIAL_STORES;
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('smartstock_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [redistributions, setRedistributions] = useState(() => {
    const saved = localStorage.getItem('smartstock_redistributions');
    return saved ? JSON.parse(saved) : INITIAL_REDISTRIBUTIONS;
  });

  const [alerts, setAlerts] = useState(() => {
    const saved = localStorage.getItem('smartstock_alerts');
    return saved ? JSON.parse(saved) : INITIAL_ALERTS;
  });

  // Modal Visibility States
  const [isBarcodeOpen, setIsBarcodeOpen] = useState(false);
  const [isAddEditProductOpen, setIsAddEditProductOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [selectedDetailProduct, setSelectedDetailProduct] = useState(null);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [transferProduct, setTransferProduct] = useState(null);
  const [isNotificationSettingsOpen, setIsNotificationSettingsOpen] = useState(false);
  const [isCSVModalOpen, setIsCSVModalOpen] = useState(false);
  const [isAddBranchModalOpen, setIsAddBranchModalOpen] = useState(false);

  // Toast Banner Notification
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('smartstock_stores', JSON.stringify(stores));
  }, [stores]);

  useEffect(() => {
    localStorage.setItem('smartstock_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('smartstock_redistributions', JSON.stringify(redistributions));
  }, [redistributions]);

  useEffect(() => {
    localStorage.setItem('smartstock_alerts', JSON.stringify(alerts));
  }, [alerts]);

  // Overall Health Score calculation
  const globalHealthScore = calculateHealthScore(selectedStoreId, products, redistributions);

  // CRUD Handlers
  const handleSaveProduct = (productData) => {
    setProducts(prev => {
      const exists = prev.some(p => p.id === productData.id);
      if (exists) {
        showToast(`Updated details for "${productData.name}"`);
        return prev.map(p => p.id === productData.id ? productData : p);
      } else {
        showToast(`Added new product "${productData.name}" to inventory`);
        return [productData, ...prev];
      }
    });
  };

  const handleDeleteProduct = (productId) => {
    const p = products.find(prod => prod.id === productId);
    if (window.confirm(`Are you sure you want to delete "${p?.name || 'this product'}"?`)) {
      setProducts(prev => prev.filter(item => item.id !== productId));
      showToast(`Deleted product from inventory.`);
    }
  };

  const handleApproveTransfer = (transferData) => {
    const newRedistribution = {
      id: `RED-${Math.floor(1000 + Math.random() * 9000)}`,
      ...transferData,
      status: 'Pending',
      createdDate: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setRedistributions(prev => [newRedistribution, ...prev]);

    // Deduct quantity from source store
    setProducts(prev => prev.map(p => {
      if (p.id === transferData.productId) {
        return {
          ...p,
          quantity: Math.max(0, p.quantity - (transferData.transferQty || 25))
        };
      }
      return p;
    }));

    showToast(`Approved inter-branch transfer of ${transferData.transferQty || 25} units to ${transferData.destStoreName || 'destination store'}!`);
  };

  const handleUpdateTransferStatus = (transferId, newStatus) => {
    setRedistributions(prev => prev.map(r => r.id === transferId ? { ...r, status: newStatus } : r));
    showToast(`Updated transfer ${transferId} status to "${newStatus}"`);
  };

  const handleAcceptAlert = (alertItem) => {
    setAlerts(prev => prev.filter(a => a.id !== alertItem.id));
    if (alertItem.productId) {
      const targetProd = products.find(p => p.id === alertItem.productId);
      if (targetProd) {
        setTransferProduct(targetProd);
        setIsTransferModalOpen(true);
      }
    } else {
      showToast(`Accepted recommendation: ${alertItem.recommendedAction}`);
    }
  };

  const handleRejectAlert = (alertId) => {
    setAlerts(prev => prev.filter(a => a.id !== alertId));
    showToast(`Alert dismissed.`);
  };

  const handleAddBranchStore = (newStoreData) => {
    setStores(prev => [...prev, newStoreData]);
    showToast(`New store branch "${newStoreData.shortName}" registered successfully!`);
  };

  const handleImportCSVProducts = (importedList) => {
    setProducts(prev => [...importedList, ...prev]);
    showToast(`Imported ${importedList.length} products into inventory from CSV.`);
  };

  const handleResetDemoData = () => {
    if (window.confirm('Reset all demo data back to initial state?')) {
      localStorage.clear();
      setStores(INITIAL_STORES);
      setProducts(INITIAL_PRODUCTS);
      setRedistributions(INITIAL_REDISTRIBUTIONS);
      setAlerts(INITIAL_ALERTS);
      showToast('Demo data reset to clean initial state.');
    }
  };

  // Audio Voice Summary Assist for Shopkeeper
  const handleTriggerVoiceSummary = () => {
    const expiringCount = products.filter(p => {
      const exp = new Date(p.expiryDate);
      const daysLeft = Math.ceil((exp - new Date(2026, 9, 7)) / (1000 * 60 * 60 * 24));
      return daysLeft > 0 && daysLeft <= 7;
    }).length;

    const speechText = `Namaste ${currentUser.name}! Good morning. Today you have ${expiringCount} items expiring soon, and ${redistributions.length} active inter-store transfers ready to save your store money. SmartStock is protecting your stock health!`;

    showToast(`🔊 Voice Assist: ${speechText}`);

    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      synth.cancel();
      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.rate = 0.95;
      synth.speak(utterance);
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={(user) => { setCurrentUser(user); setIsLoggedIn(true); }} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white font-bold text-xs px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 animate-in slide-in-from-top-4 flex items-center space-x-2 max-w-md">
          <span className="text-base">✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Navbar */}
      <Navbar
        stores={stores}
        selectedStoreId={selectedStoreId}
        onSelectStore={(stId) => setSelectedStoreId(stId)}
        user={currentUser}
        onLogout={() => setIsLoggedIn(false)}
        onOpenBarcodeScanner={() => setIsBarcodeOpen(true)}
        onOpenNotifications={() => setActiveTab('alerts')}
        unreadAlertCount={alerts.length}
        currentLang={currentLang}
        onChangeLang={(lang) => { setCurrentLang(lang); showToast(`Language switched to ${lang}`); }}
        onTriggerVoiceSummary={handleTriggerVoiceSummary}
        onResetData={handleResetDemoData}
      />

      {/* Main Layout Container */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
          alertCount={alerts.length}
          redistributionCount={redistributions.length}
        />

        {/* Main Page Area */}
        <main className="flex-1 min-w-0 md:pl-6">
          
          {/* Responsive Mobile Navigation Bar */}
          <div className="md:hidden flex items-center space-x-2 overflow-x-auto pb-3 mb-4 border-b border-slate-200 text-xs font-bold no-print">
            {[
              { id: 'dashboard', label: '🏠 Dashboard' },
              { id: 'inventory', label: '📦 Inventory' },
              { id: 'expiry', label: '⏰ Expiry' },
              { id: 'alerts', label: '🔔 Alerts' },
              { id: 'redistribution', label: '🔄 Redistribution' },
              { id: 'stores', label: '🏪 Stores' },
              { id: 'analytics', label: '📊 Analytics' },
              { id: 'settings', label: '⚙️ Settings' },
            ].map(nav => (
              <button
                key={nav.id}
                onClick={() => setActiveTab(nav.id)}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition ${activeTab === nav.id ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 border border-slate-200'}`}
              >
                {nav.label}
              </button>
            ))}
          </div>

          {/* PAGE ROUTER */}
          {activeTab === 'dashboard' && (
            <DashboardPage
              user={currentUser}
              products={products}
              stores={stores}
              redistributions={redistributions}
              alerts={alerts}
              healthScore={globalHealthScore}
              onSelectTab={(tab) => setActiveTab(tab)}
              onOpenTransferModal={(p) => { setTransferProduct(p); setIsTransferModalOpen(true); }}
              onOpenProductDetail={(p) => { setSelectedDetailProduct(p); setIsProductDetailOpen(true); }}
              onAcceptAlert={handleAcceptAlert}
            />
          )}

          {activeTab === 'inventory' && (
            <InventoryPage
              products={products}
              stores={stores}
              selectedStoreId={selectedStoreId}
              onOpenAddModal={() => { setProductToEdit(null); setIsAddEditProductOpen(true); }}
              onOpenEditModal={(p) => { setProductToEdit(p); setIsAddEditProductOpen(true); }}
              onDeleteProduct={handleDeleteProduct}
              onOpenProductDetail={(p) => { setSelectedDetailProduct(p); setIsProductDetailOpen(true); }}
              onOpenTransferModal={(p) => { setTransferProduct(p); setIsTransferModalOpen(true); }}
              onOpenBarcodeScanner={() => setIsBarcodeOpen(true)}
              onOpenCSVModal={() => setIsCSVModalOpen(true)}
            />
          )}

          {activeTab === 'expiry' && (
            <ExpiryMonitorPage
              products={products}
              stores={stores}
              onOpenTransferModal={(p) => { setTransferProduct(p); setIsTransferModalOpen(true); }}
              onOpenProductDetail={(p) => { setSelectedDetailProduct(p); setIsProductDetailOpen(true); }}
            />
          )}

          {activeTab === 'alerts' && (
            <AlertsPage
              alerts={alerts}
              products={products}
              stores={stores}
              onAcceptAlert={handleAcceptAlert}
              onRejectAlert={handleRejectAlert}
              onOpenProductDetail={(p) => { setSelectedDetailProduct(p); setIsProductDetailOpen(true); }}
              onOpenNotificationSettings={() => setIsNotificationSettingsOpen(true)}
            />
          )}

          {activeTab === 'redistribution' && (
            <RedistributionPage
              redistributions={redistributions}
              products={products}
              stores={stores}
              onApproveTransfer={handleApproveTransfer}
              onUpdateTransferStatus={handleUpdateTransferStatus}
            />
          )}

          {activeTab === 'stores' && (
            <StoresPage
              stores={stores}
              products={products}
              redistributions={redistributions}
              onSelectStore={(stId) => { setSelectedStoreId(stId); setActiveTab('inventory'); }}
              onOpenAddBranchModal={() => setIsAddBranchModalOpen(true)}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsPage
              products={products}
              stores={stores}
              redistributions={redistributions}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsPage
              user={currentUser}
              onResetData={handleResetDemoData}
              currentLang={currentLang}
              onChangeLang={(lang) => setCurrentLang(lang)}
            />
          )}

        </main>

      </div>

      {/* ALL MODALS */}
      <BarcodeScannerModal
        isOpen={isBarcodeOpen}
        onClose={() => setIsBarcodeOpen(false)}
        products={products}
        onSelectScannedProduct={(p) => { setSelectedDetailProduct(p); setIsProductDetailOpen(true); }}
      />

      <AddEditProductModal
        isOpen={isAddEditProductOpen}
        onClose={() => setIsAddEditProductOpen(false)}
        onSave={handleSaveProduct}
        productToEdit={productToEdit}
        stores={stores}
      />

      <ProductDetailDrawer
        product={selectedDetailProduct}
        store={stores.find(s => s.id === selectedDetailProduct?.storeId)}
        stores={stores}
        isOpen={isProductDetailOpen}
        onClose={() => setIsProductDetailOpen(false)}
        onInitiateTransfer={(p) => { setTransferProduct(p); setIsTransferModalOpen(true); }}
      />

      <TransferModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        product={transferProduct}
        sourceStore={stores.find(s => s.id === transferProduct?.storeId)}
        stores={stores}
        onConfirmTransfer={handleApproveTransfer}
      />

      <NotificationSettingsModal
        isOpen={isNotificationSettingsOpen}
        onClose={() => setIsNotificationSettingsOpen(false)}
      />

      <CSVImportExportModal
        isOpen={isCSVModalOpen}
        onClose={() => setIsCSVModalOpen(false)}
        products={products}
        onImportProducts={handleImportCSVProducts}
      />

      <AddBranchModal
        isOpen={isAddBranchModalOpen}
        onClose={() => setIsAddBranchModalOpen(false)}
        onAddStore={handleAddBranchStore}
      />

    </div>
  );
}
