# 📦 SmartStock – Inventory Expiry & Redistribution Alert System

> **A modern, user-friendly inventory management and intelligent inter-store redistribution web application built for Tier-2 retail shopkeepers.**

[![React](https://img.shields.io/badge/React-19.x-blue.svg?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🎯 Project Purpose & Core Problem

Retail shopkeepers across Tier-2 cities frequently face massive financial losses due to:
1. **Unsold Expiries:** Perishable goods expiring on shelves before being sold.
2. **Imbalanced Branch Stock:** Overstocking at Store A while nearby Store B faces severe stockouts.
3. **Manual Monitoring Fatigue:** Paper logbooks and complex ERPs that are too complicated for non-technical shopkeepers.
4. **Lack of Demand-Based Redistribution:** No automated intelligence to move products between nearby branches before expiration.

**SmartStock** solves this by delivering *"WhatsApp-level simplicity + modern business dashboard power"*, automatically identifying expiring excess inventory at one branch and matching it with high-demand partner branches within kilometers.

---

## 🚀 The Core Innovation: Automated Redistribution Pipeline

```
┌──────────────────────────┐
│  EXPIRING INVENTORY      │  (e.g., 80 units Milk expiring in 2 days at Store A)
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│  IDENTIFY EXCESS STOCK   │  (Expected sales: 50 units ➔ 30 units will spoil!)
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│  FIND HIGH-DEMAND STORE  │  (Store B has high footfall, 10 units left, 20/day sales)
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│  SMART RECOMMENDATION    │  ("Transfer 25 units from Store A ➔ Store B (4.2 km)")
└────────────┬─────────────┘
             ▼
┌──────────────────────────┐
│  1-CLICK APPROVAL        │  (Status: Pending ➔ In Transit ➔ Received ➔ Completed)
└──────────────────────────┘
```

---

## 🛠️ Complete Application Modules

| Module | Description | Location |
| :--- | :--- | :--- |
| **Login & Multi-Store Setup** | Simple phone/email login, 1-click demo personas (Rajesh Kumar / Anita Sharma), and multi-branch onboarding. | [`src/pages/LoginPage.jsx`](src/pages/LoginPage.jsx) |
| **Main Dashboard** | 6 summary KPI cards, 10-second visual inventory health pipeline, Today's Priority Alerts with direct action buttons. | [`src/pages/DashboardPage.jsx`](src/pages/DashboardPage.jsx) |
| **Inventory Management** | Table & Grid views, search, category filters, CRUD actions, days remaining calculations, CSV import/export. | [`src/pages/InventoryPage.jsx`](src/pages/InventoryPage.jsx) |
| **Expiry Monitor** | Urgency radar (`CRITICAL` 1–2d, `HIGH` 3–5d, `MEDIUM` 6–7d, `SAFE`), leftover forecast & 7-day timeline calendar. | [`src/pages/ExpiryMonitorPage.jsx`](src/pages/ExpiryMonitorPage.jsx) |
| **Smart Alert System** | Color-coded alert channels (🔴 Expiry, 🟠 Excess, 🟡 Low Stock, 🔵 Redistribution, 🟣 Demand) with 1-click action triggers. | [`src/pages/AlertsPage.jsx`](src/pages/AlertsPage.jsx) |
| **Redistribution Engine** | Store-to-store stock balancing, distance calculation, AI logic explanations, and interactive transfer workflow tracker. | [`src/pages/RedistributionPage.jsx`](src/pages/RedistributionPage.jsx) |
| **Multi-Store Network** | Branch cards with dynamic Inventory Health Score % (🟢 Healthy, 🟠 Needs Attention) and single-click store filtering. | [`src/pages/StoresPage.jsx`](src/pages/StoresPage.jsx) |
| **Analytics & Reports** | Financial waste prevention KPI metrics, monthly expired vs. saved stock charts, and PDF/CSV export. | [`src/pages/AnalyticsPage.jsx`](src/pages/AnalyticsPage.jsx) |
| **Product Detail Drawer** | Projected 7-day stock depletion curve area charts, profit margin analytics, and 1-click redistribution modals. | [`src/components/ProductDetailDrawer.jsx`](src/components/ProductDetailDrawer.jsx) |
| **Barcode Scanner** | Interactive camera feed simulation with audio beep effect and quick sample code selection. | [`src/components/BarcodeScannerModal.jsx`](src/components/BarcodeScannerModal.jsx) |
| **Voice Assist Audio** | Native SpeechSynthesis engine to pronounce morning inventory health summaries aloud for shopkeepers. | [`src/App.jsx`](src/App.jsx) |

---

## 🧠 Smart Recommendation Priority Formula

$$\text{Priority Score} = \text{Expiry Risk (40\%)} + \text{Excess Stock (30\%)} + \text{Sales Velocity \& Distance (30\%)}$$

Every recommendation includes a simple plain-language explanation:
> *"Store A has more stock than it can sell before expiry, while Store B has high customer demand and low inventory."*

---

## 💻 Tech Stack

- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4 + Lucide React Icons
- **Data Visualizations:** Recharts (AreaCharts, BarCharts, PieCharts)
- **State & Persistence:** React State + Browser LocalStorage
- **Interactive FX:** Canvas-Confetti, Web Audio API, Web Speech API

---

## 🚦 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/smartstock-inventory-redistribution.git
cd smartstock-inventory-redistribution

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
