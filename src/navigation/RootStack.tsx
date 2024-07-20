import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WeatherLanding } from 'src/screens/WeatherLanding';
import { HeaderLogo } from 'src/components';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'WeatherLanding'}
      screenOptions={{
        headerTitleAlign: 'center',
        headerTransparent: false,
        // headerBackVisible: false,
        // gestureEnabled: false,
        headerTitle: HeaderLogo,
        // animation: 'slide_from_left',
      }}
    >
      <Stack.Screen component={WeatherLanding} name="WeatherLanding" />
    </Stack.Navigator>
  );
};
