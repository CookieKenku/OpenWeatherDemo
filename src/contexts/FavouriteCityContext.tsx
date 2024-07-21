import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FavouriteCityContext = {
  setFavouriteCity: (name: string) => void;
  favouriteCity: string;
};

const initialState: FavouriteCityContext = {
  setFavouriteCity: () => {},
  favouriteCity: '',
};

const FavouriteCityContext = createContext<FavouriteCityContext>(initialState);

const FavouriteCityProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [favouriteCity, setFavouriteCity] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('city').then(res => setFavouriteCity(res || ''));
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('city', favouriteCity);
  }, [favouriteCity]);

  return (
    <FavouriteCityContext.Provider
      value={{
        favouriteCity,
        setFavouriteCity,
      }}
    >
      {children}
    </FavouriteCityContext.Provider>
  );
};

const useFavouriteCity = () => {
  const context = useContext(FavouriteCityContext);

  if (!context) {
    throw new Error('useFavouriteCity must be used within an FavouriteCityProvider');
  }

  return context;
};

export { FavouriteCityProvider, useFavouriteCity };
