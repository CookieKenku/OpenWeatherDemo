import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  WeatherLanding: undefined;
  WeatherDetails: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
