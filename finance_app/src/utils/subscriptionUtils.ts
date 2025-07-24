export type SubscriptionFrequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';

export type SubscriptionStatus = {
    isActive: boolean;
    nextPaymentDate: Date | null;
    daysUntilNextPayment: number | null;
    status: 'ACTIVE' | 'ENDED' | 'UPCOMING';
};

/**
 * Adds time interval based on subscription frequency
 */
const addTimeInterval = (date: Date, frequency: SubscriptionFrequency): Date => {
    const newDate = new Date(date);
    
    switch (frequency) {
        case 'DAILY':
            newDate.setDate(newDate.getDate() + 1);
            break;
        case 'WEEKLY':
            newDate.setDate(newDate.getDate() + 7);
            break;
        case 'MONTHLY':
            newDate.setMonth(newDate.getMonth() + 1);
            break;
        case 'YEARLY':
            newDate.setFullYear(newDate.getFullYear() + 1);
            break;
    }
    
    return newDate;
};

/**
 * Calculates the next payment date from current date
 */
const calculateNextPaymentFromCurrent = (
    startDate: Date,
    currentDate: Date,
    frequency: SubscriptionFrequency
): Date => {
    let nextPayment = new Date(startDate);
    
    // If start date is in the future, that's the next payment
    if (startDate > currentDate) {
        return startDate;
    }
    
    // Calculate how many intervals have passed and find the next one
    while (nextPayment <= currentDate) {
        nextPayment = addTimeInterval(nextPayment, frequency);
    }
    
    return nextPayment;
};

/**
 * Calculates days between two dates
 */
const daysBetween = (date1: Date, date2: Date): number => {
    const diffTime = date2.getTime() - date1.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Main function to get subscription status and next payment info
 */
export const getSubscriptionStatus = (
    startDate: Date | string,
    endDate: Date | string | null,
    frequency: SubscriptionFrequency,
    currentDate: Date = new Date()
): SubscriptionStatus => {
    // Parse dates
    const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
    const end = endDate ? (typeof endDate === 'string' ? new Date(endDate) : endDate) : null;
    const current = currentDate;
    
    // Normalize dates to start of day for comparison
    const normalizeDate = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    const normalizedStart = normalizeDate(start);
    const normalizedEnd = end ? normalizeDate(end) : null;
    const normalizedCurrent = normalizeDate(current);
    
    // Check if subscription hasn't started yet
    if (normalizedStart > normalizedCurrent) {
        return {
            isActive: false,
            nextPaymentDate: start,
            daysUntilNextPayment: daysBetween(normalizedCurrent, normalizedStart),
            status: 'UPCOMING'
        };
    }
    
    // Check if subscription has ended
    if (normalizedEnd && normalizedEnd < normalizedCurrent) {
        return {
            isActive: false,
            nextPaymentDate: null,
            daysUntilNextPayment: null,
            status: 'ENDED'
        };
    }
    
    // Subscription is active - calculate next payment
    const nextPayment = calculateNextPaymentFromCurrent(start, current, frequency);
    
    // Check if next payment would be after end date
    if (normalizedEnd && normalizeDate(nextPayment) > normalizedEnd) {
        return {
            isActive: false,
            nextPaymentDate: null,
            daysUntilNextPayment: null,
            status: 'ENDED'
        };
    }
    
    return {
        isActive: true,
        nextPaymentDate: nextPayment,
        daysUntilNextPayment: daysBetween(normalizedCurrent, normalizeDate(nextPayment)),
        status: 'ACTIVE'
    };
};

/**
 * Helper function to format subscription status for display
 */
export const formatSubscriptionStatus = (status: SubscriptionStatus): string => {
    switch (status.status) {
        case 'ACTIVE':
            const days = status.daysUntilNextPayment;
            if (days === 0) return 'Payment due today';
            if (days === 1) return 'Payment due tomorrow';
            return `Next payment in ${days} days`;
        case 'UPCOMING':
            const daysUntilStart = status.daysUntilNextPayment;
            if (daysUntilStart === 0) return 'Starts today';
            if (daysUntilStart === 1) return 'Starts tomorrow';
            return `Starts in ${daysUntilStart} days`;
        case 'ENDED':
            return 'Subscription ended';
        default:
            return 'Unknown status';
    }
}; 