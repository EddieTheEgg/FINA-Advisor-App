import { Text, TextStyle } from 'react-native';

export default function Greeting({styles}: {styles?: TextStyle}) {

    const getGreetingMessage = () => {
        const hours = new Date().getHours();
        const isMorning = hours < 12;
        const isAfternoon = hours < 18;
        const isEvening = hours < 24;

        let greeting = '';
        if (isMorning) {greeting = 'Good morning';}
        else if (isAfternoon) {greeting = 'Good afternoon';}
        else if (isEvening) {greeting = 'Good evening';}
        else {greeting = 'Hello';}

        return `${greeting}`;
    };

    return (
        <Text style={styles}>
            {getGreetingMessage()}
        </Text>
    );
}
