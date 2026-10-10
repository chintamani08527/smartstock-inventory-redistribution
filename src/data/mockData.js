// Mock Database & Initial Demo Data for SmartStock

export const INITIAL_STORES = [
  {
    id: "STR-001",
    name: "Gupta General Store - Indiranagar Main Branch",
    shortName: "Store A (Indiranagar)",
    location: "Indiranagar 100ft Road, Bengaluru",
    type: "Supermarket / Grocery",
    employees: 8,
    phone: "+91 98765 43210",
    manager: "Rajesh Gupta",
    distanceKm: 0, // Central reference
    isMain: true,
  },
  {
    id: "STR-002",
    name: "Gupta Mini Mart - MG Road Branch",
    shortName: "Store B (MG Road)",
    location: "MG Road Metro Station Arcade, Bengaluru",
    type: "Express Convenience Store",
    employees: 4,
    phone: "+91 98765 43211",
    manager: "Suresh Sharma",
    distanceKm: 4.2,
    isMain: false,
  },
  {
    id: "STR-003",
    name: "Gupta Store - Railway Station Junction",
    shortName: "Store C (Railway Station)",
    location: "Platform 1 Gate Road, Bengaluru Central",
    type: "Transit Kiosk / Mini Mart",
    employees: 3,
    phone: "+91 98765 43212",
    manager: "Amit Kumar",
    distanceKm: 7.5,
    isMain: false,
  },
  {
    id: "STR-004",
    name: "Gupta Express - Residential Colony Branch",
    shortName: "Store D (Residential Colony)",
    location: "Koramanagala 4th Block, Bengaluru",
    type: "Neighborhood Retail",
    employees: 5,
    phone: "+91 98765 43213",
    manager: "Pooja Verma",
    distanceKm: 5.8,
    isMain: false,
  },
  {
    id: "STR-005",
    name: "Gupta Traders - Highway Outpost Store",
    shortName: "Store E (Highway Outpost)",
    location: "Hosur Main Highway Hub, Bengaluru",
    type: "Wholesale & Retail",
    employees: 6,
    phone: "+91 98765 43214",
    manager: "Venkatesh Rao",
    distanceKm: 11.4,
    isMain: false,
  }
];

// Helper to format date relative to today (2026-10-07)
const getRelativeDate = (daysOffset) => {
  const d = new Date(2026, 9, 7); // Oct 7, 2026
  d.setDate(d.getDate() + daysOffset);
  return d.toISOString().split('T')[0];
};

