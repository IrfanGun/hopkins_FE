import axios, { AxiosResponse } from "axios";
import stripeInstance from "src/api/stripeInstance";

interface SubscriptionItem {
  id: string;
  plan: {
    id: string;
    nickname: string;
    product: string;
    amount: number;
  };
}

interface Subscription {
  id: string;
  status: string;
  ended_at: number;
  start_date: number;
  plan_name: string;
  entries: number;
  items: {
    data: SubscriptionItem[];
  };
}

interface SubscriptionListResponse {
  data: Subscription[];
}

const getSubscriptionDetails = async (
  id_customer: string,
): Promise<Subscription | null> => {
  try {
    const response: AxiosResponse<SubscriptionListResponse> =
      await stripeInstance.get("/subscriptions", {
        params: {
          customer: id_customer,
        },
      });

    const subscription = response.data?.data[0];

    if (subscription) {
      const amount = subscription?.items?.data[0]?.plan?.amount;
      let planName;
      let entries;

      switch (amount) {
        case 1999:
        case 19900:
          planName = "Supporter";
          entries = 1;
          break;
        case 8999:
        case 89900:
          planName = "Foundation";
          entries = 2;
          break;
        case 3999:
        case 39900:
          planName = "Advocate";
          entries = 3;
          break;
        default:
          planName = "Unknown Plan";
          entries = 0;
          break;
      }

      return {
        id: subscription.id,
        status: subscription.status,
        ended_at: subscription.ended_at,
        start_date: subscription.start_date,
        items: subscription.items,
        plan_name: planName,
        entries: entries,
      };
    } else {
    }

    return null;
  } catch (error: any) {
    return null;
  }
};

export default getSubscriptionDetails;
