export interface MajorDrawWinner {
  id: string;
  title: string;
  date: string;
  winners: { label: string; prize: string }[];
  image?: string;
}

export let majorDrawWinners: MajorDrawWinner[] = [
  {
    id: "quintrex-690",
    title: "Quintrex Trident 690 14/04/25",
    date: "14/04/25",
    image: "/logos/merchco.jpg",
    winners: [
      { label: "1st", prize: "Prize Quintrex Trident 690 - Craig M" },
      { label: "2nd", prize: "Prize $2500 Credit - Stefanie M" },
      { label: "3rd", prize: "Prize $1000 Credit - Kim B" },
    ],
  },
  {
    id: "test-2",
    title: "test 2 Trident 690 14/04/25",
    date: "14/04/25",
    image: "/logos/merchco.jpg",
    winners: [
      { label: "1st", prize: "Prize Quintrex Trident 690 - Craig M" },
      { label: "2nd", prize: "Prize $2500 Credit - Stefanie M" },
      { label: "3rd", prize: "Prize $1000 Credit - Kim B" },
    ],
  },
];

export function addMajorDraw(winner: MajorDrawWinner) {
  majorDrawWinners.push(winner);
}

export function updateMajorDraw(updated: MajorDrawWinner) {
  majorDrawWinners = majorDrawWinners.map((item) =>
    item.id === updated.id ? updated : item,
  );
}

export function deleteMajorDraw(id: string) {
  majorDrawWinners = majorDrawWinners.filter((item) => item.id !== id);
}
