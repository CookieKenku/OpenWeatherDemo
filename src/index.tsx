import { useCallback } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BootSplash from 'react-native-bootsplash';
import { RootStack } from 'src/navigation/RootStack';
import { GeolocationProvider } from './components';
import { queryClient } from './api';

if (__DEV__) {
  require('./reactotron.config');
}

function App(): React.JSX.Element {
  const onNavigatorReady = useCallback(() => {
    BootSplash.hide({ fade: true });
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
        translucent
      />
      <QueryClientProvider client={queryClient}>
        <GeolocationProvider>
          <NavigationContainer onReady={onNavigatorReady}>
            <RootStack />
          </NavigationContainer>
        </GeolocationProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
