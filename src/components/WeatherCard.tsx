import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { LinearTransition } from 'react-native-reanimated';
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';

type WeatherCardProps = {
  showSkeleton?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};
export const WeatherCard = ({
  showSkeleton,
  containerStyle,
}: WeatherCardProps) => {
  return (
    // <View style={[containerStyle, styles.container]}>
    <MotiView
      // animate={{
      //   backgroundColor: showSkeleton ? '#000000' : '#ffffff',
      // }}

      layout={LinearTransition}
      style={{ backgroundColor: 'blue', overflow: 'hidden' }}
      // transition={{
      //   type: 'timing',
      // }}
    >
      {showSkeleton ? (
        <Skeleton
          colorMode="light"
          height={50}
          // show={showSkeleton}
          width={'100%'}
        />
      ) : (
        <View style={{ height: 150, width: 100, backgroundColor: 'red' }} />
      )}
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
});
