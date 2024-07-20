import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SearchBarCommands, SearchBarProps } from 'react-native-screens';
import { getWeatherByCityName } from 'src/api';
import { useDeferredValue } from 'src/helpers/useDeferredValue';
import { WeatherLandingView } from './WeatherLandingView';

const MIN_CHARS = 3;

export const WeatherLanding = () => {
  const { setOptions, navigate } = useNavigation();

  const inputRef = useRef<SearchBarCommands>();

  const [inputText, setInputText] = useState('');

  const deferredSearchValue = useDeferredValue(inputText, inputText ? 1000 : 0);

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

  useEffect(() => {
    if (deferredSearchValue.length >= MIN_CHARS)
      (async () => {
        const { ok, data, problem } =
          await getWeatherByCityName(deferredSearchValue);
        console.log(ok, data, problem);
      })();
  }, [deferredSearchValue]);
  return <WeatherLandingView onPress={() => navigate('WeatherDetails')} />;
};
