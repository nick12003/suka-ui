import { createContext } from 'react';

export type TValue = string | number | null;
export type TOnChange = (value: TValue) => void;
interface IState {
  value: TValue;
  onChange: TOnChange;
}

export const RadioContext = createContext<IState | null>(null);

RadioContext.displayName = 'RadioContext';

export const RadioProvider = RadioContext.Provider;
