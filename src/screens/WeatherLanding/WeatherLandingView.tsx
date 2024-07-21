import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearTransition } from 'react-native-reanimated';
import { MotiView, MotiScrollView } from 'moti';
import { Skeleton } from 'moti/skeleton';
import { CurrentWeatherResponse } from 'src/api/types';
import { WeatherCard, WeatherCardSection } from 'src/components';

type WeatherLandingViewProps = {
  onLocationPress: () => void;
  isGeolocationWeatherLoading: boolean;
  geolocationWeather?: CurrentWeatherResponse;
  isSearchLocationWeatherLoading: boolean;
  searchLocationWeather?: CurrentWeatherResponse;
};

export const WeatherLandingView = ({
  onLocationPress,
  isGeocationWeatherLoading,
  geolocationWeather,
  isSearchLocationWeatherLoading,
  searchLocationWeather,
}: WeatherLandingViewProps) => {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [showSkeleton2, setShowSkeleton2] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSkeleton(false);
    }, 2000);
    // setTimeout(() => {
    //   setShowSkeleton(true);
    // }, 4000);
    // setTimeout(() => {
    //   setShowSkeleton2(false);
    // }, 2050);
    // setTimeout(() => {
    //   setShowSkeleton2(true);
    // }, 4100);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {(searchLocationWeather || isSearchLocationWeatherLoading) && (
        <WeatherCardSection sectionName="Search Location">
          <WeatherCard
            cityName={searchLocationWeather?.name}
            feelsLike={searchLocationWeather?.main.feels_like}
            showSkeleton={isSearchLocationWeatherLoading}
            temp={searchLocationWeather?.main.temp}
            weatherDescription={searchLocationWeather?.weather?.[0].description}
            weatherIcon={searchLocationWeather?.weather?.[0].icon}
          />
        </WeatherCardSection>
      )}
      {(geolocationWeather || isGeocationWeatherLoading) && (
        <WeatherCardSection sectionName="My Location">
          <WeatherCard
            cityName={geolocationWeather?.name}
            feelsLike={geolocationWeather?.main.feels_like}
            showSkeleton={showSkeleton}
            temp={geolocationWeather?.main.temp}
            weatherDescription={geolocationWeather?.weather?.[0].description}
            weatherIcon={geolocationWeather?.weather?.[0].icon}
          />
        </WeatherCardSection>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    rowGap: 24,
  },
});
