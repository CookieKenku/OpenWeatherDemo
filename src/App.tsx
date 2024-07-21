import { useCallback } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BootSplash from 'react-native-bootsplash';
import { RootStack } from 'src/navigation/RootStack';
import { GeolocationProvider, FavouriteCityProvider } from './contexts';
import { queryClient } from './api';

if (__DEV__) {
  require('./reactotron.config');
}

const App = () => {
  const onNavigatorReady = useCallback(() => {
    BootSplash.hide({ fade: true });
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} translucent />
      <QueryClientProvider client={queryClient}>
        <GeolocationProvider>
          <FavouriteCityProvider>
            <NavigationContainer onReady={onNavigatorReady}>
              <RootStack />
            </NavigationContainer>
          </FavouriteCityProvider>
        </GeolocationProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;
