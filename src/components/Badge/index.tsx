import React from 'react';
import styled, { css } from 'styled-components';
import { useColor } from '@/theme/useColor';

const makeBadgeValue: (arg: { showZero: boolean; max: number; value: number }) => {
  show: boolean;
  showValue?: string | number;
} = ({ showZero, max, value }) => {
  if (showZero && value === 0) {
    return { show: true, showValue: 0 };
  }
  if (!showZero && value === 0) {
    return { show: false };
  }
  return { show: true, showValue: value > max ? `${max}+` : value };
};

type TPlacement = keyof typeof placementStyleMap;

const placementStyleMap = {
  'top-left': css`
    top: 0px;
    left: 0px;
    transform: translate(-50%, -50%);
  `,
  'top-right': css`
    top: 0px;
    right: 0px;
    transform: translate(50%, -50%);
  `,
  'bottom-left': css`
    bottom: 0px;
    left: 0px;
    transform: translate(-50%, 50%);
  `,
  'bottom-right': css`
    bottom: 0px;
    right: 0px;
    transform: translate(50%, 50%);
  `,
};

interface IMain extends extendElement<'div'> {}

const StyledMain = styled.div<IMain>`
  display: inline-flex;
  position: relative;
`;

interface IBadge extends extendElement<'div'> {
  $color: string;
  $placement: TPlacement;
}

const StandardBadge = styled.div<IBadge>`
  display: flex;
  flex-flow: row wrap;
  place-content: center;
  align-items: center;
  position: absolute;
  box-sizing: border-box;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 500;
  font-size: 12px;
  min-width: 20px;
  padding: 0px 6px;
  height: 20px;
  border-radius: 50%;
  z-index: 1;
  transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: ${(props) => props.$color};
  color: #fff;
  ${(props) => placementStyleMap[props.$placement]}
`;

const DotBadge = styled.div<IBadge>`
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 100%;
  background-color: ${(props) => props.$color};
  ${(props) => placementStyleMap[props.$placement]}
`;

export interface IBadgeProps {
  /**
   * 數值
   */
  value: number;
  /**
   * 最大值
   */
  max?: number;
  /**
   * 主題配色，primary、secondary 或是自己傳入色票
   */
  themeColor?: TThemeColor;
  /**
   * 徽章位置
   */
  placement?: TPlacement;
  /**
   * 樣式變化模式
   */
  variant?: 'standard' | 'dot';
  /**
   * 是否呈現 0
   */
  showZero?: boolean;
  /**
   * badge的ref
   */
  badgeRef?: React.ForwardedRef<HTMLDivElement>;
  /**
   * badge區塊的prop
   */
  badgeProps?: Omit<IBadge, '$color' | '$placement'>;
  /**
   * 內容，一般為Icon
   */
  children: React.ReactNode;
}

const InternalBadge: React.ForwardRefRenderFunction<HTMLDivElement, IBadgeProps> = (
  {
    value,
    max = 99,
    themeColor = '#F85149',
    placement = 'top-right',
    variant = 'standard',
    showZero = false,
    badgeRef,
    badgeProps,
    children,
    ...props
  },
  ref
) => {
  const { makeColor } = useColor();
  const color = makeColor({ themeColor });
  const { show, showValue } = makeBadgeValue({ showZero, max, value });

  return (
    <StyledMain ref={ref} {...props}>
      {children}
      {show && (
        <>
          {variant === 'dot' && (
            <DotBadge ref={badgeRef} $color={color} $placement={placement} {...badgeProps} />
          )}
          {variant === 'standard' && (
            <StandardBadge ref={badgeRef} $color={color} $placement={placement} {...badgeProps}>
              {showValue}
            </StandardBadge>
          )}
        </>
      )}
    </StyledMain>
  );
};

/**
 * `Badge` 可以讓我們在其 children element 的右上角(預設位置)顯示一個小徽章，
 * 通常用來表示需要處理的訊息數量，透過醒目的視覺形式來吸引用戶處理。
 */
const Badge = React.forwardRef(InternalBadge);

export default Badge;
