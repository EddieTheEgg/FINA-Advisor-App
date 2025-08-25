import { View, Text } from 'react-native';
import { styles } from './SetupNoteCard.styles';

export const SetupNoteCard = () => {
    return (
        <View style = {styles.container}>
            <Text style = {styles.noteText}><Text style = {styles.noteBold}>💡 Note:</Text> You can add/customize categories and accounts anytime in Settings.</Text>
        </View>
    );
};
