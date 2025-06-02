import { get } from "http";
import axiosInstance from "src/api/axiosInstance";

export interface States {
    id: number;
    name: string;
    shortName: string;
}

export async function getStates(): Promise<States[]> {
    try {
        
        const response = await axiosInstance.get("/api/states", {
            withCredentials: true,
        });
        return response.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            shortName: item.short_name,
        }));


    } catch (error) {
        console.error("Error fetching states:", error);
        return [];
    }
}


