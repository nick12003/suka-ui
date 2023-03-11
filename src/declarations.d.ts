import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      primary: string;
      secondary: string;
      disable: string;
      error: string;
    };
  }
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}
