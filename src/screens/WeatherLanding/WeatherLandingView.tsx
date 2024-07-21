import { ScrollView, StyleSheet } from 'react-native';
import { AnimatePresence } from 'moti';
import { CurrentWeatherResponse } from 'src/api/types';
import { WeatherCardSection } from 'src/components';

type WeatherLandingViewProps = {
  onCardPress: (data: CurrentWeatherResponse) => void;
  isGeolocationWeatherLoading: boolean;
  isGeolocationSectionEnabled: boolean;
  geolocationWeather?: CurrentWeatherResponse;
  geolocationWeatherError?: string;
  isSearchLocationWeatherLoading: boolean;
  isSearchSectionEnabled: boolean;
  searchLocationWeather?: CurrentWeatherResponse;
  searchLocationWeatherError?: string;
  favouriteLocationWeather?: CurrentWeatherResponse;
  isFavouriteLocationWeatherLoading: boolean;
  isFavouriteSectionEnabled: boolean;
  favouriteLocationWeatherError?: string;
};

export const WeatherLandingView = ({
  onCardPress,
  isGeolocationWeatherLoading,
  isGeolocationSectionEnabled,
  geolocationWeather,
  geolocationWeatherError,
  isSearchLocationWeatherLoading,
  isSearchSectionEnabled,
  searchLocationWeather,
  searchLocationWeatherError,
  favouriteLocationWeather,
  isFavouriteLocationWeatherLoading,
  isFavouriteSectionEnabled,
  favouriteLocationWeatherError,
}: WeatherLandingViewProps) => {
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <AnimatePresence>
        {isSearchSectionEnabled && (
          <WeatherCardSection
            data={searchLocationWeather}
            errorMessage={searchLocationWeatherError}
            isLoading={isSearchLocationWeatherLoading}
            onCardPress={onCardPress}
            sectionName="Search Location"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isGeolocationSectionEnabled && (
          <WeatherCardSection
            data={geolocationWeather}
            errorMessage={geolocationWeatherError}
            isLoading={isGeolocationWeatherLoading}
            onCardPress={onCardPress}
            sectionName="My Location"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isFavouriteSectionEnabled && (
          <WeatherCardSection
            data={favouriteLocationWeather}
            errorMessage={favouriteLocationWeatherError}
            isLoading={isFavouriteLocationWeatherLoading}
            onCardPress={onCardPress}
            sectionName="Favourite Location"
          />
        )}
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
