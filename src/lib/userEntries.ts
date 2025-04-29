export interface UserEntries {
  id: string;
  title: string;
  date: string;
  image?: string;
  loyaltyPoints: number;
  showWinBadge: boolean;
}

export const userEntries: UserEntries[] = [
  {
    id: "1-million-cash",
    title: "$1,000,000 Cash",
    date: "Wednesday the 30th of April at 8:30PM AEST",
    image: "/logos/a-little-thing.png",
    loyaltyPoints: 2,
    showWinBadge: true,
  },
  {
    id: "hsv-gts",
    title: "HSV GTS",
    date: "Tuesday the 29th of April At 8:30PM AEST",
    image: "/logos/bestdeals.jpg",
    loyaltyPoints: 2,
    showWinBadge: true,
  },
  {
    id: "monaro-gts",
    title: "Monaro GTS",
    date: "Sunday 4th of May at 4:00 PM AEST",
    image: "/logos/a-little-thing.png",
    loyaltyPoints: 2,
    showWinBadge: true,
  },
  {
    id: "ford-f150-raptor",
    title: "Ford F150 Raptor + Lotus Caravan",
    date: "27/03/2025",
    image: "/logos/a-little-thing.png",
    loyaltyPoints: 2,
    showWinBadge: true,
  },
];
