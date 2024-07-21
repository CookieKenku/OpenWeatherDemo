import { useCallback } from 'react';
import { StyleSheet, Text } from 'react-native';
import { LinearTransition } from 'react-native-reanimated';
import { MotiView } from 'moti';
import { useFavouriteCity } from 'src/contexts';
import { Skeleton } from 'moti/skeleton';
import { CurrentWeatherResponse } from 'src/api/types';
import { WeatherCard } from './WeatherCard';

type WeatherCardSectionProps = {
  sectionName?: string;
  data?: CurrentWeatherResponse;
  onCardPress: (data: CurrentWeatherResponse) => void;
  isLoading: boolean;
  errorMessage?: string;
};

export const WeatherCardSection = ({
  sectionName,
  data,
  isLoading,
  errorMessage,
  onCardPress,
}: WeatherCardSectionProps) => {
  const { favouriteCity, setFavouriteCity } = useFavouriteCity();

  const onFavouritePress = useCallback(
    (cityName: string) => {
      setFavouriteCity(favouriteCity === cityName ? '' : cityName);
    },
    [favouriteCity, setFavouriteCity],
  );

  const onWeatherCardPress = useCallback(() => {
    if (data) onCardPress(data);
  }, [data, onCardPress]);

  return (
    <MotiView
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      exitTransition={{
        type: 'timing',
        duration: 150,
      }}
      from={{
        opacity: 0,
      }}
      layout={LinearTransition}
      transition={{
        type: 'timing',
        duration: 150,
      }}
    >
      {sectionName && <Text style={styles.sectionText}>{sectionName}</Text>}
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : (
        <Skeleton colorMode="light" show={isLoading}>
          <WeatherCard
            cityName={data?.name}
            feelsLike={data?.main.feels_like}
            isFavourite={favouriteCity === data?.name}
            onCardPress={onWeatherCardPress}
            onFavouritePress={onFavouritePress}
            temp={data?.main.temp}
            weatherDescription={data?.weather?.[0].description}
            weatherIcon={data?.weather?.[0].icon}
          />
        </Skeleton>
      )}
    </MotiView>
  );
};

const styles = StyleSheet.create({
  errorText: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
  },
  sectionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
