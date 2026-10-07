import {
  LayoutDashboard, Globe, Monitor, Headset, UtensilsCrossed, Package, Wallet, Settings,
  ChevronRight, Calendar, Filter, RefreshCw, Download, ShoppingCart, DollarSign, Receipt,
  Tag, Gift, Undo2, Truck, TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { InviteBadge, TaxFormsBadge } from "@/components/ui/FloatingBadges";

const MENU = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Globe, label: "Web Orders" },
  { icon: Monitor, label: "Point Of Sale" },
  { icon: Headset, label: "Call Center" },
  { icon: UtensilsCrossed, label: "Menu Setup" },
  { icon: Package, label: "Inventory Setup" },
  { icon: Wallet, label: "Accounts" },
  { icon: Settings, label: "Branch Settings" },
];

const STATS: { label: string; value: string; icon: LucideIcon; tint: string }[] = [
  { label: "Total Orders", value: "347", icon: ShoppingCart, tint: "bg-purple-500" },
  { label: "Gross Sales", value: "Rs 254,198.50", icon: DollarSign, tint: "bg-blue-600" },
  { label: "Total Tax", value: "Rs 30,503.82", icon: Receipt, tint: "bg-orange-500" },
  { label: "Discounts", value: "Rs 12,709.92", icon: Tag, tint: "bg-pink-500" },
  { label: "FOC Amount", value: "Rs 2,541.98", icon: Gift, tint: "bg-indigo-500" },
  { label: "Returns", value: "Rs 762.59", icon: Undo2, tint: "bg-red-500" },
  { label: "Delivery Charges", value: "Rs 8,896.95", icon: Truck, tint: "bg-cyan-500" },
  { label: "Net Sales", value: "Rs 207,680.20", icon: TrendingUp, tint: "bg-teal-600" },
];

