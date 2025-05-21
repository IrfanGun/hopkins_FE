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
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { email } = req.query;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Parameter email is required and must be a string.' });
  }

  try {
    let hasMore = true;
    let customers: Customer[] = [];
    let startingAfter: string | null = null;

    while (hasMore) {
      const response: AxiosResponse<StripeCustomerResponse> = await stripeInstance.get('/customers', {
        params: {
          limit: 100,
          starting_after: startingAfter ?? undefined,
        },
      });

      const data = response?.data?.data;
      const has_more = response?.data?.has_more ?? false;

      if (!Array.isArray(data)) {
        break;
      }

      customers = customers.concat(data);
      hasMore = has_more;

      const found = data.find(
        (c: Customer) => c.email?.toLowerCase() === email.toLowerCase()
      );

      if (found) {
        return res.status(200).json(found);
      }

  startingAfter = data.length > 0 ? data[data.length - 1]?.id ?? null : null;
    }

    return res.status(404).json({ error: 'Customer not found' });

  } catch (error: any) {
    console.error('Error in get-all-customers:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
