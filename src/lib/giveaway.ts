import { title } from "process";
import axiosInstance from "src/api/axiosInstance";
import Partners from "src/app/(partners)/partners/page";

export type GiveawayStatus = "Live" | "Early Bird" | "Not Yet Open" | "Closed";

export interface Giveaway {
  id: number;
  title: string;
  image: string;
  status: GiveawayStatus;
  dateText: string;
  addressURL : string,
  tbd: boolean;
  url?: string;
}

export const fetchGiveaway = async() : Promise<Giveaway[]> => {

  const response = await axiosInstance.get('api/admin-gateway');
  
  return response.data.data.map( (Item : any) : Giveaway =>  {
    return {
      id : Item.id,
      title: Item.title,
      image: Item.image_url,
      status: Item.status,
      dateText: Item.date_text,
      addressURL : Item.address_url,
      tbd : true

    }
  } );

}
