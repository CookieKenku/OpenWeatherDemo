import { Pressable, Text, View } from 'react-native';

export const WeatherLandingView = ({ onPress }) => {
  return (
    <View style={{ flex: 1 }}>
      <Pressable onPress={onPress}>
        <Text>{'LOL'}</Text>
      </Pressable>
    </View>
  );
};
