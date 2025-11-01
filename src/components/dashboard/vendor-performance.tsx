'use client';

import { BadgeCheck, Clock, Star } from "lucide-react";
import type { VendorPerformance } from "@/lib/data";

type Props = {
  vendors: VendorPerformance[];
};

export function VendorPerformanceTable({ vendors }: Props) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <header className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Supplier Scorecard
          </p>
          <h2 className="text-lg font-semibold text-slate-900">
            Vendor Performance Pulse
          </h2>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white">
          <BadgeCheck size={16} />
          SLA Monitor Active
        </span>
      </header>
      <div className="overflow-x-auto px-6 py-5">
        <table className="min-w-full text-left text-sm text-slate-700">
          <thead className="text-xs uppercase tracking-wide text-slate-500">
            <tr className="border-b border-slate-100">
              <th className="py-2">Vendor</th>
              <th className="py-2">On-time %</th>
              <th className="py-2">Defect %</th>
              <th className="py-2">Avg Lead Time (days)</th>
              <th className="py-2">Last Delivery</th>
              <th className="py-2 text-center">Preferred</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => (
              <tr
                key={vendor.name}
                className="border-b border-slate-100 last:border-0"
              >
                <td className="py-3">
                  <p className="font-semibold text-slate-900">{vendor.name}</p>
                  <p className="text-xs text-slate-500">
                    {vendor.onTimeRate > 95 ? "Tier 1" : "Tier 2"} ·{" "}
                    {vendor.defectRate <= 1 ? "Quality Assured" : "Monitor"}
                  </p>
                </td>
                <td className="py-3 font-semibold text-slate-900">
                  {vendor.onTimeRate}%
                </td>
                <td className="py-3">{vendor.defectRate}%</td>
                <td className="py-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                    <Clock size={14} />
                    {vendor.leadTime} days
                  </span>
                </td>
                <td className="py-3">{vendor.lastDelivery}</td>
                <td className="py-3 text-center">
                  {vendor.preferred ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      <Star size={14} /> Preferred
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                      Review
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
