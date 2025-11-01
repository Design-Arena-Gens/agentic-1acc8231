'use client';

import { useState } from "react";
import { clsx } from "clsx";
import { FileDown, Loader2, Sparkles } from "lucide-react";
import { saveAs } from "file-saver";
import {
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import type {
  InventoryItem,
  Metric,
  PurchaseOrder,
  VendorPerformance,
} from "@/lib/data";
import { reportingPeriods } from "@/lib/data";

type Props = {
  metrics: Metric[];
  inventory: InventoryItem[];
  purchaseOrders: PurchaseOrder[];
  vendors: VendorPerformance[];
};

const toggleSections = [
  { key: "inventory", label: "Inventory Health" },
  { key: "orders", label: "Purchase Orders" },
  { key: "vendors", label: "Vendor Performance" },
  { key: "kpis", label: "Executive KPIs" },
] as const;

type ToggleKey = (typeof toggleSections)[number]["key"];

export function ReportGenerator({
  metrics,
  inventory,
  purchaseOrders,
  vendors,
}: Props) {
  const [period, setPeriod] = useState(reportingPeriods[1].value);
  const [isExporting, setIsExporting] = useState(false);
  const [activeSections, setActiveSections] = useState<Record<ToggleKey, boolean>>({
    inventory: true,
    orders: true,
    vendors: true,
    kpis: true,
  });

  const handleToggle = (key: ToggleKey) => {
    setActiveSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const createTable = (headers: string[], rows: (string | number)[][]) => {
    const headerRow = new TableRow({
      tableHeader: true,
      children: headers.map(
        (header) =>
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: header,
                    bold: true,
                    color: "1e293b",
                    size: 20,
                  }),
                ],
              }),
            ],
          }),
      ),
    });

    const dataRows = rows.map(
      (row) =>
        new TableRow({
          children: row.map(
            (cell) =>
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: String(cell),
                        size: 20,
                        color: "334155",
                      }),
                    ],
                  }),
                ],
              }),
          ),
        }),
    );

    return new Table({
      rows: [headerRow, ...dataRows],
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
    });
  };

  const handleGenerate = async () => {
    try {
      setIsExporting(true);
      const docSections = [];

      docSections.push(
        new Paragraph({
          text: "VelocityMart Convenience ERP · Operational Report",
          heading: HeadingLevel.TITLE,
          spacing: { after: 200 },
        }),
        new Paragraph({
          text: `Reporting Period: ${
            reportingPeriods.find((item) => item.value === period)?.label
          }`,
          spacing: { after: 200 },
        }),
        new Paragraph({
          text: `Generated: ${new Date().toLocaleString()}`,
          spacing: { after: 400 },
        }),
      );

      if (activeSections.kpis) {
        docSections.push(
          new Paragraph({
            text: "Executive KPI Summary",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 },
          }),
          createTable(
            ["Metric", "Value", "Delta", "Description"],
            metrics.map((metric) => [
              metric.label,
              metric.value,
              metric.delta,
              metric.description,
            ]),
          ),
        );
      }

      if (activeSections.inventory) {
        docSections.push(
          new Paragraph({
            text: "Inventory Health Snapshot",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 },
          }),
          createTable(
            [
              "SKU",
              "Product",
              "Category",
              "On Hand",
              "Reorder Point",
              "Supplier",
              "Expiry",
              "Status",
            ],
            inventory.map((item) => [
              item.sku,
              item.product,
              item.category,
              item.stock,
              item.reorderPoint,
              item.supplier,
              item.expiry,
              item.status,
            ]),
          ),
        );
      }

      if (activeSections.orders) {
        docSections.push(
          new Paragraph({
            text: "Purchase Order Pipeline",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 },
          }),
          createTable(
            ["ID", "Vendor", "Category", "ETA", "Value", "Status"],
            purchaseOrders.map((order) => [
              order.id,
              order.vendor,
              order.category,
              order.eta,
              `$${order.value.toLocaleString()}`,
              order.status,
            ]),
          ),
        );
      }

      if (activeSections.vendors) {
        docSections.push(
          new Paragraph({
            text: "Vendor Performance",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 },
          }),
          createTable(
            [
              "Vendor",
              "On-time %",
              "Defect %",
              "Lead Time (days)",
              "Last Delivery",
              "Preferred",
            ],
            vendors.map((vendor) => [
              vendor.name,
              `${vendor.onTimeRate}%`,
              `${vendor.defectRate}%`,
              vendor.leadTime,
              vendor.lastDelivery,
              vendor.preferred ? "Yes" : "Review",
            ]),
          ),
        );
      }

      const doc = new Document({
        sections: [
          {
            properties: {},
            children: docSections,
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `velocitymart-operational-report-${period}.docx`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-slate-100 shadow-lg">
      <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Automated Reporting
          </p>
          <h2 className="text-lg font-semibold text-white">
            Generate Operational Document
          </h2>
          <p className="text-sm text-slate-300">
            Export curated metrics, vendor performance, and inventory insights
            into a Word-compatible file for executives.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/70 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-300">
          <Sparkles size={16} />
          AI-assisted summary enabled
        </div>
      </header>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Reporting Period
          </p>
          <div className="grid grid-cols-2 gap-3">
            {reportingPeriods.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setPeriod(option.value)}
                className={clsx(
                  "rounded-2xl border px-3 py-3 text-left text-sm font-semibold transition",
                  period === option.value
                    ? "border-slate-200 bg-white text-slate-900"
                    : "border-slate-700 bg-slate-900/40 text-slate-200 hover:border-slate-600",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Sections
          </p>
          <div className="grid grid-cols-2 gap-3">
            {toggleSections.map((section) => (
              <button
                key={section.key}
                type="button"
                onClick={() => handleToggle(section.key)}
                className={clsx(
                  "rounded-2xl border px-3 py-3 text-left text-sm font-semibold transition",
                  activeSections[section.key]
                    ? "border-emerald-300 bg-emerald-400/90 text-emerald-950"
                    : "border-slate-700 bg-slate-900/40 text-slate-300 hover:border-slate-600",
                )}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-900/40 px-4 py-4">
        <div>
          <p className="text-sm font-semibold text-white">
            Output Format: Microsoft Word (.docx)
          </p>
          <p className="text-xs text-slate-400">
            Includes inventory, purchase orders, vendor analytics, and KPI roll-up.
          </p>
        </div>
        <button
          type="button"
          onClick={handleGenerate}
          disabled={isExporting}
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-80"
        >
          {isExporting ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Preparing...
            </>
          ) : (
            <>
              <FileDown size={18} />
              Download Report
            </>
          )}
        </button>
      </div>
    </section>
  );
}
