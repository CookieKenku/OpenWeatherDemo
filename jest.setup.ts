import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('react-native-bootsplash', () => {
  return {
    hide: jest.fn(),
    show: jest.fn(),
  };
});

jest.mock('@react-native-community/geolocation', () => {
  return {
    addListener: jest.fn(),
    getCurrentPosition: jest.fn(),
    removeListeners: jest.fn(),
    requestAuthorization: jest.fn(),
    setConfiguration: jest.fn(),
    startObserving: jest.fn(),
    stopObserving: jest.fn(),
  };
});

jest.mock('reactotron-react-native', () => {
  return {
    setAsyncStorageHandler: () => ({
      configure: () => ({
        useReactNative: () => ({
          connect: jest.fn(),
        }),
      }),
    }),
  };
});
