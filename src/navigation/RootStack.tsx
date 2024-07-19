import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WeatherLanding } from 'src/screens/WeatherLanding';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'WeatherLanding'}
      screenOptions={{
        headerTitleAlign: 'center',
        headerTransparent: true,
        headerBackVisible: false,
        gestureEnabled: false,
        // headerTitle: HeaderLogo,
        animation: 'fade',
      }}
    >
      <Stack.Screen component={WeatherLanding} name="WeatherLanding" />
    </Stack.Navigator>
  );
};
