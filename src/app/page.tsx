'use client';

import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/top-bar";
import { KpiCards } from "@/components/dashboard/kpi-cards";
import { InventoryTable } from "@/components/dashboard/inventory-table";
import { PurchaseOrders } from "@/components/dashboard/purchase-orders";
import { VendorPerformanceTable } from "@/components/dashboard/vendor-performance";
import { SupplyTimeline } from "@/components/dashboard/supply-timeline";
import { AlertsPanel } from "@/components/dashboard/alerts-panel";
import { ReportGenerator } from "@/components/dashboard/report-generator";
import {
  alerts,
  inventory,
  metrics,
  purchaseOrders,
  supplyTimeline,
  vendorPerformance,
} from "@/lib/data";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col bg-slate-50">
        <TopBar />
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8">
          <div className="flex flex-col gap-6">
            <KpiCards items={metrics} />
            <div className="grid gap-6 xl:grid-cols-[1.8fr_1fr]">
              <InventoryTable rows={inventory} />
              <div className="flex flex-col gap-6">
                <PurchaseOrders orders={purchaseOrders} />
                <AlertsPanel items={alerts} />
              </div>
            </div>
            <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
              <SupplyTimeline milestones={supplyTimeline} />
              <VendorPerformanceTable vendors={vendorPerformance} />
            </div>
            <ReportGenerator
              metrics={metrics}
              inventory={inventory}
              purchaseOrders={purchaseOrders}
              vendors={vendorPerformance}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
