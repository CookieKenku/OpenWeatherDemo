import { fireEvent, render, screen } from '@testing-library/react-native';
import { WeatherCard } from '../WeatherCard';

describe('WeatherCard', () => {
  it.each([
    ['Warsaw', 20, 30, 'Sunny', 'Warsaw', '20°', '30°', 'Sunny'],
    [undefined, 20, 30, 'Sunny', '', '20°', '30°', 'Sunny'],
    ['Warsaw', undefined, 30, 'Sunny', 'Warsaw', '-', '30°', 'Sunny'],
  ] as const)(
    'renders correctly with city=%s feelsLike=%s',
    (city, feelsLike, temp, desc, cityOutput, feelLikeOutput, tempOutput, descOutput) => {
      render(
        <WeatherCard cityName={city} feelsLike={feelsLike} temp={temp} weatherDescription={desc} />,
      );

      expect(screen.getByTestId('city-name')).toHaveTextContent(cityOutput);
      expect(screen.getByText(feelLikeOutput)).toBeOnTheScreen();
      expect(screen.getByText(tempOutput)).toBeOnTheScreen();
      expect(screen.getByText(descOutput)).toBeOnTheScreen();
    },
  );

  it('handles favourite press correctly', () => {
    const mockOnFavouritePress = jest.fn();

    render(<WeatherCard cityName="Warsaw" onFavouritePress={mockOnFavouritePress} />);

    fireEvent.press(screen.getByText('Warsaw'));

    expect(mockOnFavouritePress).toHaveBeenCalledWith('Warsaw');
  });
});
