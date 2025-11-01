'use client';

import { useState } from "react";
import { clsx } from "clsx";
import {
  Boxes,
  ClipboardList,
  Factory,
  FileChartLine,
  Layers,
  LucideIcon,
  Package,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";

type NavItem = {
  icon: LucideIcon;
  label: string;
  badge?: string;
};

const navItems: NavItem[] = [
  { icon: TrendingUp, label: "Command Center" },
  { icon: Boxes, label: "Inventory" },
  { icon: Package, label: "Replenishment", badge: "4" },
  { icon: Users, label: "Vendors" },
  { icon: Factory, label: "Supply Chain" },
  { icon: ClipboardList, label: "Tasks", badge: "8" },
  { icon: FileChartLine, label: "Reports" },
  { icon: Layers, label: "Planograms" },
  { icon: Settings, label: "Settings" },
];

export function Sidebar() {
  const [activeLabel, setActiveLabel] = useState("Command Center");

  return (
    <aside className="hidden w-[260px] shrink-0 border-r border-slate-200 bg-white/80 backdrop-blur md:flex md:flex-col">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-slate-900">
            VelocityMart
          </span>
          <span className="text-xs font-medium tracking-wide text-slate-500">
            ERP Control Tower
          </span>
        </div>
        <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
          v2.3
        </span>
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-3 pb-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeLabel === item.label;
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => setActiveLabel(item.label)}
              className={clsx(
                "group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
              )}
            >
              <Icon
                size={18}
                className={clsx(
                  "transition-transform",
                  isActive ? "scale-110" : "group-hover:scale-105",
                )}
              />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge ? (
                <span
                  className={clsx(
                    "rounded-full px-2 py-0.5 text-xs font-semibold",
                    isActive
                      ? "bg-white/10 text-white"
                      : "bg-slate-200 text-slate-700",
                  )}
                >
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
        <div className="mt-auto rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-4 text-slate-600">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Snapshot
          </p>
          <p className="mt-2 text-sm font-medium text-slate-900">
            Last synced with vendor network
          </p>
          <p className="text-xs text-slate-500">Apr 15, 2024 · 08:45</p>
        </div>
      </nav>
    </aside>
  );
}
