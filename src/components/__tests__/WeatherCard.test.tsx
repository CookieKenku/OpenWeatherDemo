import { fireEvent, render, screen } from '@testing-library/react-native';
import { WeatherCard } from '../WeatherCard';

describe('WeatherCard', () => {
  it.each([
    [undefined, 'Sunny', 200, -100, '', 'Sunny', '200°', '-100°'],
    ['Warsaw', undefined, -100, 200, 'Warsaw', '', '-100°', '200°'],
    ['Warsaw', 'Sunny', undefined, -100.1, 'Warsaw', 'Sunny', '-°', '-100°'],
    ['Warsaw', 'Sunny', 199.6, undefined, 'Warsaw', 'Sunny', '200°', '-°'],
  ] as const)(
    'renders correctly with cityName=%s weatherDescription=%s temp=%s feelsLike=%s',
    (
      city,
      description,
      temp,
      feelsLike,
      cityExpected,
      descriptionExpected,
      tempExpected,
      feelsLikeExpected,
    ) => {
      render(
        <WeatherCard
          cityName={city}
          feelsLike={feelsLike}
          temp={temp}
          weatherDescription={description}
        />,
      );

      expect(screen.getByTestId('city-name')).toHaveTextContent(cityExpected);
      expect(screen.getByText(descriptionExpected)).toBeOnTheScreen();
      expect(screen.getByText(tempExpected)).toBeOnTheScreen();
      expect(screen.getByText(feelsLikeExpected, { exact: false })).toBeOnTheScreen();
    },
  );

  it('handles favourite press correctly', () => {
    const mockOnFavouritePress = jest.fn();

    render(<WeatherCard cityName="Warsaw" onFavouritePress={mockOnFavouritePress} />);

    fireEvent.press(screen.getByText('Warsaw'));

    expect(mockOnFavouritePress).toHaveBeenCalledWith('Warsaw');
  });
});