export const INITIAL_PRODUCTS = [
  {
    id: "PRD-101",
    name: "Amul Taaza Toned Milk 500ml",
    category: "Dairy & Fresh",
    brand: "Amul",
    barcode: "8901262010015",
    batchNumber: "BCH-2026-M88",
    quantity: 80,
    minStock: 20,
    maxStock: 100,
    expiryDate: getRelativeDate(2), // 2 days left (CRITICAL)
    purchaseDate: getRelativeDate(-3),
    purchasePrice: 24,
    sellingPrice: 28,
    dailySales: 15,
    storeId: "STR-001", // Store A
    image: "🥛",
  },
  {
    id: "PRD-102",
    name: "Britannia Daily Fresh Bread 400g",
    category: "Bakery",
    brand: "Britannia",
    barcode: "8901063001021",
    batchNumber: "BCH-2026-B12",
    quantity: 35,
    minStock: 15,
    maxStock: 50,
    expiryDate: getRelativeDate(1), // 1 day left (CRITICAL)
    purchaseDate: getRelativeDate(-2),
    purchasePrice: 35,
    sellingPrice: 45,
    dailySales: 12,
    storeId: "STR-001", // Store A
    image: "🍞",
  },
  {
    id: "PRD-103",
    name: "Parle-G Gold Biscuits 250g",
    category: "Snacks & Biscuits",
    brand: "Parle",
    barcode: "8901030000010",
    batchNumber: "BCH-2026-PG04",
    quantity: 130, // Excess stock!
    minStock: 30,
    maxStock: 60,
    expiryDate: getRelativeDate(5), // 5 days left
    purchaseDate: getRelativeDate(-10),
    purchasePrice: 22,
    sellingPrice: 30,
    dailySales: 8,
    storeId: "STR-001", // Store A
    image: "🍪",
  },
  {
    id: "PRD-104",
    name: "Fortune Sunlite Sunflower Oil 1L",
    category: "Cooking Oils & Staples",
    brand: "Fortune",
    barcode: "8906007280011",
    batchNumber: "BCH-2026-FO99",
    quantity: 5, // LOW STOCK!
    minStock: 25,
    maxStock: 100,
    expiryDate: getRelativeDate(180),
    purchaseDate: getRelativeDate(-15),
    purchasePrice: 135,
    sellingPrice: 160,
    dailySales: 10,
    storeId: "STR-001", // Store A
    image: "🏺",
  },
  {
    id: "PRD-105",
    name: "Tropicana 100% Orange Juice 1L",
    category: "Beverages",
    brand: "Tropicana",
    barcode: "8902080005020",
    batchNumber: "BCH-2026-TJ44",
    quantity: 45,
    minStock: 10,
    maxStock: 50,
    expiryDate: getRelativeDate(4), // 4 days left (HIGH)
    purchaseDate: getRelativeDate(-8),
    purchasePrice: 95,
    sellingPrice: 120,
    dailySales: 5,
    storeId: "STR-001", // Store A
    image: "🧃",
  },
  {
    id: "PRD-106",
    name: "Mother Dairy Fresh Paneer 200g",
    category: "Dairy & Fresh",
    brand: "Mother Dairy",
    barcode: "8901648002014",
    batchNumber: "BCH-2026-MD11",
    quantity: 28,
    minStock: 10,
    maxStock: 40,
    expiryDate: getRelativeDate(3), // 3 days left (HIGH)
    purchaseDate: getRelativeDate(-2),
    purchasePrice: 70,
    sellingPrice: 90,
    dailySales: 6,
    storeId: "STR-001", // Store A
    image: "🧀",
  },
  {
    id: "PRD-107",
    name: "Cadbury Dairy Milk Silk 150g",
    category: "Confectionery",
    brand: "Cadbury",
    barcode: "8901233020040",
    batchNumber: "BCH-2026-CD77",
    quantity: 50,
    minStock: 15,
    maxStock: 60,
    expiryDate: getRelativeDate(6), // 6 days left (MEDIUM)
    purchaseDate: getRelativeDate(-12),
    purchasePrice: 140,
    sellingPrice: 175,
    dailySales: 4,
    storeId: "STR-001", // Store A
    image: "🍫",
  },

  // STORE B (MG Road Branch) Products
  {
    id: "PRD-201",
    name: "Amul Taaza Toned Milk 500ml",
    category: "Dairy & Fresh",
    brand: "Amul",
    barcode: "8901262010015",
    batchNumber: "BCH-2026-M88-B",
    quantity: 10, // LOW STOCK & HIGH DEMAND!
    minStock: 30,
    maxStock: 100,
    expiryDate: getRelativeDate(5),
    purchaseDate: getRelativeDate(-1),
    purchasePrice: 24,
    sellingPrice: 28,
    dailySales: 25, // High demand at Metro arcade!
    storeId: "STR-002", // Store B
    image: "🥛",
  },
  {
    id: "PRD-202",
    name: "Parle-G Gold Biscuits 250g",
    category: "Snacks & Biscuits",
    brand: "Parle",
    barcode: "8901030000010",
    batchNumber: "BCH-2026-PG04-B",
    quantity: 8, // LOW STOCK!
    minStock: 25,
    maxStock: 80,
    expiryDate: getRelativeDate(90),
    purchaseDate: getRelativeDate(-5),
    purchasePrice: 22,
    sellingPrice: 30,
    dailySales: 18,
    storeId: "STR-002", // Store B
    image: "🍪",
  },
  {
    id: "PRD-203",
    name: "Tropicana 100% Orange Juice 1L",
    category: "Beverages",
    brand: "Tropicana",
    barcode: "8902080005020",
    batchNumber: "BCH-2026-TJ44-B",
    quantity: 4, // LOW STOCK!
    minStock: 20,
    maxStock: 60,
    expiryDate: getRelativeDate(60),
    purchaseDate: getRelativeDate(-2),
    purchasePrice: 95,
    sellingPrice: 120,
    dailySales: 12,
    storeId: "STR-002", // Store B
    image: "🧃",
  },
  {
    id: "PRD-204",
    name: "Coca-Cola 750ml PET Bottle",
    category: "Beverages",
    brand: "Coca-Cola",
    barcode: "8901764012001",
    batchNumber: "BCH-2026-CC10",
    quantity: 95, // EXCESS
    minStock: 20,
    maxStock: 50,
    expiryDate: getRelativeDate(14),
    purchaseDate: getRelativeDate(-10),
    purchasePrice: 32,
    sellingPrice: 40,
    dailySales: 6,
    storeId: "STR-002", // Store B
    image: "🥤",
  },

  // STORE C (Railway Station Kiosk) Products
  {
    id: "PRD-301",
    name: "Britannia Daily Fresh Bread 400g",
    category: "Bakery",
    brand: "Britannia",
    barcode: "8901063001021",
    batchNumber: "BCH-2026-B12-C",
    quantity: 3, // CRITICAL LOW STOCK
    minStock: 20,
    maxStock: 50,
    expiryDate: getRelativeDate(4),
    purchaseDate: getRelativeDate(-1),
    purchasePrice: 35,
    sellingPrice: 45,
    dailySales: 22,
    storeId: "STR-003", // Store C
    image: "🍞",
  },
  {
    id: "PRD-302",
    name: "Mother Dairy Fresh Paneer 200g",
    category: "Dairy & Fresh",
    brand: "Mother Dairy",
    barcode: "8901648002014",
    batchNumber: "BCH-2026-MD11-C",
    quantity: 5,
    minStock: 15,
    maxStock: 40,
    expiryDate: getRelativeDate(4),
    purchaseDate: getRelativeDate(-1),
    purchasePrice: 70,
    sellingPrice: 90,
    dailySales: 14,
    storeId: "STR-003", // Store C
    image: "🧀",
  },
  {
    id: "PRD-303",
    name: "Crocin Pain Relief Tablets 15s",
    category: "OTC Health Care",
    brand: "Crocin",
    barcode: "8901086001002",
    batchNumber: "BCH-2026-CR55",
    quantity: 60,
    minStock: 10,
    maxStock: 80,
    expiryDate: getRelativeDate(2), // 2 days left (CRITICAL)
    purchaseDate: getRelativeDate(-30),
    purchasePrice: 28,
    sellingPrice: 40,
    dailySales: 3,
    storeId: "STR-003", // Store C
    image: "💊",
  },

  // STORE D & E Products
  {
    id: "PRD-401",
    name: "Aashirvaad Whole Wheat Atta 5kg",
    category: "Cooking Oils & Staples",
    brand: "Aashirvaad",
    barcode: "8901058000502",
    batchNumber: "BCH-2026-AA90",
    quantity: 40,
    minStock: 15,
    maxStock: 80,
    expiryDate: getRelativeDate(120),
    purchaseDate: getRelativeDate(-10),
    purchasePrice: 210,
    sellingPrice: 245,
    dailySales: 5,
    storeId: "STR-004", // Store D
    image: "🌾",
  },
  {
    id: "PRD-402",
    name: "Real Fruit Power Mango 1L",
    category: "Beverages",
    brand: "Real",
    barcode: "8901207003010",
    batchNumber: "BCH-2026-RM33",
    quantity: 42,
    minStock: 10,
    maxStock: 40,
    expiryDate: getRelativeDate(3), // 3 days left (HIGH)
    purchaseDate: getRelativeDate(-7),
    purchasePrice: 90,
    sellingPrice: 115,
    dailySales: 4,
    storeId: "STR-004", // Store D
    image: "🥭",
  },
  {
    id: "PRD-501",
    name: "Saffola Gold Cooking Oil 5L Jar",
    category: "Cooking Oils & Staples",
    brand: "Saffola",
    barcode: "8901088015009",
    batchNumber: "BCH-2026-SG55",
    quantity: 65, // EXCESS at Highway store
    minStock: 10,
    maxStock: 30,
    expiryDate: getRelativeDate(18),
    purchaseDate: getRelativeDate(-20),
    purchasePrice: 650,
    sellingPrice: 780,
    dailySales: 2,
    storeId: "STR-005", // Store E
    image: "🛢️",
  },
  {
    id: "PRD-502",
    name: "Amul Butter 500g Pack",
    category: "Dairy & Fresh",
    brand: "Amul",
    barcode: "8901262020021",
    batchNumber: "BCH-2026-AB22",
    quantity: 50,
    minStock: 10,
    maxStock: 40,
    expiryDate: getRelativeDate(-1), // EXPIRED product demo! (8 units expired)
    purchaseDate: getRelativeDate(-20),
    purchasePrice: 220,
    sellingPrice: 260,
    dailySales: 0,
    storeId: "STR-005", // Store E
    image: "🧈",
  }
];

