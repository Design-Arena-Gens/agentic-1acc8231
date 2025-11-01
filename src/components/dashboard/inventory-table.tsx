'use client';

import { clsx } from "clsx";
import { AlertTriangle, ArrowDownToLine, ArrowUpToLine } from "lucide-react";
import type { InventoryItem } from "@/lib/data";

type Props = {
  rows: InventoryItem[];
};

const statusStyles: Record<InventoryItem["status"], string> = {
  Optimal: "bg-emerald-50 text-emerald-700 border border-emerald-100",
  Critical: "bg-rose-50 text-rose-600 border border-rose-100",
  Overstock: "bg-amber-50 text-amber-700 border border-amber-100",
};

export function InventoryTable({ rows }: Props) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <header className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            In-Store Inventory Health
          </p>
          <h2 className="text-lg font-semibold text-slate-900">
            Critical SKU Overview
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 hover:border-slate-300"
          >
            <ArrowUpToLine size={16} />
            Import CSV
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-slate-700"
          >
            <ArrowDownToLine size={16} />
            Export Snapshot
          </button>
        </div>
      </header>
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2 px-4 py-4 text-left">
          <thead className="text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-2">SKU</th>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2 text-right">On Hand</th>
              <th className="px-4 py-2 text-right">Reorder Point</th>
              <th className="px-4 py-2">Supplier</th>
              <th className="px-4 py-2">Expiry</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm text-slate-700">
            {rows.map((item) => (
              <tr
                key={item.sku}
                className="rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-[1px] hover:border-slate-200 hover:shadow-md"
              >
                <td className="rounded-l-2xl px-4 py-3 font-semibold text-slate-900">
                  {item.sku}
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-900">{item.product}</p>
                  <p className="text-xs text-slate-500">
                    {item.unit} · {item.category}
                  </p>
                </td>
                <td className="px-4 py-3">{item.category}</td>
                <td className="px-4 py-3 text-right font-semibold">
                  {item.stock.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right">{item.reorderPoint}</td>
                <td className="px-4 py-3">{item.supplier}</td>
                <td className="px-4 py-3">{item.expiry}</td>
                <td className="rounded-r-2xl px-4 py-3">
                  <span
                    className={clsx(
                      "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
                      statusStyles[item.status],
                    )}
                  >
                    {item.status === "Critical" ? (
                      <AlertTriangle size={14} />
                    ) : null}
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
