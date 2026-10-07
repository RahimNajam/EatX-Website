export interface Review {
  image: string; // Public folder images path as string
  quote: string[]; // paragraphs
  name: string;
  role: string;
}

export const REVIEWS: Review[] = [
  {
    image: "/logos/client2.webp",
    name: "Restaurant Name 1",
    role: "Owner, Karachi",
    quote: [
      "Before eatX we were writing orders on paper and losing track every evening rush.",
      "Now every order reaches the kitchen in seconds and our mistakes have almost disappeared.",
    ],
  },
  {
    image: "/logos/client3.webp",
    name: "Restaurant Name 2",
    role: "Operations Manager, Lahore",
    quote: [
      "The offline POS saved us during a full-day internet outage. Not a single order was lost.",
      "Everything synced on its own the moment the connection came back.",
    ],
  },
  {
    image: "/logos/client4.webp",
    name: "Restaurant Name 3",
    role: "Head Chef, Islamabad",
    quote: [
      "Inventory reports finally show us exactly where our waste comes from.",
      "We cut food cost in the first month just by seeing the numbers clearly.",
    ],
  },
  {
    image: "/logos/client5.webp",
    name: "Restaurant Name 4",
    role: "Founder, Multan",
    quote: [
      "Managing three branches used to need three phone calls a day.",
      "Now I open one dashboard and see sales, staff and stock for every outlet.",
    ],
  },
  {
    image: "/logos/client6.webp",
    name: "Restaurant Name 5",
    role: "General Manager, Faisalabad",
    quote: [
      "Web ordering started bringing in new customers within the first week.",
      "Orders land in the same queue as the POS, so my team never juggles screens.",
    ],
  },
  {
    image: "/logos/client7.webp",
    name: "Restaurant Name 6",
    role: "Cafe Owner, Peshawar",
    quote: [
      "The self kiosk shortened our queues at lunch time more than we expected.",
      "Customers customize their own orders and the kitchen gets them correct every time.",
    ],
  },
  {
    image: "/logos/client8.webp",
    name: "Restaurant Name 7",
    role: "Director, Rawalpindi",
    quote: [
      "Payroll and attendance used to take two days every month. Now it takes minutes.",
      "The reports make our weekly meetings short and full of real answers.",
    ],
  },
];

export const REVIEW_STATS = [
  { label: "Top Customer Ratings", value: "91%", wide: true },
  { label: "On-Time Orders", value: "100%", wide: false },
  { label: "Kitchen Efficiency", value: "87%", wide: false },
];