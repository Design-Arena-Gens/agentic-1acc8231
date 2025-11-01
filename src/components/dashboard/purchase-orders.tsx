'use client';

import { clsx } from "clsx";
import { ArrowRight, Truck } from "lucide-react";
import type { PurchaseOrder } from "@/lib/data";

type Props = {
  orders: PurchaseOrder[];
};

const statusColor: Record<PurchaseOrder["status"], string> = {
  "In Transit": "bg-sky-50 text-sky-600 border border-sky-100",
  "Pending Approval": "bg-amber-50 text-amber-600 border border-amber-100",
  Delivered: "bg-emerald-50 text-emerald-600 border border-emerald-100",
};

export function PurchaseOrders({ orders }: Props) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <header className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Vendor Pipeline
          </p>
          <h2 className="text-lg font-semibold text-slate-900">
            Active Purchase Orders
          </h2>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 hover:border-slate-300"
        >
          View Procurement Hub
          <ArrowRight size={16} />
        </button>
      </header>
      <div className="flex flex-col gap-4 px-6 py-5">
        {orders.map((order) => (
          <article
            key={order.id}
            className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/60 p-4 transition hover:border-slate-200 hover:bg-white hover:shadow"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white">
                <Truck size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {order.id}
                </p>
                <p className="text-base font-semibold text-slate-900">
                  {order.vendor}
                </p>
                <p className="text-xs text-slate-500">
                  {order.category} · ETA {order.eta}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900">
                ${order.value.toLocaleString()}
              </p>
              <span
                className={clsx(
                  "mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
                  statusColor[order.status],
                )}
              >
                {order.status}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
