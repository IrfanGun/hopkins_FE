import axiosInstance from "src/api/axiosInstance";

export interface MajorDrawWinner {
  id: string;
  title: string;
  date: string;
  image: string;
  isPromo ? :string;
  winners: { label: string; prize: string }[];

}


export async function fetchDraws() : Promise<MajorDrawWinner[]> {

  const response = await axiosInstance.get('/api/major-draws');
  return response.data.map((Item :any ) => ({
    id : Item.id,
    title : Item.title,
    date : Item.date,
    image : Item.image_url,
    
    winners : Item.winners.map((winner : any) => ({
      label : winner.label,
      prize : winner.prize
    }))
  }));

}
