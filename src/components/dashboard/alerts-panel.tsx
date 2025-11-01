'use client';

import { AlertTriangle, Info } from "lucide-react";
import type { AlertItem } from "@/lib/data";

const severityTone: Record<AlertItem["severity"], string> = {
  High: "border-rose-200 bg-rose-50 text-rose-700",
  Medium: "border-amber-200 bg-amber-50 text-amber-700",
  Low: "border-sky-200 bg-sky-50 text-sky-700",
};

const severityIcon: Record<AlertItem["severity"], typeof AlertTriangle> = {
  High: AlertTriangle,
  Medium: Info,
  Low: Info,
};

type Props = {
  items: AlertItem[];
};

export function AlertsPanel({ items }: Props) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Risk Radar
          </p>
          <h2 className="text-lg font-semibold text-slate-900">
            Operational Alerts
          </h2>
        </div>
        <div className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
          {items.length} open
        </div>
      </header>
      <div className="mt-6 space-y-4">
        {items.map((alert) => {
          const Icon = severityIcon[alert.severity];
          return (
            <article
              key={alert.id}
              className={`flex flex-col gap-2 rounded-2xl border p-4 ${severityTone[alert.severity]}`}
            >
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Icon size={16} />
                {alert.severity} Priority
              </div>
              <p className="text-sm font-medium">{alert.message}</p>
              <div className="flex items-center justify-between text-xs uppercase tracking-wide">
                <span>Owner · {alert.owner}</span>
                <span>{alert.timestamp}</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
