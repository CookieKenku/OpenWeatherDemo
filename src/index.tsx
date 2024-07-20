import { useCallback } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BootSplash from 'react-native-bootsplash';
import { RootStack } from 'src/navigation/RootStack';
import { GeolocationProvider } from './components';
// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

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
      <GeolocationProvider>
        <NavigationContainer onReady={onNavigatorReady}>
          <RootStack />
        </NavigationContainer>
      </GeolocationProvider>
    </SafeAreaProvider>
  );
}

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
