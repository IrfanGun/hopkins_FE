import axios, { AxiosResponse } from "axios";
import stripeInstance from "src/api/stripeInstance";

interface Subscription {
  id: string;
  status: string;
  current_period_end: number;
  current_period_start: number;
}

interface SubscriptionListResponse {
  data: Subscription[];
}

const getSubscriptionDetails = async (id_customer:string) : Promise<any | null > => {

    try {

        const response: AxiosResponse<SubscriptionListResponse> = await stripeInstance.get('/subscriptions', {
            params : {
                customer : id_customer,
            }
        });

        const subscription = response.data?.data[0];

        if (subscription) {
            return {
                id:subscription.id,
                status: subscription.status,
                start_date: new Date(subscription.current_period_start * 1000).toLocaleString(),
                end_date: new Date(subscription.current_period_end * 1000).toLocaleString(),

            };
        }

        return null;


    } catch (error : any) {

        console.error('Error fetching subscription details:', error.message);
        return null;

    }

}

export default getSubscriptionDetails;