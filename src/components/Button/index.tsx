import React from 'react';
import styled, { css } from 'styled-components';
import CircularProgress from '../CircularProgress';
import { useColor } from '@/theme/useColor';

export type TVariant = keyof typeof variantMap;

interface IVariant {
  $btnColor: string;
}

const variantMap = {
  contained: css<IVariant>`
    background: ${(props) => props.$btnColor};
    color: #fff;
  `,
  outlined: css<IVariant>`
    background: #fff;
    color: ${(props) => props.$btnColor};
    border: 1px solid ${(props) => props.$btnColor};
    &:hover {
      background: ${(props) => `${props.$btnColor}10`};
    }
  `,
  text: css<IVariant>`
    background: #fff;
    color: ${(props) => props.$btnColor};
    &:hover {
      background: ${(props) => `${props.$btnColor}10`};
    }
  `,
};
const StartIcon = styled.span`
  margin-right: 8px;
`;

const EndIcon = styled.span`
  margin-left: 8px;
`;

const StyledContent = styled.div`
  width: 100%;
`;

const disabledStyle = css`
  cursor: not-allowed;
  &:hover,
  &:active {
    opacity: 1;
  }
`;

interface IMain extends IVariant {
  $variant: TVariant;
}

const StyledMain = styled.button<IMain>`
  border: none;
  outline: none;
  min-width: 100px;
  height: 36px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: 4px;
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s, border 0.2s, opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.7;
  }
  ${(props) => variantMap[props.$variant]}
  &:disabled {
    ${disabledStyle}
  }
`;

export interface IButtonProps {
  /**
   * 內容
   */
  children?: React.ReactNode;
  /**
   * 主題配色，primary、secondary 或是自己傳入色票
   */
  themeColor?: TThemeColor;
  /**
   * 設置按鈕類型
   */
  variant?: TVariant;
  /**
   * 載入中狀態
   */
  isLoading?: boolean;
  /**
   * 禁用狀態
   */
  isDisabled?: boolean;
  /**
   * 設置按鈕左方圖示
   */
  startIcon?: React.ReactNode;
  /**
   * 設置按鈕右方圖示
   */
  endIcon?: React.ReactNode;
  /**
   * 點擊事件
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const InternalButton: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  IButtonProps & extendElement<'button'>
> = (
  {
    children,
    themeColor = 'primary',
    variant = 'contained',
    isLoading = false,
    isDisabled = false,
    startIcon,
    endIcon,
    onClick,
    ...props
  },
  ref
) => {
  const { makeColor } = useColor();
  const btnColor = makeColor({ themeColor, isDisabled });

  return (
    <StyledMain
      type="button"
      ref={ref}
      $btnColor={btnColor}
      $variant={variant}
      disabled={isDisabled}
      onClick={onClick}
      {...props}
    >
      {isLoading && <CircularProgress />}
      <StyledContent>
        {startIcon && <StartIcon>{startIcon}</StartIcon>}
        <span>{children}</span>
        {endIcon && <EndIcon>{endIcon}</EndIcon>}
      </StyledContent>
    </StyledMain>
  );
};

/**
 * `Button` 元件代表一個可點擊的按鈕，在使用者點擊之後會觸發相對應的業務邏輯。
 */
const Button = React.forwardRef(InternalButton);

export default Button;
