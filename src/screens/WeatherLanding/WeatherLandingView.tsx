import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearTransition } from 'react-native-reanimated';
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';
import { CurrentWeatherResponse } from 'src/api/types';
import { WeatherCard } from 'src/components';

type WeatherLandingViewProps = {
  onLocationPress: () => {};
  isGeocationWeatherLoading: boolean;
  myLocationWeatherInfo: CurrentWeatherResponse;
  isSearchLocationWeatherLoading: boolean;
  searchLocationWeatherInfo: CurrentWeatherResponse;
};

export const WeatherLandingView = ({
  onLocationPress,
  isGeocationWeatherLoading,
  myLocationWeatherInfo,
  isSearchLocationWeatherLoading,
  searchLocationWeatherInfo,
}: WeatherLandingViewProps) => {
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSkeleton(false);
    }, 2000);
  }, []);

  return (
    <MotiView layout={LinearTransition} style={styles.container}>
      <WeatherCard showSkeleton={showSkeleton} />
      <View style={{ height: 16 }} />
      <WeatherCard />
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
});
