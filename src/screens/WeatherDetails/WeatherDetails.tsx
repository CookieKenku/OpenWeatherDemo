import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SearchBarCommands, SearchBarProps } from 'react-native-screens';
import { getWeatherByCityName } from 'src/api';
import { useDebouncedValue } from 'src/helpers/useDebouncedValue';
import { WeatherDetailsView } from './WeatherDetailsView';

const MIN_CHARS = 3;

export const WeatherDetails = () => {
  const { setOptions } = useNavigation();

  const inputRef = useRef<SearchBarCommands>();

  const [inputText, setInputText] = useState('');

  const deferredSearchValue = useDebouncedValue(
    inputText,
    inputText ? 1000 : 0,
  );

  return <WeatherDetailsView />;
};
