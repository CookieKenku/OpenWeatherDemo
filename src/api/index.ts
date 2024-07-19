import { create } from 'apisauce';

const geoApi = create({
  baseURL: 'https://api.openweathermap.org/geo/1.0/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  params: {
    appid: '186a98fd29a45ac5de0c8565cdb4398c',
  },
  timeout: 20000,
});

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
