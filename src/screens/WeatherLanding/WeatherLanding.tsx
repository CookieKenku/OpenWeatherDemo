import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { skipToken, useQuery } from '@tanstack/react-query';
import { SearchBarCommands, SearchBarProps } from 'react-native-screens';
import { getWeatherByCityName, getWeatherByPosition } from 'src/api';
import { useDebouncedValue } from 'src/helpers/useDebouncedValue';
import { CurrentWeatherResponse } from 'src/api/types';
import { useGeolocation } from 'src/components';
import { WeatherLandingView } from './WeatherLandingView';

const MIN_CHARS = 3;

export const WeatherLanding = () => {
  const inputRef = useRef<SearchBarCommands>();
  const { setOptions, navigate } = useNavigation();
  const { position } = useGeolocation();

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

  // const { isLoading: isGeocationWeatherLoading, data: geolocationWeather } =
  //   useQuery({
  //     queryKey: ['geolocationWeather', position],
  //     queryFn: position
  //       ? async () =>
  //           await getWeatherByPosition({
  //             lat: position.latitude,
  //             lon: position.longitude,
  //           })
  //       : skipToken,
  //   });

  const {
    isLoading: issearchLocationWeatherLoading,
    data: searchLocationWeather,
  } = useQuery({
    queryKey: ['searchLocationWeather', deferredSearchValue],
    queryFn: deferredSearchValue
      ? async () => await getWeatherByCityName(deferredSearchValue)
      : skipToken,
  });

  // useEffect(() => {
  //   console.tron(geolocationWeather);
  // }, [geolocationWeather]);

  useEffect(() => {
    console.tron(searchLocationWeather);
  }, [searchLocationWeather]);
  // useEffect(() => {
  //   if (deferredSearchValue.length >= MIN_CHARS)
  //     (async () => {
  //       const { ok, data, problem } =
  //         await getWeatherByCityName(deferredSearchValue);
  //       console.tron(ok, data, problem);
  //     })();
  // }, [deferredSearchValue]);

  const geolocationWeatherMock: Partial<CurrentWeatherResponse> = {
    name: 'Warsaw',
    weather: [
      {
        description: 'few clouds',
        icon: '02d',
      },
    ],
    main: {
      temp: 29.89,
      feels_like: 28.29,
    },
  };

  return (
    <WeatherLandingView
      geolocationWeather={geolocationWeatherMock}
      isGeolocationWeatherLoading={false}
      isSearchLocationWeatherLoading={issearchLocationWeatherLoading}
      onLocationPress={() => {}}
      searchLocationWeather={searchLocationWeather}
    />
  );
};
