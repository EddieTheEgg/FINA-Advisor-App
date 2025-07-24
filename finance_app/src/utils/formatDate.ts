//Formats the date to a string of the format "Today", "Yesterday", or "Month Day (abbreviated), Year"
// Example: Jul 17, Aug 15, etc.

export const formatDate = (date: Date | string) => {
    // If date is a string, parse it as local date to avoid timezone issues by adding 'T00:00:00'
    let parsedDate: Date;
    if (typeof date === 'string') {
        parsedDate = new Date(date + 'T00:00:00');
    } else {
        parsedDate = date;
    }

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (parsedDate.toDateString() === today.toDateString()) {
        return 'Today';
    } else if (parsedDate.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    } else {
        return parsedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
};