export const INITIAL_REDISTRIBUTIONS = [
  {
    id: "RED-1001",
    sourceStoreId: "STR-001",
    sourceStoreName: "Store A (Indiranagar)",
    destStoreId: "STR-002",
    destStoreName: "Store B (MG Road)",
    productId: "PRD-101",
    productName: "Amul Taaza Toned Milk 500ml",
    availableQty: 80,
    recommendedQty: 25,
    distanceKm: 4.2,
    reason: "Store A has 80 units expiring in 2 days (sales pace: 15/day). Store B has only 10 units in stock with high demand (25/day).",
    expiryRisk: "CRITICAL (2 days left)",
    demandLevel: "VERY HIGH",
    priorityScore: 94,
    status: "Pending", // Pending -> In Transit -> Received -> Completed
    createdDate: "2026-10-07 08:30 AM",
  },
  {
    id: "RED-1002",
    sourceStoreId: "STR-001",
    sourceStoreName: "Store A (Indiranagar)",
    destStoreId: "STR-002",
    destStoreName: "Store B (MG Road)",
    productId: "PRD-103",
    productName: "Parle-G Gold Biscuits 250g",
    availableQty: 130,
    recommendedQty: 35,
    distanceKm: 4.2,
    reason: "Store A is overstocked by 70 units beyond max threshold. Store B has low stock (8 units left).",
    expiryRisk: "HIGH (5 days left)",
    demandLevel: "HIGH",
    priorityScore: 88,
    status: "Pending",
    createdDate: "2026-10-07 07:15 AM",
  },
  {
    id: "RED-1003",
    sourceStoreId: "STR-001",
    sourceStoreName: "Store A (Indiranagar)",
    destStoreId: "STR-003",
    destStoreName: "Store C (Railway Station)",
    productId: "PRD-102",
    productName: "Britannia Daily Fresh Bread 400g",
    availableQty: 35,
    recommendedQty: 15,
    distanceKm: 7.5,
    reason: "Store A bread expires in 1 day with 35 units left. Store C railway kiosk has high daily turnover (22/day) & only 3 left.",
    expiryRisk: "CRITICAL (1 day left)",
    demandLevel: "EXTREME",
    priorityScore: 98,
    status: "In Transit",
    createdDate: "2026-10-06 05:40 PM",
  },
  {
    id: "RED-1004",
    sourceStoreId: "STR-005",
    sourceStoreName: "Store E (Highway Outpost)",
    destStoreId: "STR-001",
    destStoreName: "Store A (Indiranagar)",
    productId: "PRD-501",
    productName: "Saffola Gold Cooking Oil 5L Jar",
    availableQty: 65,
    recommendedQty: 20,
    distanceKm: 11.4,
    reason: "Store E has 65 units (overstock) selling only 2/day. Store A has low oil stock (5 units left).",
    expiryRisk: "MEDIUM (18 days left)",
    demandLevel: "HIGH",
    priorityScore: 82,
    status: "Pending",
    createdDate: "2026-10-07 06:10 AM",
  }
];

