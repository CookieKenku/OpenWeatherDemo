import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import Geolocation, {
  GeolocationError,
  GeolocationResponse,
} from '@react-native-community/geolocation';

type PositionData = GeolocationResponse['coords'] | null;
type GeolocationErrorData = GeolocationError | null;

type GeolocationContext = {
  getCurrentPosition: () => void;
  position: PositionData;
  geolocationError: GeolocationErrorData;
};

const initialState: GeolocationContext = {
  getCurrentPosition: () => {},
  position: null,
  geolocationError: null,
};

const GeolocationContext = createContext<GeolocationContext>(initialState);

const GeolocationProvider = ({ children }: PropsWithChildren) => {
  const [position, setPosition] = useState<PositionData>(null);
  const [geolocationError, setGeolocationError] = useState<GeolocationErrorData>(null);

  const getCurrentPosition = useCallback(() => {
    Geolocation.getCurrentPosition(
      pos => {
        setPosition(pos.coords);
      },
      error => {
        setGeolocationError(error);
      },
      { enableHighAccuracy: true },
    );
  }, []);

  useEffect(() => {
    getCurrentPosition();
  }, [getCurrentPosition]);

  return (
    <GeolocationContext.Provider
      value={{
        position,
        getCurrentPosition,
        geolocationError,
      }}
    >
      {children}
    </GeolocationContext.Provider>
  );
};

const useGeolocation = () => {
  const context = useContext(GeolocationContext);

  if (!context) {
    throw new Error('useGeolocation must be used within an GeolocationProvider');
  }

  return context;
};

export { GeolocationProvider, useGeolocation };
