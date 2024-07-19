import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from 'src/navigation/RootStack';
import { getCurrentCityName } from 'src/api';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

function App(): React.JSX.Element {
  // useEffect(() => {
  //   (async () => {
  //     const { ok, data, problem } = await getCurrentCityName();
  //     console.log(ok, data, problem);
  //   })();
  // }, []);

  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
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
