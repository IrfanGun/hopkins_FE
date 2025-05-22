import stripeInstance from 'src/api/stripeInstance';

export async function getStripeStats() {
  const now = Math.floor(Date.now() / 1000);
  const oneWeekAgo = now - 7 * 24 * 60 * 60;
  const twoWeeksAgo = now - 14 * 24 * 60 * 60;

  // 1. Ambil revenue minggu ini dan minggu lalu dari payment_intents
  const [thisWeekRes, lastWeekRes, customersRes, subscriptionsRes] = await Promise.all([
    stripeInstance.get('/payment_intents', {
      params: {
    limit: 100,
    'created[gte]': oneWeekAgo,
    'created[lte]': now,
  },
    }),
    stripeInstance.get('/payment_intents', {
        params: {
    limit: 100,
    'created[gte]': twoWeeksAgo,
    'created[lte]': oneWeekAgo,
  },
    }),
    // 2. Ambil semua customers (subscriber)
    stripeInstance.get('/customers', { params: { limit: 100 } }),
    // 3. Ambil semua subscriptions (untuk cek yang aktif)
    stripeInstance.get('/subscriptions', { params: { limit: 100 } }),
  ]);

  const thisWeekPayments = thisWeekRes.data.data as Array<{
    amount_received: number;
    currency: string;
  }>;

  const lastWeekPayments = lastWeekRes.data.data as Array<{
    amount_received: number;
  }>;

  // Total revenue
  const currentTotal = thisWeekPayments.reduce((acc, p) => acc + p.amount_received, 0);
  const lastWeekTotal = lastWeekPayments.reduce((acc, p) => acc + p.amount_received, 0);

  // Customers = subscriber keseluruhan
  const totalSubscribers = customersRes.data.data.length;
  console.log('Total Subscribers:', totalSubscribers);

  // Filter subscriptions yang aktif (status active atau trialing)
  const activeSubscriptions = subscriptionsRes.data.data.filter((sub: any) =>
    ['active', 'trialing'].includes(sub.status)
  );
  const activeSubscribers = activeSubscriptions.length;

  return {
    currentRevenue: currentTotal / 100,
    lastWeekRevenue: lastWeekTotal / 100,
    currency: thisWeekPayments[0]?.currency ?? 'usd',
    totalSubscribers,
    activeSubscribers,
  };
}
