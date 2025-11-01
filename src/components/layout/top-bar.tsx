'use client';

import {
  Bell,
  CalendarDays,
  ChevronDown,
  Search,
  ShieldCheck,
} from "lucide-react";

export function TopBar() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            className="h-10 w-80 rounded-full border border-slate-200 bg-white pl-10 pr-4 text-sm font-medium text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            placeholder="Search SKU, vendor, shipment or document..."
          />
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600"
        >
          <CalendarDays size={16} />
          Q2 Planning Cycle
          <ChevronDown size={14} />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 md:flex">
          <ShieldCheck size={16} />
          RLS Active
        </div>
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:text-slate-900"
        >
          <Bell size={18} />
          <span className="absolute right-2 top-1 h-2 w-2 rounded-full bg-amber-500" />
        </button>
        <button
          type="button"
          className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-left transition hover:border-slate-300"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
            JL
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-800">
              Jordan Lee
            </p>
            <p className="text-[11px] uppercase tracking-wide text-slate-500">
              Store Director
            </p>
          </div>
          <ChevronDown size={16} className="text-slate-400" />
        </button>
      </div>
    </header>
  );
}
