import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron from 'reactotron-react-native';

console.tron = Reactotron.logImportant;

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: 'WeatherDemo',
  })
  .useReactNative()
  .connect();

export default reactotron;

declare global {
  interface Console {
    tron?: any;
  }
}
