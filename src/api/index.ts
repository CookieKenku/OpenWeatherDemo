import { create } from 'apisauce';

// It is better to store such things in .env
const appid = '186a98fd29a45ac5de0c8565cdb4398c';

const timeout = 20000;

const geoApi = create({
  baseURL: 'https://api.openweathermap.org/geo/1.0/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  params: {
    appid,
  },
  timeout,
});

const weatherApi = create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
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
  return weatherApi.get('weather', {
    q: cityName,
    units: 'metric',
  });
};

export const getCurrentCityName = async (
  {
    lat,
    lon,
  }: {
    lat?: string;
    lon?: string;
  } = {
    lat: '51.759048',
    lon: '19.458599',
  },
) => {
  return geoApi.get('reverse', {
    lat,
    lon,
    limit: 1,
  });
};
