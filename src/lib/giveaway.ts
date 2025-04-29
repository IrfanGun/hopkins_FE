export type GiveawayStatus = "Live" | "Early Bird" | "Not Yet Open" | "Closed";

export interface Giveaway {
  id: string;
  title: string;
  image: string;
  status: GiveawayStatus;
  dateText: string;
  tbd: boolean;
  url?: string;
}

export let giveaways: Giveaway[] = [
  {
    id: "100k-cash",
    title: "$100K CASH",
    image: "/logos/bestdeals.jpg",
    status: "Closed",
    dateText: "Sunday the 13th of April at 8:30PM AEST",
    tbd: true,
    url: "https://www.tokopedia.com/",
  },
  {
    id: "shelby-f150",
    title: "Shelby F150",
    image: "/logos/bestdeals.jpg",
    status: "Early Bird",
    dateText: "Thursday the 17th of April at 8:30PM AEST",
    tbd: true,
    url: "https://www.tokopedia.com/",
  },
  {
    id: "r35-gtr",
    title: "R35 GTR",
    image: "/logos/bestdeals.jpg",
    status: "Early Bird",
    dateText: "Thursday the 24th of April at 8:30PM AEST",
    tbd: true,
    url: "https://www.tokopedia.com/",
  },
  {
    id: "quintrex",
    title: "Quintrex",
    image: "/logos/bestdeals.jpg",
    status: "Early Bird",
    dateText: "Monday the 14th of April at 8:30 PM AEST",
    tbd: true,
    url: "https://www.tokopedia.com/",
  },
  {
    id: "monaro-gts",
    title: "Monaro GTS",
    image: "/logos/bestdeals.jpg",
    status: "Early Bird",
    dateText: "Sunday 4th of May at 4:00PM AEST",
    tbd: true,
    url: "https://www.tokopedia.com/",
  },
  {
    id: "hsv-gts",
    title: "HSV GTS",
    image: "/logos/bestdeals.jpg",
    status: "Live",
    dateText: "Tuesday the 29th of April at 8:30PM AEDT",
    tbd: true,
    url: "https://www.tokopedia.com/",
  },
  {
    id: "1-million-cash",
    title: "$1,000,000 Cash",
    image: "/logos/bestdeals.jpg",
    status: "Early Bird",
    dateText: "Wednesday the 30th of April at 8:30PM AEDT",
    tbd: true,
    url: "https://www.tokopedia.com/",
  },
  {
    id: "porsche-taycan",
    title: "Porsche Taycan Turbo",
    image: "/logos/bestdeals.jpg",
    status: "Not Yet Open",
    dateText: "TBD",
    tbd: true,
    
  },
];

// Untuk manipulasi data (simulasi state global sementara)
export function addGiveaway(newGiveaway: Giveaway) {
  giveaways.push(newGiveaway);
}

export function updateGiveaway(updated: Giveaway) {
  giveaways = giveaways.map((g) => (g.id === updated.id ? updated : g));
}

export function deleteGiveaway(id: string) {
  giveaways = giveaways.filter((g) => g.id !== id);
}
