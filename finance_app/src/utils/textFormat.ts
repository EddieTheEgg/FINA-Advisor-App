
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
