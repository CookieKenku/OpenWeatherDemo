import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CurrentWeatherResponse } from 'src/api/types';

export type RootStackParamList = {
  WeatherLanding: undefined;
  WeatherDetails: {
    data: CurrentWeatherResponse;
  };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