/* ---------------- Stat card ---------------- */
function StatCard({
  label,
  value,
  icon: Icon,
  tint,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  tint: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white ${tint}`}>
          <Icon size={16} />
        </span>
        <p className="flex-1 truncate text-sm font-medium text-gray-700">{label}</p>
        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          N/A
        </span>
      </div>
      <p className="mt-3 text-base font-bold tracking-tight text-gray-900 lg:text-lg">{value}</p>
    </div>
  );
}

/* ---------------- Donut chart ---------------- */
const SEGMENTS = [
  { label: "Delivered", pct: 65, color: "#0f6b57" },
  { label: "In Progress", pct: 20, color: "#b8860b" },
  { label: "Cancelled", pct: 10, color: "#7f1d2d" },
  { label: "Returned", pct: 5, color: "#c4c4c4" },
];

function DonutChart() {
  let start = 0;
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <svg viewBox="0 0 120 120" className="h-40 w-40 -rotate-90">
        {SEGMENTS.map((s) => {
          const circle = (
            <circle
              key={s.label}
              cx="60"
              cy="60"
              r="44"
              fill="none"
              stroke={s.color}
              strokeWidth="20"
              pathLength={100}
              strokeDasharray={`${s.pct} ${100 - s.pct}`}
              strokeDashoffset={-start}
            />
          );
          start += s.pct;
          return circle;
        })}
      </svg>
      <ul className="space-y-2 text-xs">
        {SEGMENTS.map((s) => (
          <li key={s.label} className="flex items-center gap-2 text-gray-700">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
            {s.label}
            <span className="font-semibold">{s.pct}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- Customers chart ---------------- */
const NEW = [6.7, 12, 31.1, 21.3, 30.9, 18.5, 8.3, 33.3, 8.8, 26.3, 33.9, 11.8, 1.3];
const RETURNING = [4, 16.6, 7.9, 12, 17, 30.3, 10, 12.6, 11, 14, 30, 13, 4];
const X_LABELS = ["12 AM", "", "4 AM", "", "8 AM", "", "12 PM", "", "4 PM", "", "8 PM", "", "12 AM"];

const W = 520;
const H = 240;
const PAD = { l: 34, r: 12, t: 12, b: 30 };
const PLOT_W = W - PAD.l - PAD.r;
const PLOT_H = H - PAD.t - PAD.b;
const MAX = 40;

const xAt = (i: number) => PAD.l + (i * PLOT_W) / (NEW.length - 1);
const yAt = (v: number) => PAD.t + PLOT_H - (v / MAX) * PLOT_H;

function smooth(values: number[]) {
  return values
    .map((v, i) => [xAt(i), yAt(v)] as const)
    .reduce((d, [x, y], i, arr) => {
      if (i === 0) return `M${x},${y}`;
      const [px, py] = arr[i - 1];
      const cx = (px + x) / 2;
      return `${d} C${cx},${py} ${cx},${y} ${x},${y}`;
    }, "");
}

function CustomersChart() {
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        {[0, 10, 20, 30, 40].map((t) => (
          <g key={t}>
            <line x1={PAD.l} x2={W - PAD.r} y1={yAt(t)} y2={yAt(t)} stroke="#e5e7eb" />
            <text x={PAD.l - 8} y={yAt(t) + 4} textAnchor="end" fontSize="10" fill="#6b7280">
              {t}
            </text>
          </g>
        ))}
        {RETURNING.map((v, i) => (
          <rect
            key={i}
            x={xAt(i) - 9}
            y={yAt(v)}
            width="18"
            height={PAD.t + PLOT_H - yAt(v)}
            rx="2"
            fill="#0d9488"
            opacity="0.85"
          />
        ))}
        <path d={smooth(NEW)} fill="none" stroke="#7f1d2d" strokeWidth="2" />
        <path d={smooth(RETURNING)} fill="none" stroke="#0d9488" strokeWidth="2" />
        {NEW.map((v, i) => (
          <circle key={i} cx={xAt(i)} cy={yAt(v)} r="3" fill="#fff" stroke="#7f1d2d" strokeWidth="1.5" />
        ))}
        {X_LABELS.map((l, i) =>
          l ? (
            <text key={i} x={xAt(i)} y={H - 10} textAnchor="middle" fontSize="10" fill="#6b7280">
              {l}
            </text>
          ) : null
        )}
      </svg>
      <div className="mt-2 flex justify-center gap-5 text-xs text-gray-600">
        <span className="flex items-center gap-1.5">
          <span className="h-0.5 w-4 bg-[#7f1d2d]" /> New Customers
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-0.5 w-4 bg-teal-600" /> Returning Customers
        </span>
      </div>
    </div>
  );
}

/* ---------------- Chart card wrapper ---------------- */
function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h4 className="font-semibold text-gray-900">{title}</h4>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-white">
          <TrendingUp size={16} />
        </span>
      </div>
      {children}
    </div>
  );
}

/* ---------------- Main component ---------------- */
export default function DashboardPreview() {
  return (
    <div className="relative mx-auto mt-20 max-w-6xl px-4">
      <TaxFormsBadge className="absolute -left-2 bottom-32 hidden md:flex" />
      <InviteBadge className="absolute -right-2 top-28 hidden md:flex" />

      <div className="rounded-t-3xl border border-white/10 bg-white/10 p-3 backdrop-blur-md">
        <div className="grid overflow-hidden rounded-2xl bg-slate-100 text-gray-900 md:grid-cols-[210px_1fr]">
          {/* Sidebar */}
          <aside className="hidden bg-sidebar-primary p-4 text-white md:block">
            <div className="mb-6 flex flex-col items-center gap-1">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg font-bold text-primary">
                X
              </span>
              <p className="text-xs">
                eat<span className="text-primary">X</span> by Ygen
              </p>
            </div>
            <nav className="space-y-1">
              {MENU.map(({ icon: Icon, label, active }) => (
                <div
                  key={label}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                    active ? "bg-primary text-white" : "text-white/80"
                  }`}
                >
                  <Icon size={15} />
                  <span className="flex-1">{label}</span>
                  <ChevronRight size={14} className="opacity-60" />
                </div>
              ))}
            </nav>
          </aside>

          {/* Main */}
          <div className="space-y-4 p-4 text-left">
            <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-white p-3 shadow-sm">
              {[
                { icon: Calendar, text: "Today" },
                { icon: Filter, text: "All Orders" },
                { icon: Filter, text: "All Branches" },
              ].map(({ icon: Icon, text }, i) => (
                <div
                  key={`${text}-${i}`}
                  className="flex items-center gap-2 rounded-lg border bg-white px-3 py-1.5 text-xs"
                >
                  <Icon size={14} className="text-secondary" />
                  {text}
                </div>
              ))}
              <div className="ml-auto flex gap-2">
                <button className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs">
                  <RefreshCw size={13} /> Refresh
                </button>
                <button className="flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-white">
                  <Download size={13} /> Export
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {STATS.map((s) => (
                <StatCard key={s.label} {...s} />
              ))}
            </div>

            <div className="grid gap-3 lg:grid-cols-2">
              <ChartCard title="Order By Status" subtitle="Order count by status">
                <DonutChart />
              </ChartCard>
              <ChartCard title="New vs Returning Customers" subtitle="Customer type distribution">
                <CustomersChart />
              </ChartCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}