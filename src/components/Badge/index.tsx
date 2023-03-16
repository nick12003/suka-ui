import React from 'react';
import styled, { css } from 'styled-components';
import { useColor } from '@/theme/useColor';

type TPlacement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
interface IStandardBadgeProps {
  $color: string;
  $placement: TPlacement;
}
interface IDotBadgeProps {
  $color: string;
  $placement: TPlacement;
}

export interface IBadgeProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * 內容
   */
  children: React.ReactNode;
  /**
   * 展示內容
   */
  value: number;
  /**
   * 最大顯示值
   */
  max?: number;
  /**
   * 主題配色，primary、secondary 或是自己傳入色票
   */
  themeColor?: string;
  /**
   * 徽章位置
   */
  placement?: TPlacement;
  /**
   * 變化模式
   */
  variant?: 'standard' | 'dot';
  /**
   * 是否呈現 0
   */
  showZero?: boolean;
}

const makeBadgeValue = ({
  showZero,
  max,
  value,
}: {
  showZero: boolean;
  max: number;
  value: number;
}) => {
  if (showZero && value === 0) {
    return '0';
  }
  if (!showZero && value === 0) {
    return null;
  }
  return value > max ? `${max}+` : value;
};

const topLeftStyle = css`
  top: 0px;
  left: 0px;
  transform: translate(-50%, -50%);
`;

const topRightStyle = css`
  top: 0px;
  right: 0px;
  transform: translate(50%, -50%);
`;

const bottomLeftStyle = css`
  bottom: 0px;
  left: 0px;
  transform: translate(-50%, 50%);
`;

const bottomRightStyle = css`
  bottom: 0px;
  right: 0px;
  transform: translate(50%, 50%);
`;

const placementStyleMap = {
  'top-left': topLeftStyle,
  'top-right': topRightStyle,
  'bottom-left': bottomLeftStyle,
  'bottom-right': bottomRightStyle,
};

const BadgeWrapper = styled.div`
  display: inline-flex;
  position: relative;
`;

const StandardBadge = styled.div<IStandardBadgeProps>`
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
  border-radius: 10px;
  z-index: 1;
  transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: ${(props) => props.$color};
  color: #fff;
  ${(props) => placementStyleMap[props.$placement] || topRightStyle}
`;

const DotBadge = styled.div<IDotBadgeProps>`
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 100%;
  background-color: ${(props) => props.$color};
  ${(props) => placementStyleMap[props.$placement] || topRightStyle}
`;

/**
 * `Badge` 可以讓我們在其 children element 的右上角(預設位置)顯示一個小徽章，
 * 通常用來表示需要處理的訊息數量，透過醒目的視覺形式來吸引用戶處理。
 */
const InternalBadge: React.ForwardRefRenderFunction<HTMLDivElement, IBadgeProps> = (
  {
    children,
    themeColor = '#F85149',
    value,
    placement = 'top-right',
    max = 99,
    variant = 'standard',
    showZero = false,
    ...props
  },
  ref
) => {
  const { makeColor } = useColor();
  const color = makeColor({ themeColor });
  const content = makeBadgeValue({ showZero, max, value });

  return (
    <BadgeWrapper>
      {children}
      {variant === 'dot' && <DotBadge ref={ref} $color={color} $placement={placement} {...props} />}
      {variant === 'standard' && content && (
        <StandardBadge ref={ref} $color={color} $placement={placement} {...props}>
          {content}
        </StandardBadge>
      )}
    </BadgeWrapper>
  );
};

const Badge = React.forwardRef(InternalBadge);

export default Badge;
