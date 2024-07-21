import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { skipToken, useQuery } from '@tanstack/react-query';
import { SearchBarCommands, SearchBarProps } from 'react-native-screens';
import { getWeatherByCityName, getWeatherByPosition } from 'src/api';
import { useFavouriteCity, useGeolocation } from 'src/contexts';
import { useDebouncedValue } from 'src/helpers/useDebouncedValue';
import { CurrentWeatherResponse } from 'src/api/types';
import { WeatherLandingView } from './WeatherLandingView';

const MIN_CHARS = 3;

export const WeatherLanding = () => {
  const inputRef = useRef<SearchBarCommands>();
  const { setOptions, navigate } = useNavigation();
  const { position } = useGeolocation();
  const { favouriteCity } = useFavouriteCity();

  const [inputText, setInputText] = useState('');

  const debouncedSearchValue = useDebouncedValue(inputText, inputText ? 1000 : 0);

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

  const {
    isLoading: isGeocationWeatherLoading,
    data: geolocationWeather,
    error: geolocationWeatherError,
  } = useQuery({
    queryKey: ['getWeatherByPosition', position],
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
    error: searchLocationWeatherError,
  } = useQuery({
    queryKey: ['getWeatherByCityName', debouncedSearchValue],
    queryFn: debouncedSearchValue
      ? async () => await getWeatherByCityName(debouncedSearchValue)
      : skipToken,
  });

  const {
    isLoading: isFavouriteLocationWeatherLoading,
    data: favouriteLocationWeather,
    error: favouriteLocationWeatherError,
  } = useQuery({
    queryKey: ['getWeatherByCityName', favouriteCity],
    queryFn: favouriteCity ? async () => await getWeatherByCityName(favouriteCity) : skipToken,
  });

  const onCardPress = useCallback(
    (data: CurrentWeatherResponse) => {
      inputRef.current?.blur();
      navigate('WeatherDetails', { data });
    },
    [navigate],
  );

  return (
    <WeatherLandingView
      favouriteLocationWeather={favouriteLocationWeather}
      favouriteLocationWeatherError={favouriteLocationWeatherError?.message}
      geolocationWeather={geolocationWeather}
      geolocationWeatherError={geolocationWeatherError?.message}
      isFavouriteLocationWeatherLoading={isFavouriteLocationWeatherLoading}
      isGeolocationWeatherLoading={isGeocationWeatherLoading}
      isSearchLocationWeatherLoading={isSearchLocationWeatherLoading}
      onCardPress={onCardPress}
      searchLocationWeather={searchLocationWeather}
      searchLocationWeatherError={searchLocationWeatherError?.message}
    />
  );
};
