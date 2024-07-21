import { render, screen } from '@testing-library/react-native';
import { WeatherLandingView } from '../WeatherLandingView';

describe('WeatherLandingView', () => {
  it.each([
    [false, true, true],
    [true, false, false],
    [true, false, true],
    [false, true, false],
  ] as const)(
    'sectons render correctly with isSearchSectionEnabled=%s isGeolocationSectionEnabled=%s isFavouriteSectionEnabled=%s',
    (isSearchSectionEnabled, isGeolocationSectionEnabled, isFavouriteSectionEnabled) => {
      render(
        <WeatherLandingView
          isFavouriteLocationWeatherLoading
          isFavouriteSectionEnabled={isFavouriteSectionEnabled}
          isGeolocationSectionEnabled={isGeolocationSectionEnabled}
          isGeolocationWeatherLoading
          isSearchLocationWeatherLoading
          isSearchSectionEnabled={isSearchSectionEnabled}
          onCardPress={jest.fn()}
        />,
      );

      if (isSearchSectionEnabled) expect(screen.queryByText('Search Location')).toBeOnTheScreen();
      else expect(screen.queryByText('Search Location')).not.toBeOnTheScreen();

      if (isGeolocationSectionEnabled) expect(screen.queryByText('My Location')).toBeOnTheScreen();
      else expect(screen.queryByText('My Location')).not.toBeOnTheScreen();

      if (isFavouriteSectionEnabled)
        expect(screen.queryByText('Favourite Location')).toBeOnTheScreen();
      else expect(screen.queryByText('Favourite Location')).not.toBeOnTheScreen();
    },
  );

  it.each([
    ['search error', undefined, undefined, true],
    [undefined, 'geolocation error', undefined, true],
    [undefined, undefined, 'favourite error', true],
    ['search error', 'geolocation error', 'favourite error', false],
  ] as const)(
    'errors display correctly with searchLocationWeatherError=%s geolocationWeatherError=%s favouriteLocationWeatherError=%s isEnabled',
    (
      searchLocationWeatherError,
      geolocationWeatherError,
      favouriteLocationWeatherError,
      isEnabled,
    ) => {
      render(
        <WeatherLandingView
          favouriteLocationWeatherError={favouriteLocationWeatherError}
          geolocationWeatherError={geolocationWeatherError}
          isFavouriteLocationWeatherLoading
          isFavouriteSectionEnabled={isEnabled}
          isGeolocationSectionEnabled={isEnabled}
          isGeolocationWeatherLoading
          isSearchLocationWeatherLoading
          isSearchSectionEnabled={isEnabled}
          onCardPress={jest.fn()}
          searchLocationWeatherError={searchLocationWeatherError}
        />,
      );

      if (isEnabled) {
        if (searchLocationWeatherError)
          expect(screen.queryByText(searchLocationWeatherError)).toBeOnTheScreen();
        if (geolocationWeatherError)
          expect(screen.queryByText(geolocationWeatherError)).toBeOnTheScreen();
        if (favouriteLocationWeatherError)
          expect(screen.queryByText(favouriteLocationWeatherError)).toBeOnTheScreen();
      } else {
        if (searchLocationWeatherError)
          expect(screen.queryByText(searchLocationWeatherError)).not.toBeOnTheScreen();
        if (geolocationWeatherError)
          expect(screen.queryByText(geolocationWeatherError)).not.toBeOnTheScreen();
        if (favouriteLocationWeatherError)
          expect(screen.queryByText(favouriteLocationWeatherError)).not.toBeOnTheScreen();
      }
    },
  );
});
