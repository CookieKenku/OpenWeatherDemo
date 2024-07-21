import { useRoute } from '@react-navigation/native';
import { RootStackScreenProps } from 'src/navigation/types';
import { WeatherDetailsView } from './WeatherDetailsView';

type NavigationProps = RootStackScreenProps<'WeatherDetails'>;

export const WeatherDetails = () => {
  const { params } = useRoute<NavigationProps['route']>();

  return <WeatherDetailsView data={params.data} />;
};
