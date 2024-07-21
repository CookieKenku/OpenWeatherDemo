import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { formatTempValue } from 'src/helpers/formatTempValue';
import { AnimatedPressable } from './AnimatedPressable';
import { SvgAsset } from './SvgAsset';

type WeatherCardProps = Partial<{
  cityName: string;
  weatherDescription: string;
  weatherIcon: string;
  feelsLike: number;
  temp: number;
  isFavourite: boolean;
  onFavouritePress: (cityName: string) => void;
  onCardPress: () => void;
}>;

export const WeatherCard = ({
  cityName = '',
  weatherDescription = '',
  weatherIcon,
  temp,
  feelsLike,
  isFavourite,
  onFavouritePress = () => {},
  onCardPress = () => {},
}: WeatherCardProps) => {
  return (
    <AnimatedPressable containerStyle={styles.container} onPress={onCardPress}>
      <View style={styles.infoTopRowContainer}>
        <AnimatedPressable
          containerStyle={styles.cityNameContainer}
          onPress={() => onFavouritePress(cityName)}
        >
          <SvgAsset height={32} name={isFavourite ? 'StarIcon' : 'StarOutlineIcon'} width={32} />
          <Text style={styles.nameText} testID="city-name">
            {cityName}
          </Text>
        </AnimatedPressable>
        <Text style={styles.tempText}>{formatTempValue(temp)}</Text>
      </View>
      <View style={styles.infoBottomRowContainer}>
        <View style={styles.conditionContainer}>
          {weatherIcon && (
            <FastImage
              source={{
                uri: `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`,
              }}
              style={styles.image}
            />
          )}
          <Text style={styles.weatherDescriptionText}>{weatherDescription}</Text>
        </View>
        <Text style={styles.weatherDescriptionText}>
          {`Feels like: ${formatTempValue(feelsLike)}`}
        </Text>
      </View>
    </AnimatedPressable>
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
  infoTopRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  infoBottomRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cityNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    marginRight: 8,
  },
  conditionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#000',
    marginLeft: 8,
    flexShrink: 1,
  },
  weatherDescriptionText: {
    fontSize: 16,
    color: '#000',
  },
  image: {
    height: 48,
    width: 48,
    borderRadius: 48,
  },
  tempText: {
    fontSize: 48,
    color: '#000',
    fontWeight: 'bold',
  },
});
