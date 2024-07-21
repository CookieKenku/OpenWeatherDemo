import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { skipToken, useQuery } from '@tanstack/react-query';
import { SearchBarCommands } from 'react-native-screens';
import { getWeatherByCityName, getWeatherByPosition } from 'src/api';
import { useFavouriteCity, useGeolocation } from 'src/contexts';
import { useDebouncedValue } from 'src/helpers/useDebouncedValue';
import { CurrentWeatherResponse } from 'src/api/types';
import { RootStackScreenProps } from 'src/navigation/types';
import { WeatherLandingView } from './WeatherLandingView';

const MIN_CHARS = 3;

type NavigationProps = RootStackScreenProps<'WeatherLanding'>;

export const WeatherLanding = () => {
  const inputRef = useRef<SearchBarCommands>(null);
  const { setOptions, navigate } = useNavigation<NavigationProps['navigation']>();
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
      },
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
    queryFn:
      debouncedSearchValue?.length >= MIN_CHARS
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
      isFavouriteSectionEnabled={!!favouriteCity}
      isGeolocationSectionEnabled={!!position}
      isGeolocationWeatherLoading={isGeocationWeatherLoading}
      isSearchLocationWeatherLoading={isSearchLocationWeatherLoading}
      isSearchSectionEnabled={debouncedSearchValue?.length >= MIN_CHARS}
      onCardPress={onCardPress}
      searchLocationWeather={searchLocationWeather}
      searchLocationWeatherError={searchLocationWeatherError?.message}
    />
  );
};
