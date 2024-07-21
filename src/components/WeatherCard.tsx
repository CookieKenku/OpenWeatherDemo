import { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { LinearTransition } from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';
import { AnimatedPressable } from './AnimatedPressable';
import { SvgAsset } from './SvgAsset';
import { TempAmountText } from './TempAmountText';

type WeatherCardSectionProps = {
  sectionName?: string;
};

type WeatherCardProps = {
  showSkeleton?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  cityName?: string;
  weatherDescription?: string;
  weatherIcon?: string;
  feelsLike?: number;
  temp?: number;
  isFavourite?: boolean;
  onFavouritePress: (cityName: string) => void;
  onCardPress: () => void;
};

export const WeatherCardSection = ({
  sectionName,
  children,
}: PropsWithChildren<WeatherCardSectionProps>) => {
  return (
    <MotiView
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      exitTransition={{
        type: 'timing',
        duration: 150,
      }}
      from={{
        opacity: 0,
      }}
      layout={LinearTransition}
      transition={{
        type: 'timing',
        duration: 150,
      }}
    >
      {sectionName && <Text style={styles.sectionText}>{sectionName}</Text>}
      {children}
    </MotiView>
  );
};

export const WeatherCard = ({
  showSkeleton,
  containerStyle,
  cityName = '',
  weatherDescription = '',
  weatherIcon = '',
  temp = 0,
  feelsLike = 0,
  isFavourite,
  onFavouritePress,
  onCardPress,
}: WeatherCardProps) => {
  return (
    <MotiView layout={LinearTransition} style={containerStyle}>
      <Skeleton colorMode="light" show={showSkeleton}>
        <AnimatedPressable
          containerStyle={styles.container}
          onPress={onCardPress}
        >
          <View style={styles.infoTopRowContainer}>
            <AnimatedPressable
              containerStyle={styles.cityNameContainer}
              onPress={() => onFavouritePress(cityName)}
            >
              <SvgAsset
                height={32}
                name={isFavourite ? 'StarIcon' : 'StarOutlineIcon'}
                width={32}
              />
              <Text style={styles.nameText}>{cityName}</Text>
            </AnimatedPressable>
            <TempAmountText temp={temp} />
          </View>
          <View style={styles.infoBottomRowContainer}>
            <View style={styles.conditionContainer}>
              <FastImage
                source={{
                  uri: `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`,
                }}
                style={styles.image}
              />
              <Text style={styles.weatherDescriptionText}>
                {weatherDescription}
              </Text>
            </View>
            <View style={styles.conditionContainer}>
              <Text style={styles.weatherDescriptionText}>
                {'Feels like: '}
              </Text>
              <TempAmountText
                fontSize={styles.weatherDescriptionText.fontSize}
                temp={feelsLike}
              />
            </View>
          </View>
        </AnimatedPressable>
      </Skeleton>
    </MotiView>
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
    elevation: 3,
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
  sectionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
