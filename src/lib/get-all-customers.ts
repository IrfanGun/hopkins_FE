import stripeInstance from 'src/api/stripeInstance';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { AxiosResponse } from 'axios';

interface Customer {
  id: string;
  email: string;
  name?: string;
}

interface StripeCustomerResponse {
  data: Customer[];
  has_more: boolean;
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { email } = req.query;

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Parameter email is required and must be a string.' });
    }

    try {
      let hasMore = true;
      let customers: Customer[] = [];
      let startingAfter = null;

      while (hasMore) {
        // ✅ Tentukan tipe data response secara eksplisit
        const response: AxiosResponse<StripeCustomerResponse> = await stripeInstance.get('/customers', {
          params: {
            limit: 100,
            starting_after: startingAfter,
          },
        });

        // 🔹 Cek apakah response.data dan response.data.data tidak undefined
        if (response.data?.data) {
          customers = customers.concat(response.data.data);

          hasMore = response.data.has_more ?? false;

          // Cek apakah datanya ada, jika tidak ada, startingAfter tetap null
          startingAfter = response.data.data.length > 0 ? response.data.data.slice(-1)[0].id : null;

          // Cek kalau sudah ketemu emailnya, langsung return
          const customer = customers.find(
            (c: Customer) => c.email?.toLowerCase() === email.toLowerCase()
          );

          if (customer) {
            return res.status(200).json(customer);
          }
        } else {
          hasMore = false; // Kalau undefined, berhenti loop
        }
      }

      return res.status(404).json({ error: 'Customer not found' });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}