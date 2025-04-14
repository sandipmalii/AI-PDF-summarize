import { pricingPlans } from '@/utils/constants';
import { getDbConnection } from './db';
import { getUserUploadCount } from './summaries';
import { User } from '@clerk/nextjs/server';

/**
 * Get the price ID for a user with an active subscription
 */
export async function getPriceIdForActiveUser(email: string) {
  const sql = await getDbConnection();
  const query = await sql`
    SELECT price_id FROM users
    WHERE email = ${email} AND status = 'active'
  `;
  return query?.[0]?.price_id || null;
}

/**
 * Check if a user has an active plan
 */
export async function hasActivePlan(email: string) {
  const sql = await getDbConnection();
  const query = await sql`
    SELECT price_id, status FROM users
    WHERE email = ${email} AND status = 'active' AND price_id IS NOT NULL
  `;
  return query && query.length > 0;
}

/**
 * Check if user has reached their upload limit
 */
export async function hasReachedUploadLimit(userId: string) {
  const uploadCount = await getUserUploadCount(userId);
  const priceId = await getPriceIdForActiveUser(userId);
  const isPro = pricingPlans.find((plan) => plan.priceId === priceId)?.id === 'pro';
  const uploadLimit: number = isPro ? 100 : 5;

  return {
    hasReachedLimit: uploadCount >= uploadLimit,
    uploadLimit,
  };
}

/**
 * Get subscription status of a user
 */
export async function getSubscriptionStatus(user: User) {
  const hasSubscription = await hasActivePlan(
    user.emailAddresses[0].emailAddress
  );
  return hasSubscription;
}
