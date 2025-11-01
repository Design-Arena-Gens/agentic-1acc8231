'use client';

import { clsx } from "clsx";
import { ActivitySquare, AlertCircle, CheckCircle2 } from "lucide-react";
import type { SupplyMilestone } from "@/lib/data";

type Props = {
  milestones: SupplyMilestone[];
};

const iconMap = {
  Completed: CheckCircle2,
  "In Progress": ActivitySquare,
  "At Risk": AlertCircle,
};

const toneMap = {
  Completed: "bg-emerald-50 text-emerald-600 border border-emerald-100",
  "In Progress": "bg-sky-50 text-sky-600 border border-sky-100",
  "At Risk": "bg-rose-50 text-rose-600 border border-rose-100",
};

export function SupplyTimeline({ milestones }: Props) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Flow Tracking
          </p>
          <h2 className="text-lg font-semibold text-slate-900">
            Supply Chain Timeline
          </h2>
        </div>
        <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
          Live
        </span>
      </header>
      <div className="mt-6 space-y-6">
        {milestones.map((item, index) => {
          const Icon = iconMap[item.status];
          return (
            <div key={item.title} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span
                  className={clsx(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 border-white shadow-md",
                    toneMap[item.status],
                  )}
                >
                  <Icon size={18} />
                </span>
                {index < milestones.length - 1 ? (
                  <span className="mt-1 h-full w-px flex-1 bg-gradient-to-b from-slate-200 via-slate-200 to-transparent" />
                ) : null}
              </div>
              <div className="flex-1 rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {item.timestamp}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{item.notes}</p>
                <p className="mt-3 text-xs uppercase tracking-wide text-slate-500">
                  Owner · {item.owner}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
