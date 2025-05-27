import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.goBack()}>
      <FontAwesome6 name="arrow-left" size={24} color="black" solid />
    </Pressable>
  );
};

export default BackButton;

