import axios, { AxiosResponse } from 'axios';
import stripeInstance from 'src/api/stripeInstance';

interface Customer {
  id: string;
  email: string;
  name?: string;
  phone?: string;
}

const getCustomerDetails = async (id_customer: string): Promise<Customer | null> => {
  try {
    const response: AxiosResponse<Customer> = await stripeInstance.get(`/customers/${id_customer}`);
    return response.data;
  } catch (error: any) {
    return null;
  }
};

export default getCustomerDetails;