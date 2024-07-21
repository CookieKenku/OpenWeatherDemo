import { ScrollView, StyleSheet } from 'react-native';
import { CurrentWeatherResponse } from 'src/api/types';
import { WeatherCardDetailed } from 'src/components';

type WeatherDetailsViewProps = {
  data?: CurrentWeatherResponse;
};

export const WeatherDetailsView = ({ data }: WeatherDetailsViewProps) => {
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <WeatherCardDetailed
        cityName={data?.name}
        feelsLike={data?.main.feels_like}
        humidity={data?.main.humidity}
        pressure={data?.main.pressure}
        temp={data?.main.temp}
        visibility={data?.visibility}
        weatherDescription={data?.weather?.[0].description}
        weatherIcon={data?.weather?.[0].icon}
        windSpeed={data?.wind.speed}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
});
