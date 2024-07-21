import { QueryClient } from '@tanstack/react-query';
import { create } from 'apisauce';
import {
  Coordinate,
  CurrentWeatherResponse,
  DirectGeoResponse,
  ResponseError,
  Unit,
} from './types';

// It is better to store such things in .env
const appid = '186a98fd29a45ac5de0c8565cdb4398c';

const timeout = 20000;

const units: Unit = 'metric';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

const weatherApi = create({
  baseURL: 'https://api.openweathermap.org/data/2.5/weather',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  params: {
    appid,
    units,
  },
  timeout,
});

const geoApi = create({
  baseURL: 'https://api.openweathermap.org/geo/1.0',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  params: {
    appid,
  },
  timeout,
});

export const getWeatherByCityName = async (cityName: string) => {
  const { ok, data } = await weatherApi.get<CurrentWeatherResponse, ResponseError>('/', {
    q: cityName,
  });
  if (ok) return data;
  else throw new Error(`${data?.message}`);
};

const getCityByPosition = async ({ lat, lon }: Coordinate) => {
  return geoApi.get<DirectGeoResponse, ResponseError>('/reverse', {
    lat,
    lon,
    limit: 1,
  });
};

export const getWeatherByPosition = async ({ lat, lon }: Coordinate) => {
  const { ok, data } = await getCityByPosition({ lat, lon });
  if (ok) {
    return getWeatherByCityName(data?.[0].name || '');
  } else throw new Error(`${data?.message}`);
};
