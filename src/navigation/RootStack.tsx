import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WeatherLanding } from 'src/screens/WeatherLanding';
import { WeatherDetails } from 'src/screens/WeatherDetails';
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
        headerBackTitleVisible: false,
        headerTitle: HeaderLogo,
      }}
    >
      <Stack.Screen component={WeatherLanding} name="WeatherLanding" />
      <Stack.Screen component={WeatherDetails} name="WeatherDetails" />
    </Stack.Navigator>
  );
};
