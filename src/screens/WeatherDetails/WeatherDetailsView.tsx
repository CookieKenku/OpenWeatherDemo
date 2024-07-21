import { StyleSheet, Text, View } from 'react-native';
import { CurrentWeatherResponse } from 'src/api/types';

type WeatherDetailsViewProps = {
  data?: CurrentWeatherResponse;
};

export const WeatherDetailsView = ({ data }: WeatherDetailsViewProps) => {
  console.tron(data);
  return (
    <View style={{ flex: 1 }}>
      <Text>{'LOL'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    rowGap: 24,
  },
});
