import { useTheme, DefaultTheme } from 'styled-components';

interface IUseColor {
  themeColor: string;
  isDisabled?: boolean;
}

export const useColor = () => {
  const theme = useTheme();

  const makeColor = ({ themeColor, isDisabled = false }: IUseColor) => {
    const madeColor = theme.color[themeColor as keyof typeof theme.color] || themeColor;
    return isDisabled ? theme.color.disable : madeColor;
  };

  return {
    makeColor,
  };
};

export default { useColor };
