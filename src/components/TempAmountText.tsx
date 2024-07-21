import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

type TempAmountTextProps = {
  containerStyle?: StyleProp<ViewStyle>;
  fontSize?: number;
  temp: number;
};

export const TempAmountText = ({ containerStyle, fontSize = 48, temp }: TempAmountTextProps) => {
  return (
    <View style={[containerStyle, styles.container]}>
      <Text style={[{ fontSize }, styles.textStyle]}>{`${Math.round(temp)}`}</Text>
      <Text style={[{ fontSize: Math.round(fontSize / 2) }, styles.textStyle]}>{'o'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textStyle: {
    fontWeight: 'bold',
  },
});
