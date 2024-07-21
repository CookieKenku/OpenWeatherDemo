import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { skipToken, useQuery } from '@tanstack/react-query';
import { SearchBarCommands, SearchBarProps } from 'react-native-screens';
import { getWeatherByCityName, getWeatherByPosition } from 'src/api';
import { useDebouncedValue } from 'src/helpers/useDebouncedValue';
import { useFavouriteCity } from 'src/helpers/useFavouriteCity';
import { useGeolocation } from 'src/components';
import { WeatherLandingView } from './WeatherLandingView';

const MIN_CHARS = 3;

export const WeatherLanding = () => {
  const inputRef = useRef<SearchBarCommands>();
  const { setOptions, navigate } = useNavigation();
  const { position } = useGeolocation();
  const { favouriteCity, setFavouriteCity } = useFavouriteCity();

  const [inputText, setInputText] = useState('');

  const deferredSearchValue = useDebouncedValue(
    inputText,
    inputText ? 1000 : 0,
  );

  useLayoutEffect(() => {
    setOptions({
      headerSearchBarOptions: {
        ref: inputRef,
        hideNavigationBar: false,
        hideWhenScrolling: false,
        placeholder: `Search city (min ${MIN_CHARS} chars)`,
        onSearchButtonPress: () => {
          inputRef.current?.blur();
        },
        onChangeText: e => {
          setInputText(e.nativeEvent.text);
        },
      } as SearchBarProps,
    });
  }, [setOptions]);

  const { isLoading: isGeocationWeatherLoading, data: geolocationWeather } =
    useQuery({
      queryKey: ['geolocationWeather', position],
      queryFn: position
        ? async () =>
            await getWeatherByPosition({
              lat: position.latitude,
              lon: position.longitude,
            })
        : skipToken,
    });

  const {
    isLoading: isSearchLocationWeatherLoading,
    data: searchLocationWeather,
  } = useQuery({
    queryKey: ['searchLocationWeather', deferredSearchValue],
    queryFn: deferredSearchValue
      ? async () => await getWeatherByCityName(deferredSearchValue)
      : skipToken,
  });

  const {
    isLoading: isFavouriteLocationWeatherLoading,
    data: favouriteLocationWeather,
  } = useQuery({
    queryKey: ['favouriteLocationWeather', favouriteCity],
    queryFn: favouriteCity
      ? async () => await getWeatherByCityName(favouriteCity)
      : skipToken,
  });

  // const geolocationWeatherMock: Partial<CurrentWeatherResponse> = {
  //   name: 'Warsaw',
  //   weather: [
  //     {
  //       description: 'few clouds',
  //       icon: '02d',
  //     },
  //   ],
  //   main: {
  //     temp: 29.89,
  //     feels_like: 28.29,
  //   },
  // };

  const onFavouritePress = useCallback(
    (cityName: string) => {
      if (favouriteCity === cityName) setFavouriteCity('');
      else setFavouriteCity(cityName);
    },
    [favouriteCity, setFavouriteCity],
  );

  const onCardPress = useCallback(() => {
    navigate('WeatherDetails');
  }, [navigate]);

  return (
    <WeatherLandingView
      favouriteCity={favouriteCity}
      favouriteLocationWeather={favouriteLocationWeather}
      geolocationWeather={geolocationWeather}
      isFavouriteLocationWeatherLoading={isFavouriteLocationWeatherLoading}
      isGeolocationWeatherLoading={isGeocationWeatherLoading}
      isSearchLocationWeatherLoading={isSearchLocationWeatherLoading}
      onCardPress={onCardPress}
      onFavouritePress={onFavouritePress}
      searchLocationWeather={searchLocationWeather}
    />
  );
};
