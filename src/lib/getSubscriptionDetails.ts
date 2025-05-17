import axios, { AxiosResponse } from "axios";
import stripeInstance from "src/api/stripeInstance";

interface SubscriptionItem {
  id: string;
  plan: {
    id: string;
    nickname: string;
    product: string;
  };
}

interface Subscription {
  id: string;
  status: string;
  ended_at: number;
  start_date: number;
  plan_name: string;
  items: {
    data: SubscriptionItem[];
  };
}

interface SubscriptionListResponse {
  data: Subscription[];
}

const getSubscriptionDetails = async (id_customer:string) : Promise<Subscription | null> => {

    try {

        const response: AxiosResponse<SubscriptionListResponse> = await stripeInstance.get('/subscriptions', {
            params : {
                customer : id_customer,
            }
        });

        const subscription = response.data?.data[0];
        console.log(subscription);

        if (subscription) {
             const planName = subscription?.items?.data[0]?.plan?.nickname || "Unknown Plan";
            return {
                id: subscription.id,
                status: subscription.status,
                ended_at: subscription.ended_at,
                start_date: subscription.start_date,
                items: subscription.items,
                plan_name: planName,

            };
        } else {
      console.warn("No subscription found for this customer.");
         }


        return null;


    } catch (error : any) {

        console.error('Error fetching subscription details:', error.message);
        return null;

    }

}

export default getSubscriptionDetails;