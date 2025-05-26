import axios, {AxiosResponse} from "axios";
import stripeInstance from "src/api/stripeInstance";

interface PaymentHistory{
    id: string,
    amount_paid: number,
    currency: string,
    status : string,
    date : number,
    description : string,
    url : string,
}

const getPaymentHistory = async (id_customer: string): Promise<PaymentHistory[] | null> => {
  try {
    const response: AxiosResponse<any> = await stripeInstance.get('/invoices', {
      params: {
        customer: id_customer,
      },
    });


    const invoices = response.data?.data.map((invoice: any) => ({
      id: invoice.id,
      amount_paid: invoice.amount_paid / 100, // Stripe menggunakan cents
      currency: invoice.currency.toUpperCase(),
      status: invoice.status,
      date: invoice.created,
      description: invoice.lines.data[0].description || "No description",
      url : invoice.hosted_invoice_url
    }));

    return invoices;
  } catch (error: any) {
    console.error('Error fetching payment history:', error.message);
    return null;
  }
};

export default getPaymentHistory;