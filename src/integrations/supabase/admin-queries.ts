import { supabaseAdmin } from './admin-client';

export async function adminGetSubscriptionStatus(userId: string) {
  const { data, error } = await supabaseAdmin
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching subscription:', error);
    return null;
  }

  return data;
}

export async function adminCreateSubscription(userId: string, email: string, displayName: string, subscriptionType: string, endDate: Date) {
  try {
    const startDate = new Date();

    const { data, error } = await supabaseAdmin
      .from('subscriptions')
      .insert({
        user_id: userId,
        email: email,
        display_name: displayName,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        subscription_type: subscriptionType,
        trial_used: subscriptionType === 'Trial',
        subscription_status: 'Active',
        created_at: startDate.toISOString()
    })
    .select()
    .single();

    if (error) {
      console.error('Error creating subscription:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in adminCreateSubscription:', error);
    return null;
  }
}