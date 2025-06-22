import { View, Text } from 'react-native';
import { styles } from './NetWorthCard.styles';

type NetWorthCardProps = {
    totalNet : number,
    percentChange: number,
}

export const NetWorthCard = ({totalNet, percentChange} : NetWorthCardProps) => {
    const getPercentChangeStyleText = (percent: number) => {
        const formattedPercent = percent.toFixed(2);
        if (percent > 0) {
            return { text: `+${formattedPercent}% this month`, style: [styles.greenBadge, styles.badgeContainer] };
        }
        if (percent < 0) {
            return { text: `${formattedPercent}% this month`, style: [styles.redBadge, styles.badgeContainer] };
        }
        return { text: `${formattedPercent}% this month`, style: [styles.grayBadge, styles.badgeContainer] };
    };

    const {text, style} = getPercentChangeStyleText(percentChange);

    return (
        <View style = {styles.netWorthContainer}>
            <Text style = {styles.title}> Total Net Worth</Text>
            <Text style = {styles.netWorthText}> ${totalNet.toLocaleString()} </Text>
            <Text style = {style}>{text}</Text>
        </View>
    );
};
