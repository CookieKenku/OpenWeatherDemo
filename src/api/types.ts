// Condition-Codes from https://openweathermap.org/weather-conditions
export type ThunderstormConditions =
  | 200
  | 201
  | 202
  | 210
  | 211
  | 212
  | 221
  | 230
  | 231
  | 232;
export type Conditions = 300 | 301 | 302 | 310 | 311 | 312 | 313 | 314 | 321;
export type RainConditions =
  | 500
  | 501
  | 502
  | 503
  | 504
  | 511
  | 520
  | 521
  | 522
  | 531;
export type SnowConditions =
  | 600
  | 601
  | 602
  | 611
  | 612
  | 613
  | 615
  | 616
  | 620
  | 621
  | 622;
export type AtmosphereConditions =
  | 701
  | 711
  | 721
  | 731
  | 741
  | 751
  | 761
  | 762
  | 771
  | 781;
export type ClearConditions = 800;
export type CloudsCondition = 801 | 802 | 803 | 804;
export type WeatherCondition =
  | ThunderstormConditions
  | Conditions
  | RainConditions
  | SnowConditions
  | AtmosphereConditions
  | ClearConditions
  | CloudsCondition;

export type Unit = 'imperial' | 'metric' | 'standard';

export type Time = number;

export type Coordinate = {
  lon: number;
  lat: number;
};

export type Weather = {
  id: WeatherCondition;
  main: string;
  description: string;
  icon: string;
};

export type Base = 'stations' | 'cities' | string;

export type Main = {
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
  sea_level: number;
  grnd_level: number;
};

export type Wind = {
  speed: number;
  deg: number;
  gust?: number;
};

export type Clouds = {
  all: number;
};

export type ForecastPrecipitation = {
  '3h': number;
  '1h'?: number;
};

export type CurrentWeatherSys = {
  type?: number;
  id?: number;
  message?: number;
  country: string;
  sunrise: Time;
  sunset: Time;
};

export type CurrentWeatherResponse = {
  coord: Coordinate;
  weather: Weather[];
  base: Base;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  rain?: ForecastPrecipitation;
  snow?: ForecastPrecipitation;
  dt: number;
  sys: CurrentWeatherSys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
};
