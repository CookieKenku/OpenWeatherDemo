import { ScrollView, StyleSheet } from 'react-native';
import { AnimatePresence } from 'moti';
import { CurrentWeatherResponse } from 'src/api/types';
import { WeatherCard, WeatherCardSection } from 'src/components';

type WeatherLandingViewProps = {
  onCardPress: () => void;
  onFavouritePress: (cityName: string) => void;
  isGeolocationWeatherLoading: boolean;
  geolocationWeather?: CurrentWeatherResponse;
  isSearchLocationWeatherLoading: boolean;
  searchLocationWeather?: CurrentWeatherResponse;
  favouriteCity: string;
  favouriteLocationWeather?: CurrentWeatherResponse;
  isFavouriteLocationWeatherLoading: boolean;
};

export const WeatherLandingView = ({
  onCardPress,
  onFavouritePress,
  isGeolocationWeatherLoading,
  geolocationWeather,
  isSearchLocationWeatherLoading,
  searchLocationWeather,
  favouriteCity,
  favouriteLocationWeather,
  isFavouriteLocationWeatherLoading,
}: WeatherLandingViewProps) => {
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <AnimatePresence>
        {(searchLocationWeather || isSearchLocationWeatherLoading) && (
          <WeatherCardSection sectionName="Search Location">
            <WeatherCard
              cityName={searchLocationWeather?.name}
              feelsLike={searchLocationWeather?.main.feels_like}
              isFavourite={favouriteCity === searchLocationWeather?.name}
              onCardPress={onCardPress}
              onFavouritePress={onFavouritePress}
              showSkeleton={isSearchLocationWeatherLoading}
              temp={searchLocationWeather?.main.temp}
              weatherDescription={
                searchLocationWeather?.weather?.[0].description
              }
              weatherIcon={searchLocationWeather?.weather?.[0].icon}
            />
          </WeatherCardSection>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {(geolocationWeather || isGeolocationWeatherLoading) && (
          <WeatherCardSection sectionName="My Location">
            <WeatherCard
              cityName={geolocationWeather?.name}
              feelsLike={geolocationWeather?.main.feels_like}
              isFavourite={favouriteCity === geolocationWeather?.name}
              onCardPress={onCardPress}
              onFavouritePress={onFavouritePress}
              showSkeleton={isGeolocationWeatherLoading}
              temp={geolocationWeather?.main.temp}
              weatherDescription={geolocationWeather?.weather?.[0].description}
              weatherIcon={geolocationWeather?.weather?.[0].icon}
            />
          </WeatherCardSection>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {(favouriteLocationWeather || isFavouriteLocationWeatherLoading) && (
          <WeatherCardSection sectionName="Favourite Location">
            <WeatherCard
              cityName={favouriteLocationWeather?.name}
              feelsLike={favouriteLocationWeather?.main.feels_like}
              isFavourite={favouriteCity === favouriteLocationWeather?.name}
              onCardPress={onCardPress}
              onFavouritePress={onFavouritePress}
              showSkeleton={isFavouriteLocationWeatherLoading}
              temp={favouriteLocationWeather?.main.temp}
              weatherDescription={
                favouriteLocationWeather?.weather?.[0].description
              }
              weatherIcon={favouriteLocationWeather?.weather?.[0].icon}
            />
          </WeatherCardSection>
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
