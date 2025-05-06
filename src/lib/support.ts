import axiosInstance from "src/api/axiosInstance";

export interface Ticket {
  id: number;
  subject: string;
  message: string;
  userEmail: string;
  status: "open" | "pending" | "closed";
  createdAt: string;
}


export async function fetchSupport() : Promise<Ticket[]> {

  const response = await axiosInstance.get("/api/support-tickets");
  return response.data.map((Item : any) => ({
    id : Item.id,
    subject : Item.subject,
    message : Item.message,
    userEmail : Item.user_email,
    status : Item.status
  }
  ))

} 

// export const dummyTickets: Ticket[] = [
//   {
//     id: 1,
//     subject: "Tidak bisa klaim kode",
//     message: "Saya sudah klik getcode tapi tidak muncul kode promo.",
//     userEmail: "user1@email.com",
//     status: "open",
//     createdAt: "2025-04-21 10:30",
//   },
//   {
//     id: 2,
//     subject: "Hadiah belum dikirim",
//     message: "Saya menang giveaway minggu lalu tapi belum ada info pengiriman.",
//     userEmail: "user2@email.com",
//     status: "pending",
//     createdAt: "2025-04-20 09:00",
//   },
// ];
