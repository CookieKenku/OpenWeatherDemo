import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useFavouriteCity = () => {
  const [favouriteCity, setFavouriteCity] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('city').then(res => setFavouriteCity(res || ''));
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('city', favouriteCity);
  }, [favouriteCity]);

  return { favouriteCity, setFavouriteCity };
};
