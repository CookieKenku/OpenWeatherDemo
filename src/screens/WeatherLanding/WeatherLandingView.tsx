import { ScrollView, StyleSheet } from 'react-native';
import { AnimatePresence } from 'moti';
import { CurrentWeatherResponse } from 'src/api/types';
import { WeatherCardSection } from 'src/components';

type WeatherLandingViewProps = {
  onCardPress: (data: CurrentWeatherResponse) => void;
  isGeolocationWeatherLoading: boolean;
  geolocationWeather?: CurrentWeatherResponse;
  geolocationWeatherError?: string;
  isSearchLocationWeatherLoading: boolean;
  searchLocationWeather?: CurrentWeatherResponse;
  searchLocationWeatherError?: string;
  favouriteLocationWeather?: CurrentWeatherResponse;
  isFavouriteLocationWeatherLoading: boolean;
  favouriteLocationWeatherError?: string;
};

export const WeatherLandingView = ({
  onCardPress,
  isGeolocationWeatherLoading,
  geolocationWeather,
  geolocationWeatherError,
  isSearchLocationWeatherLoading,
  searchLocationWeather,
  searchLocationWeatherError,
  favouriteLocationWeather,
  isFavouriteLocationWeatherLoading,
  favouriteLocationWeatherError,
}: WeatherLandingViewProps) => {
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <AnimatePresence>
        <WeatherCardSection
          data={searchLocationWeather}
          errorMessage={searchLocationWeatherError}
          isLoading={isSearchLocationWeatherLoading}
          onCardPress={onCardPress}
          sectionName="Search Location"
        />
      </AnimatePresence>
      <AnimatePresence>
        <WeatherCardSection
          data={geolocationWeather}
          errorMessage={geolocationWeatherError}
          isLoading={isGeolocationWeatherLoading}
          onCardPress={onCardPress}
          sectionName="My Location"
        />
      </AnimatePresence>
      <AnimatePresence>
        <WeatherCardSection
          data={favouriteLocationWeather}
          errorMessage={favouriteLocationWeatherError}
          isLoading={isFavouriteLocationWeatherLoading}
          onCardPress={onCardPress}
          sectionName="Favourite Location"
        />
      </AnimatePresence>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    rowGap: 24,
  },
});
