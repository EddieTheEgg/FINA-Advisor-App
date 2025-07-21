//Formats the date to a string of the format "Today", "Yesterday", or "Month Day (abbreviated), Year"
// Example: Jul 17, Aug 15, etc.

export const formatDate = ( date : Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (date.toDateString() === today.toDateString()) {
        return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    } else {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
};
