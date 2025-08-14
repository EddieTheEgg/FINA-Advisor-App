//Formats the date to a string of the format "Today", "Yesterday", or "Month Day (abbreviated), Year"
// Example: Jul 17, Aug 15, etc.
// If the date is a string, it will be parsed as a local date to avoid timezone issues by adding 'T00:00:00'

export const formatDate = (date: Date | string) => {
    let parsedDate: Date;

    if (typeof date === 'string') {
            if (date.includes('T')) {
            parsedDate = new Date(date);
        } else if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
            parsedDate = new Date(date + 'T00:00:00');
        } else {
            parsedDate = new Date(date);
        }
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


// Return the date as someting like December 2024
export const formatDateMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};
