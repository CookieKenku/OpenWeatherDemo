import WeatherIcon from './weather-icon.svg';
import StarOutlineIcon from './star-outline.svg';
import StarIcon from './star.svg';

export const Svgs = {
  WeatherIcon,
  StarOutlineIcon,
  StarIcon,
};

export type SvgName = keyof typeof Svgs;
