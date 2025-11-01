export type Metric = {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down" | "steady";
  description: string;
};

export type InventoryItem = {
  sku: string;
  product: string;
  category: string;
  stock: number;
  unit: string;
  reorderPoint: number;
  supplier: string;
  expiry: string;
  status: "Optimal" | "Critical" | "Overstock";
};

export type PurchaseOrder = {
  id: string;
  vendor: string;
  category: string;
  eta: string;
  value: number;
  status: "In Transit" | "Pending Approval" | "Delivered";
};

export type VendorPerformance = {
  name: string;
  onTimeRate: number;
  defectRate: number;
  leadTime: number;
  lastDelivery: string;
  preferred: boolean;
};

export type SupplyMilestone = {
  title: string;
  status: "Completed" | "In Progress" | "At Risk";
  timestamp: string;
  owner: string;
  notes: string;
};

export type AlertItem = {
  id: string;
  severity: "High" | "Medium" | "Low";
  message: string;
  owner: string;
  timestamp: string;
};

export const metrics: Metric[] = [
  {
    label: "Gross Merchandise Value",
    value: "$182K",
    delta: "+8.2%",
    trend: "up",
    description: "vs. last 30 days",
  },
  {
    label: "Inventory Turnover",
    value: "18.4x",
    delta: "+1.4",
    trend: "up",
    description: "higher than industry avg.",
  },
  {
    label: "Stockout Risk",
    value: "6 SKUs",
    delta: "-3",
    trend: "down",
    description: "critical items flagged",
  },
  {
    label: "Vendor On-Time Rate",
    value: "94.2%",
    delta: "+2.6%",
    trend: "up",
    description: "across all suppliers",
  },
];

export const inventory: InventoryItem[] = [
  {
    sku: "FMCG-001",
    product: "Sparkle Soda 500ml",
    category: "Beverages",
    stock: 148,
    unit: "bottles",
    reorderPoint: 120,
    supplier: "AquaSpark Beverages",
    expiry: "2024-09-15",
    status: "Optimal",
  },
  {
    sku: "FMCG-002",
    product: "FreshBite Sandwich",
    category: "Grab & Go",
    stock: 42,
    unit: "packs",
    reorderPoint: 60,
    supplier: "Urban Fresh Foods",
    expiry: "2024-05-02",
    status: "Critical",
  },
  {
    sku: "FMCG-003",
    product: "DailyDairy Yogurt",
    category: "Dairy",
    stock: 210,
    unit: "cups",
    reorderPoint: 150,
    supplier: "DailyDairy Co.",
    expiry: "2024-06-12",
    status: "Optimal",
  },
  {
    sku: "FMCG-004",
    product: "CrunchMix Chips",
    category: "Snacks",
    stock: 388,
    unit: "bags",
    reorderPoint: 240,
    supplier: "CrunchMix Foods",
    expiry: "2025-01-30",
    status: "Overstock",
  },
  {
    sku: "FMCG-005",
    product: "VitalPlus Energy Bar",
    category: "Health",
    stock: 96,
    unit: "bars",
    reorderPoint: 90,
    supplier: "VitalPlus Labs",
    expiry: "2024-11-21",
    status: "Optimal",
  },
  {
    sku: "FMCG-006",
    product: "EcoClean Detergent",
    category: "Household",
    stock: 64,
    unit: "bottles",
    reorderPoint: 80,
    supplier: "EcoClean Supplies",
    expiry: "2025-03-03",
    status: "Critical",
  },
];

export const purchaseOrders: PurchaseOrder[] = [
  {
    id: "PO-7845",
    vendor: "AquaSpark Beverages",
    category: "Beverages",
    eta: "Apr 22",
    value: 4800,
    status: "In Transit",
  },
  {
    id: "PO-7848",
    vendor: "Urban Fresh Foods",
    category: "Grab & Go",
    eta: "Apr 18",
    value: 3100,
    status: "Pending Approval",
  },
  {
    id: "PO-7850",
    vendor: "EcoClean Supplies",
    category: "Household",
    eta: "Apr 28",
    value: 2650,
    status: "In Transit",
  },
  {
    id: "PO-7852",
    vendor: "DailyDairy Co.",
    category: "Dairy",
    eta: "Apr 16",
    value: 5400,
    status: "Delivered",
  },
];

export const vendorPerformance: VendorPerformance[] = [
  {
    name: "AquaSpark Beverages",
    onTimeRate: 97,
    defectRate: 0.4,
    leadTime: 4,
    lastDelivery: "Apr 10",
    preferred: true,
  },
  {
    name: "Urban Fresh Foods",
    onTimeRate: 88,
    defectRate: 1.1,
    leadTime: 2,
    lastDelivery: "Apr 12",
    preferred: false,
  },
  {
    name: "DailyDairy Co.",
    onTimeRate: 92,
    defectRate: 0.6,
    leadTime: 3,
    lastDelivery: "Apr 8",
    preferred: true,
  },
  {
    name: "EcoClean Supplies",
    onTimeRate: 86,
    defectRate: 1.8,
    leadTime: 6,
    lastDelivery: "Mar 30",
    preferred: false,
  },
];

export const supplyTimeline: SupplyMilestone[] = [
  {
    title: "Purchase Order Approved",
    status: "Completed",
    timestamp: "Apr 12, 09:20",
    owner: "Procurement",
    notes: "Auto-approved under strategic vendor policy.",
  },
  {
    title: "Vendor Dispatch",
    status: "Completed",
    timestamp: "Apr 13, 14:10",
    owner: "Vendor Portal",
    notes: "Mixed pallet with beverages and household items.",
  },
  {
    title: "In-Transit Monitoring",
    status: "In Progress",
    timestamp: "Apr 15, 08:30",
    owner: "Logistics",
    notes: "GPS checkpoint reached at central hub.",
  },
  {
    title: "Customs Clearance",
    status: "At Risk",
    timestamp: "Apr 15, 16:45",
    owner: "Logistics",
    notes: "Awaiting updated MSDS documentation from vendor.",
  },
  {
    title: "Store Receiving",
    status: "In Progress",
    timestamp: "Apr 17, 11:00",
    owner: "Store Ops",
    notes: "Shelf allocation prepared for fast movers.",
  },
];

export const alerts: AlertItem[] = [
  {
    id: "alert-1",
    severity: "High",
    message: "Critical reorder: FreshBite Sandwich will stock out in 1.5 days.",
    owner: "Store Manager",
    timestamp: "Apr 15, 08:05",
  },
  {
    id: "alert-2",
    severity: "Medium",
    message:
      "EcoClean Detergent shipment delayed at customs. Expedite paperwork.",
    owner: "Logistics",
    timestamp: "Apr 14, 17:22",
  },
  {
    id: "alert-3",
    severity: "Low",
    message:
      "Planogram update needed for CrunchMix Chips to reduce overstock backlog.",
    owner: "Merchandising",
    timestamp: "Apr 13, 12:10",
  },
];

export const reportingPeriods = [
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
  { label: "Quarter to Date", value: "qtd" },
  { label: "Year to Date", value: "ytd" },
];
