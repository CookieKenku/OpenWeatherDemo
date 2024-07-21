import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { formatTempValue } from 'src/helpers/formatTempValue';

type WeatherCardDetailedProps = Partial<{
  cityName: string;
  temp: number;
  weatherDescription: string;
  weatherIcon: string;
  feelsLike: number;
  windSpeed: number;
  pressure: number;
  humidity: number;
  visibility: number;
}>;

export const WeatherCardDetailed = ({
  cityName = '',
  weatherDescription = '',
  temp,
  weatherIcon,
  feelsLike,
  windSpeed,
  pressure,
  humidity,
  visibility,
}: WeatherCardDetailedProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{cityName}</Text>
        <View style={styles.rowContainer}>
          <Text style={styles.tempText}>{formatTempValue(temp)}</Text>
          {weatherIcon && (
            <FastImage
              source={{
                uri: `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`,
              }}
              style={styles.image}
            />
          )}
        </View>
        <Text style={styles.descriptionText}>{weatherDescription}</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.descriptionItemsContainer}>
        <View style={styles.rowItemContainer}>
          <Text style={styles.rowTitleText}>{'Feels like'}</Text>
          <Text style={styles.rowValueText}>{formatTempValue(feelsLike)}</Text>
        </View>
        <View style={styles.rowItemContainer}>
          <Text style={styles.rowTitleText}>{'Wind speed'}</Text>
          <Text style={styles.rowValueText}>{`${windSpeed ?? '-'} m/s`}</Text>
        </View>
        <View style={styles.rowItemContainer}>
          <Text style={styles.rowTitleText}>{'Pressure'}</Text>
          <Text style={styles.rowValueText}>{`${pressure ?? '-'} hPa`}</Text>
        </View>
        <View style={styles.rowItemContainer}>
          <Text style={styles.rowTitleText}>{'Humidity'}</Text>
          <Text style={styles.rowValueText}>{`${humidity ?? '-'}%`}</Text>
        </View>
        <View style={styles.rowItemContainer}>
          <Text style={styles.rowTitleText}>{'Visibility'}</Text>
          <Text style={styles.rowValueText}>
            {`${visibility || visibility === 0 ? visibility / 1000 : '-'} km`}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FFF',
    shadowColor: '#212121',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  titleContainer: {
    alignItems: 'center',
    rowGap: 16,
  },
  titleText: {
    fontSize: 36,
    color: '#000',
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 24,
    color: '#000',
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 80,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    backgroundColor: '#E0E0E0',
    height: 3,
    marginVertical: 16,
  },
  tempText: {
    fontSize: 64,
    color: '#000',
    fontWeight: 'bold',
  },
  rowItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowTitleText: {
    fontSize: 24,
    color: '#000',
  },
  rowValueText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  descriptionItemsContainer: {
    rowGap: 8,
  },
});
