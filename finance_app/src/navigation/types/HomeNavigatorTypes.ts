import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type HomeStackParamList = {
  Home: undefined;
};

export type HomeNavigationProps<T extends keyof HomeStackParamList> = {
  navigation: NativeStackNavigationProp<HomeStackParamList, T>;
};
