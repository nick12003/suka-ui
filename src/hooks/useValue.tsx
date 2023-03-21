import { useState, useEffect } from 'react';

const useValue = function <T, R = T>(
  defaultValue: T,
  outerValue?: T
): [R, (updater: T | ((origin: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    if (outerValue !== undefined) return outerValue;
    return defaultValue;
  });

  useEffect(() => {
    if (outerValue !== undefined) {
      setValue(outerValue);
    }
  }, [outerValue]);

  return [value as unknown as R, setValue];
};

export default useValue;
