import { Store, ChefHat, ClipboardList, Briefcase, type LucideIcon } from "lucide-react";

export const ACTION_TABS = [
  {
    id: "pos",
    label: "POS",
    image: "/images/action-pos.svg",
    title: "A fast POS that never stops",
    text: "Take dine-in, takeaway and delivery orders in seconds. Works offline and syncs automatically when the internet returns.",
    points: ["Quick order entry", "Split bills & discounts", "Offline mode"],
  },
  {
    id: "inventory",
    label: "Inventory",
    image: "/images/action-inventory.svg",
    title: "Know your stock at all times",
    text: "Track every ingredient, get low-stock alerts and see exactly where waste comes from.",
    points: ["Live stock levels", "Low-stock alerts", "Recipe-based deduction"],
  },
  {
    id: "kitchen",
    label: "Kitchen",
    image: "/images/action-kitchen.svg",
    title: "Orders reach the kitchen instantly",
    text: "Orders appear on the kitchen display the moment they are placed. No paper slips, no shouting across the pass.",
    points: ["Kitchen display screen", "Order timers", "Ready notifications"],
  },
  {
    id: "analytics",
    label: "Analytics",
    image: "/images/action-analytics.svg",
    title: "Reports that explain your business",
    text: "Gross sales, tax, discounts and net sales by branch, hour and item, ready whenever you need them.",
    points: ["Branch-wise reports", "Best-selling items", "Export to Excel"],
  },
];

export const ROLE_CARDS: {
  icon: LucideIcon;
  title: string;
  image: string;
  points: string[];
}[] = [
  { icon: Store, title: "Front of House", image: "/images/role-front.svg", points: ["Orders & tables", "Payments", "Customer experience"] },
  { icon: ChefHat, title: "Back of House", image: "/images/role-back.svg", points: ["Kitchen display", "Inventory & stock", "Food preparation"] },
  { icon: ClipboardList, title: "Management", image: "/images/role-management.svg", points: ["Reports & analytics", "Staff management", "Operations control"] },
  { icon: Briefcase, title: "Business Owners", image: "/images/role-owners.svg", points: ["Revenue & growth", "Multi-location support", "Strategic insights"] },
];

export const SALES_POINTS = [30, 42, 38, 55, 48, 66, 58, 80, 72, 92, 85, 100];

export const CATEGORIES = [
  { label: "Food", pct: 67, color: "var(--primary)" },
  { label: "Drinks", pct: 18, color: "#f4a3ab" },
  { label: "Others", pct: 15, color: "#e5e7eb" },
];