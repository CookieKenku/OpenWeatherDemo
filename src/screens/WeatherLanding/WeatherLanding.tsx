import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SearchBarProps } from 'react-native-screens';
import { WeatherLandingView } from './WeatherLandingView';

export const WeatherLanding = () => {
  const { setOptions } = useNavigation();
  useLayoutEffect(() => {
    setOptions({
      headerSearchBarOptions: {
        hideNavigationBar: false,
        hideWhenScrolling: false,
        // search bar options
      } as SearchBarProps,
    });
  }, [setOptions]);
  return <WeatherLandingView />;
};
