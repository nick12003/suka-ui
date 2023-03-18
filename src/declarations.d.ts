import 'styled-components';

type ThemeType = {
  primary: string;
  secondary: string;
  disable: string;
  error: string;
};

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    color: ThemeType;
  }
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare global {
  type extendElement<T extends ElementType> = React.ComponentPropsWithoutRef<T>;

  type TThemeColor = (keyof ThemeType & string) | RGB | RGBA | HEX;
}
