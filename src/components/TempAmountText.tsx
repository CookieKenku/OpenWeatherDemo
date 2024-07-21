import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

type TempAmountTextProps = {
  containerStyle?: StyleProp<ViewStyle>;
  fontSize?: number;
  temp?: number;
};

export const TempAmountText = ({ containerStyle, fontSize = 48, temp }: TempAmountTextProps) => {
  const tempString = temp || temp === 0 ? `${Math.round(temp)}` : '-';

  return (
    <View style={[containerStyle, styles.container]}>
      <Text style={[{ fontSize }, styles.textStyle]}>{tempString}</Text>
      <Text style={[{ fontSize: Math.round(fontSize / 2) }, styles.textStyle]}>{'o'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  textStyle: {
    fontWeight: 'bold',
  },
});
