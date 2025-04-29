export interface Banner {
  id: number;
  title: string;
  image: string;
  page: string;
  active: boolean;
  position: "Top" | "Middle" | "Bottom";
}

export const initialBanners: Banner[] = [
  {
    id: 1,
    title: "Summer Promotion",
    image: "https://statik.tempo.co/data/2024/06/20/id_1311774/1311774_720.jpg",
    page: "Home",
    active: true,
    position: "Top",
  },
  {
    id: 2,
    title: "New Giveaway",
    image: "https://statik.tempo.co/data/2024/06/20/id_1311774/1311774_720.jpg",
    page: "Giveaways",
    active: true,
    position: "Middle",
  },
  {
    id: 3,
    title: "Special Offer",
    image: "https://statik.tempo.co/data/2024/06/20/id_1311774/1311774_720.jpg",
    page: "Discounts",
    active: false,
    position: "Bottom",
  },
];
