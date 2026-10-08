import {
  Globe, MonitorSmartphone, CloudCog, Boxes, Users, BarChart3,
  CreditCard, Utensils,
  ShoppingBag, ChefHat, PackageCheck, LineChart,
  type LucideIcon,
} from "lucide-react";


export const PLACEHOLDER = "{EatX Demo Content Placeholder}";

export const STATS = [
  { value: "600+", label: "Restaurants onboarded" },
  { value: "10M+", label: "Orders processed" },
  { value: "99.9%", label: "Uptime, even offline" },
  { value: "4.9/5", label: "Average merchant rating" },
];

export type MockKind = "orders" | "menu" | "payroll" | "analytics";

export const DASHBOARD_CARDS: { kind: MockKind; title: string; text: string }[] = [
  { kind: "orders", title: "Order management", text: `${PLACEHOLDER} Accept and track web, kiosk and POS orders in one live queue.` },
  { kind: "menu", title: "Menu control", text: `${PLACEHOLDER} Update prices, modifiers and availability across every outlet instantly.` },
  { kind: "payroll", title: "Staff & payroll", text: `${PLACEHOLDER} Shifts, attendance and salary runs without spreadsheets.` },
  { kind: "analytics", title: "Sales analytics", text: `${PLACEHOLDER} See gross sales, tax, discounts and net sales by branch and hour.` },
];

export const SERVICES: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Globe, title: "Live Web Ordering", text: "Accept and manage online orders in real time from one dashboard." },
  { icon: MonitorSmartphone, title: "Self Kiosk", text: "Let customers place and customize their own orders quickly." },
  { icon: CloudCog, title: "Cloud & Offline POS", text: "Fast, reliable POS that keeps working even without internet." },
  { icon: Boxes, title: "Inventory Management", text: "Track stock, monitor usage, control costs and reduce waste." },
  { icon: Users, title: "Staff & Payroll", text: `${PLACEHOLDER} Short description of payroll features.` },
  { icon: BarChart3, title: "Reports & Analytics", text: `${PLACEHOLDER} Short description of reporting features.` },
];

export const TESTIMONIALS = [
  { quote: `${PLACEHOLDER} EatX cut our order errors in half and gave us one view of every branch.`, name: "Customer Name", role: "Owner, Restaurant Name" },
  { quote: `${PLACEHOLDER} The offline POS saved us during a full-day internet outage.`, name: "Customer Name", role: "Operations Manager, Cafe Name" },
  { quote: `${PLACEHOLDER} Inventory reports finally show us where waste comes from.`, name: "Customer Name", role: "Head Chef, Brand Name" },
];

export const FAQS = [
  { q: "What is EatX?", a: `${PLACEHOLDER} EatX is an all-in-one operating system for modern restaurants.` },
  { q: "Does the POS work without internet?", a: `${PLACEHOLDER} Yes. Orders sync automatically when the connection returns.` },
  { q: "Can I manage multiple branches?", a: `${PLACEHOLDER} Yes. Switch between outlets or view them combined.` },
  { q: "How does payroll work?", a: `${PLACEHOLDER} Describe your payroll flow here.` },
  { q: "How do I get started?", a: `${PLACEHOLDER} Describe onboarding and support here.` },
];

// Integration partner logos shown in the arc slider. Swap these paths for real
// payment/delivery/POS partner marks once they're available.
export const ARC_LOGOS: { src: string; label: string }[] = [
  { src: "/logos/client2.webp", label: "Integration partner" },
  { src: "/logos/client3.webp", label: "Integration partner" },
  { src: "/logos/client4.webp", label: "Integration partner" },
  { src: "/logos/client5.webp", label: "Integration partner" },
  { src: "/logos/client6.webp", label: "Integration partner" },
  { src: "/logos/client7.webp", label: "Integration partner" },
  { src: "/logos/client8.webp", label: "Integration partner" },
];
export const PLATFORM_NODES: {
  icon: LucideIcon;
  title: string;
  text: string;
  tone: string;
  pos: string;
}[] = [
  { icon: ShoppingBag, title: "Orders", text: "Take & manage orders in real-time", tone: "bg-primary", pos: "left-[14%] top-[0%]" },
  { icon: CreditCard, title: "Payments", text: "Multiple payment methods", tone: "bg-primary", pos: "right-[0%] top-[2%]" },
  { icon: Utensils, title: "Kitchen", text: "Keep your kitchen in sync", tone: "bg-primary", pos: "left-[-2%] top-[36%]" },
  { icon: Boxes, title: "Inventory", text: "Track stock & reduce waste", tone: "bg-primary", pos: "right-[-2%] top-[40%]" },
  { icon: Users, title: "Staff", text: "Manage your team & roles", tone: "bg-primary", pos: "left-[10%] bottom-[2%]" },
  { icon: BarChart3, title: "Analytics", text: "Make data-driven decisions", tone: "bg-primary", pos: "right-[2%] bottom-[2%]" },
];

export const FLOW_STEPS: { n: string; icon: LucideIcon; title: string; text: string }[] = [
  { n: "01", icon: ShoppingBag, title: "Order Placed", text: "Customer places an order at the POS or online." },
  { n: "02", icon: ChefHat, title: "Kitchen Gets It", text: "Order appears on kitchen display instantly." },
  { n: "03", icon: CreditCard, title: "Payment Processed", text: "Secure and flexible payment options." },
  { n: "04", icon: PackageCheck, title: "Inventory Updated", text: "Stock levels adjust automatically." },
  { n: "05", icon: LineChart, title: "Insights", text: "Real-time reports & business analytics." },
];