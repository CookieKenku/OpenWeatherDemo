import { useState, useEffect } from 'react';

export const useDeferredValue = (value: string, delay: number) => {
  const [deferredValue, setDeferredValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDeferredValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return deferredValue;
};
