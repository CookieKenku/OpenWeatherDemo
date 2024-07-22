import { render, screen } from '@testing-library/react-native';
import { WeatherLandingView } from '../WeatherLandingView';

describe('WeatherLandingView', () => {
  it('renders enabled sections correctly', () => {
    render(
      <WeatherLandingView
        isFavouriteLocationWeatherLoading
        isFavouriteSectionEnabled={false}
        isGeolocationSectionEnabled
        isGeolocationWeatherLoading
        isSearchLocationWeatherLoading
        isSearchSectionEnabled={false}
        onCardPress={jest.fn()}
      />,
    );

    expect(screen.queryByText('Search Location')).not.toBeOnTheScreen();
    expect(screen.getByText('My Location')).toBeOnTheScreen();
    expect(screen.queryByText('Favourite Location')).not.toBeOnTheScreen();
  });

  it('renders errors in sections correctly', () => {
    render(
      <WeatherLandingView
        favouriteLocationWeatherError={'Fav Error'}
        geolocationWeatherError={'Geo Error'}
        isFavouriteLocationWeatherLoading
        isFavouriteSectionEnabled={false}
        isGeolocationSectionEnabled
        isGeolocationWeatherLoading
        isSearchLocationWeatherLoading
        isSearchSectionEnabled
        onCardPress={jest.fn()}
        searchLocationWeatherError={'Search Error'}
      />,
    );

    expect(screen.getByText('Search Error')).toBeOnTheScreen();
    expect(screen.getByText('Geo Error')).toBeOnTheScreen();
    expect(screen.queryByText('Fav Error')).not.toBeOnTheScreen();
  });
});