export const INITIAL_ALERTS = [
  {
    id: "ALT-901",
    type: "Expiry Alert",
    categoryCode: "EXPIRY",
    color: "red",
    priority: "CRITICAL",
    productName: "Amul Taaza Toned Milk 500ml",
    storeName: "Store A (Indiranagar)",
    quantity: 80,
    reason: "12 Milk packets expire in 2 days. At current sales rate (15/day), ~50 units will expire unsold!",
    recommendedAction: "Transfer 25 units to Store B / Apply 20% discount on remaining",
    productId: "PRD-101",
    storeId: "STR-001",
    date: "10 mins ago",
    status: "Active"
  },
  {
    id: "ALT-902",
    type: "Excess Stock Alert",
    categoryCode: "EXCESS",
    color: "orange",
    priority: "HIGH",
    productName: "Parle-G Gold Biscuits 250g",
    storeName: "Store A (Indiranagar)",
    quantity: 130,
    reason: "25 Biscuit packets are excess at Store A (Max stock capacity 60 units).",
    recommendedAction: "Transfer 35 units to Store B (MG Road Metro Arcade)",
    productId: "PRD-103",
    storeId: "STR-001",
    date: "25 mins ago",
    status: "Active"
  },
  {
    id: "ALT-903",
    type: "Low Stock Alert",
    categoryCode: "LOW_STOCK",
    color: "yellow",
    priority: "MEDIUM",
    productName: "Fortune Sunlite Sunflower Oil 1L",
    storeName: "Store A (Indiranagar)",
    quantity: 5,
    reason: "Cooking Oil stock is low (5 units left vs Minimum 25 required). Stockout expected in 12 hours.",
    recommendedAction: "Reorder 30 units or Request Transfer 20 units from Store E",
    productId: "PRD-104",
    storeId: "STR-001",
    date: "1 hour ago",
    status: "Active"
  },
  {
    id: "ALT-904",
    type: "Redistribution Alert",
    categoryCode: "REDISTRIBUTION",
    color: "blue",
    priority: "HIGH",
    productName: "Britannia Daily Fresh Bread 400g",
    storeName: "Store A -> Store C",
    quantity: 15,
    reason: "High demand opportunity detected at Store C Railway Station (22 sales/day vs 3 stock left).",
    recommendedAction: "Approve transfer of 15 units of Bread from Store A",
    productId: "PRD-102",
    storeId: "STR-001",
    date: "2 hours ago",
    status: "Active"
  },
  {
    id: "ALT-905",
    type: "Demand Spike Alert",
    categoryCode: "DEMAND",
    color: "purple",
    priority: "INFO",
    productName: "Coca-Cola 750ml PET Bottle",
    storeName: "Store B (MG Road)",
    quantity: 95,
    reason: "Weekend demand spike forecast due to nearby metro sports event.",
    recommendedAction: "Maintain promotional end-cap display at MG Road outlet",
    productId: "PRD-204",
    storeId: "STR-002",
    date: "3 hours ago",
    status: "Active"
  }
];

