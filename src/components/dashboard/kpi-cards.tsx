'use client';

import { ArrowDownRight, ArrowRight, ArrowUpRight, Loader } from "lucide-react";
import type { Metric } from "@/lib/data";
import { clsx } from "clsx";

type Props = {
  items: Metric[];
};

const trendIcon = {
  up: ArrowUpRight,
  down: ArrowDownRight,
  steady: Loader,
};

const trendColor = {
  up: "text-emerald-600 bg-emerald-50",
  down: "text-rose-600 bg-rose-50",
  steady: "text-slate-600 bg-slate-100",
};

export function KpiCards({ items }: Props) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((metric) => {
        const Icon = trendIcon[metric.trend];
        return (
          <article
            key={metric.label}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {metric.label}
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {metric.value}
                </p>
              </div>
              <span
                className={clsx(
                  "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold",
                  trendColor[metric.trend],
                )}
              >
                <Icon size={14} />
                {metric.delta}
              </span>
            </div>
            <p className="mt-4 text-sm text-slate-500">{metric.description}</p>
            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-slate-700">
              View drill-down
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </div>
          </article>
        );
      })}
    </section>
  );
}
