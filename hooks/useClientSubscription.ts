import { useAuth } from '../contexts/AuthContext';
import { useMemo } from 'react';

export const useClientSubscription = () => {
  const { clientData } = useAuth();

  const subscriptionState = useMemo(() => {
    if (!clientData) return { status: 'loading', isLocked: true, isReadOnly: true };

    const status = clientData.subscriptionStatus;
    const isTrial = status === 'trial';
    const isActive = status === 'active';
    const isPastDue = status === 'past_due';
    const isCanceled = status === 'canceled';

    return {
      status,
      plan: clientData.plan,
      isTrial,
      isActive,
      isPastDue,
      isCanceled,
      // Access Logic
      isLocked: isCanceled, // Can't see dashboard at all
      isReadOnly: isPastDue, // Can see dashboard but not perform actions (create ticket, etc)
      // Display Helpers
      daysLeftInTrial: isTrial && clientData.currentPeriodEnd 
        ? Math.max(0, Math.ceil((clientData.currentPeriodEnd.seconds * 1000 - Date.now()) / (1000 * 60 * 60 * 24))) 
        : 0,
      nextBillingDate: clientData.currentPeriodEnd 
        ? new Date(clientData.currentPeriodEnd.seconds * 1000).toLocaleDateString()
        : 'N/A'
    };
  }, [clientData]);

  return subscriptionState;
};
