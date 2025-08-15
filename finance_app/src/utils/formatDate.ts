//Formats the date to a string of the format "Month Day (abbreviated)"
// Example: Jul 17, Aug 15, etc.
// If the date is a string, it will be parsed as a local date to avoid timezone issues

export const formatDate = (date: Date | string) => {
    let parsedDate: Date;

    if (typeof date === 'string') {
        if (date.includes('T')) {
            // If it's already a datetime string, parse it normally
            parsedDate = new Date(date);
        } else if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
            // If it's just a date string (YYYY-MM-DD), create a date at midnight in local timezone
            const [year, month, day] = date.split('-').map(Number);
            parsedDate = new Date(year, month - 1, day);
        } else {
            parsedDate = new Date(date);
        }
    } else {
        parsedDate = date;
    }

    // Always return the date in "Month Day" format
    return parsedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// Return the date as someting like December 2024
export const formatDateMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};
