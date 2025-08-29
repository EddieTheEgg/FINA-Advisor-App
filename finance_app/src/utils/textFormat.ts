
    //Trucnates the text via a given amount of max char (length : number)
    export const truncateText = (text: string | undefined, maxLength: number) => {
        if(text === undefined) {
            return;
        }

        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    };

    //Simply capitalizes first letter of the given string
    export const capitalizeFirstLetter = (text: string) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    // Format account type to be properly capitalized with spaces (e.g., CREDIT_CARD -> Credit Card)
    export const formatAccountType = (accountType: string) => {
        return accountType.replace(/_/g, ' ')
        .split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    };
