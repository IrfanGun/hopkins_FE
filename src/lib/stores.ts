export interface Stores {
  id: string;
  name: string;
  logo: string;
  category: string;
  firstLetter: string;
  bgColor?: string;
}
export const stores: Stores[] = [
  {
    id: "1",
    name: "A Little Thing",
    logo: "/logos/a-little-thing.png",
    category: "Retail",
    firstLetter: "A",
    bgColor: "bg-pink-100",
  },
  {
    id: "2",
    name: "Bee All ",
    logo: "/logos/bestdeals.jpg",
    category: "Home",
    firstLetter: "B",
    bgColor: "bg-pink-100",
  },
  {
    id: "3",
    name: "Cat",
    logo: "/logos/aus-merch.png",
    category: "Merchandise",
    firstLetter: "C",
    bgColor: "bg-pink-100",
  },
  {
    id: "4",
    name: "Alchrono Trading",
    logo: "/logos/bestdeals.jpg",
    category: "Trading",
    firstLetter: "A",
    bgColor: "bg-pink-100",
  },
  {
    id: "5",
    name: "Anthony Larne Constructions",
    logo: "/logos/bestdeals.jpg",
    category: "Construction",
    firstLetter: "A",
    bgColor: "bg-pink-100",
  },
  {
    id: "6",
    name: "Andy & Mike Convenience King",
    logo: "/logos/bestdeals.jpg",
    category: "Retail",
    firstLetter: "A",
    bgColor: "bg-pink-100",
  },
  {
    id: "7",
    name: "Akin Pro Plumbing",
    logo: "/logos/bestdeals.jpg",
    category: "Services",
    firstLetter: "A",
  },
  {
    id: "8",
    name: "Auto FX WA",
    logo: "/logos/bestdeals.jpg",
    category: "Automotive",
    firstLetter: "A",
  },
  {
    id: "9",
    name: "AMS Garage",
    logo: "/logos/bestdeals.jpg",
    category: "Automotive",
    firstLetter: "A",
  },
  {
    id: "10",
    name: "Adrenalin Events Australia",
    logo: "/logos/bestdeals.jpg",
    category: "Events",
    firstLetter: "A",
  },
  {
    id: "11",
    name: "Arctic Treats",
    logo: "/logos/bestdeals.jpg",
    category: "Food",
    firstLetter: "A",
  },
  {
    id: "12",
    name: "AB Autos",
    logo: "/logos/bestdeals.jpg",
    category: "Automotive",
    firstLetter: "A",
  },
  {
    id: "13",
    name: "Australian Flag Makers",
    logo: "/logos/bestdeals.jpg",
    category: "Manufacturing",
    firstLetter: "A",
  },
  {
    id: "14",
    name: "AC Auto Detailing",
    logo: "/logos/bestdeals.jpg",
    category: "Automotive",
    firstLetter: "A",
  },
  {
    id: "15",
    name: "Arcadia Whisky Lounge",
    logo: "/logos/bestdeals.jpg",
    category: "Hospitality",
    firstLetter: "A",
  },
  {
    id: "16",
    name: "Alie Mechanical Services",
    logo: "/logos/bestdeals.jpg",
    category: "Services",
    firstLetter: "A",
  },
  {
    id: "17",
    name: "Adelaide RV",
    logo: "/logos/bestdeals.jpg",
    category: "Automotive",
    firstLetter: "A",
  },
  {
    id: "18",
    name: "Audi Conceptz Perth",
    logo: "/logos/bestdeals.jpg",
    category: "Automotive",
    firstLetter: "A",
  },
  {
    id: "19",
    name: "Auto Pro Finish Detailing",
    logo: "/logos/bestdeals.jpg",
    category: "Automotive",
    firstLetter: "A",
  },
  {
    id: "20",
    name: "Autosport Tyre World No.1 Pty Ltd",
    logo: "/logos/bestdeals.jpg",
    category: "Automotive",
    firstLetter: "A",
  },
  // Add more stores for other letters
  {
    id: "21",
    name: "Australian Rangehoods",
    logo: "/logos/bestdeals.jpg",
    category: "Home",
    firstLetter: "A",
  },
  {
    id: "22",
    name: "Atlantis & Co",
    logo: "/logos/bestdeals.jpg",
    category: "Retail",
    firstLetter: "A",
  },
  {
    id: "23",
    name: "Attention To Detailing",
    logo: "/logos/bestdeals.jpg",
    category: "Automotive",
    firstLetter: "A",
  },
  {
    id: "24",
    name: "AMS Doors, Timber and Hardware",
    logo: "/logos/bestdeals.jpg",
    category: "Home",
    firstLetter: "A",
  },
  {
    id: "25",
    name: "Allied Health Co",
    logo: "/logos/bestdeals.jpg",
    category: "Health",
    firstLetter: "A",
  },
  // Add more stores as needed
  {
    id: "26",
    name: "Aristocratic Constructions",
    logo: "/logos/bestdeals.jpg",
    category: "Construction",
    firstLetter: "A",
  },
  {
    id: "27",
    name: "Alogenic Certified Organic Aloe Vera",
    logo: "/logos/bestdeals.jpg",
    category: "Health",
    firstLetter: "A",
  },
  {
    id: "28",
    name: "A1 Glass Cleaner",
    logo: "/logos/bestdeals.jpg",
    category: "Services",
    firstLetter: "A",
  },
  {
    id: "29",
    name: "A&J's Rolling Cafe",
    logo: "/logos/bestdeals.jpg",
    category: "Food",
    firstLetter: "A",
  },
  {
    id: "30",
    name: "Bee",
    logo: "/logos/bestdeals.jpg",
    category: "Insurance",
    firstLetter: "B",
  },
];

// Helper function to get all available first letters
export const getUniqueFirstLetters = (): string[] => {
  const letters = new Set<string>();

  stores.forEach((store) => {
    letters.add(store.firstLetter);
  });

  return Array.from(letters).sort();
};

// Helper function to filter stores by first letter
export const getStoresByLetter = (letter: string): Stores[] => {
  return stores.filter((store) => store.firstLetter === letter);
};