export const DEMO_USERS = [
  {
    id: "USR-001",
    name: "Rajesh Kumar",
    role: "Owner / Master Admin",
    phone: "9876543210",
    email: "rajesh@guptastores.com",
    avatar: "👨‍💼",
    mainStore: "Gupta General Store - Indiranagar",
  },
  {
    id: "USR-002",
    name: "Anita Sharma",
    role: "Store Manager",
    phone: "9812345678",
    email: "anita@guptastores.com",
    avatar: "👩‍💼",
    mainStore: "Gupta Mini Mart - MG Road",
  }
];

// Helper formula to compute dynamic store inventory health score (0-100)
export function calculateHealthScore(storeId, products = [], redistributions = []) {
  const storeProducts = storeId === 'ALL' 
    ? products 
    : products.filter(p => p.storeId === storeId);

  if (storeProducts.length === 0) return 100;

  let totalDeductions = 0;

  storeProducts.forEach(p => {
    // Days remaining relative to current date (2026-10-07)
    const today = new Date(2026, 9, 7);
    const exp = new Date(p.expiryDate);
    const daysLeft = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));

    // Expiry penalties
    if (daysLeft <= 0) {
      totalDeductions += 15; // Expired
    } else if (daysLeft <= 2) {
      totalDeductions += 8;  // Critical 1-2d
    } else if (daysLeft <= 5) {
      totalDeductions += 4;  // High 3-5d
    }

    // Low stock penalty
    if (p.quantity <= p.minStock) {
      totalDeductions += 5;
    }

    // Excess stock penalty
    if (p.quantity >= p.maxStock * 1.5) {
      totalDeductions += 4;
    }
  });

  const baseScore = Math.max(25, 100 - Math.round(totalDeductions));
  return Math.min(100, baseScore);
}

// AI Smart Recommendation Calculator
export function computeRedistributionRecommendation(product, sourceStore, destStore) {
  const today = new Date(2026, 9, 7);
  const exp = new Date(product.expiryDate);
  const daysLeft = Math.max(0, Math.ceil((exp - today) / (1000 * 60 * 60 * 24)));

  const expectedSalesBeforeExpiry = daysLeft * product.dailySales;
  const potentialExcess = Math.max(0, product.quantity - expectedSalesBeforeExpiry);

  const urgencyScore = daysLeft <= 2 ? 40 : daysLeft <= 5 ? 30 : daysLeft <= 7 ? 20 : 10;
  const excessScore = potentialExcess > 0 ? 30 : 10;
  const distanceScore = destStore ? Math.max(5, 30 - Math.round(destStore.distanceKm * 2)) : 20;

  const totalPriority = Math.min(99, urgencyScore + excessScore + distanceScore);

  const recommendedTransferQty = Math.max(10, Math.round(potentialExcess * 0.8) || Math.round(product.quantity * 0.3));

  return {
    priorityScore: totalPriority,
    potentialExcess,
    recommendedTransferQty,
    daysLeft,
    expectedSalesBeforeExpiry,
    explanation: `${sourceStore.shortName} has ${product.quantity} units of ${product.name} with expected sales of only ${expectedSalesBeforeExpiry} units before expiry in ${daysLeft} days. ${destStore ? destStore.shortName : 'Destination store'} has strong sales velocity. Transferring ${recommendedTransferQty} units prevents waste while satisfying demand.`
  };
}
