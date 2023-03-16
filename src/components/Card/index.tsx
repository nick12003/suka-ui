import React from 'react';
import styled, { css } from 'styled-components';

type TVariant = 'vertical' | 'horizontal' | 'horizontal-reverse';

interface IStyledCardProps {
  $variant: TVariant;
}

export interface ICardProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * 卡片封面媒體
   */
  cover?: React.ReactNode;
  /**
   * 變化模式
   */
  variant?: TVariant;
  /**
   * 內容
   */
  children: React.ReactNode;
  /**
   * 卡片置底頁尾
   */
  footer?: React.ReactNode;
}

const verticalStyle = css`
  display: inline-flex;
  flex-direction: column;
`;

const horizontalStyle = css`
  display: flex;
`;

const horizontalReverseStyle = css`
  display: flex;
  flex-direction: row-reverse;
`;

const variantMap = {
  vertical: verticalStyle,
  horizontal: horizontalStyle,
  'horizontal-reverse': horizontalReverseStyle,
};

const StyledCard = styled.div<IStyledCardProps>`
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;

  ${(props) => variantMap[props.$variant] || variantMap.vertical}
`;

const Cover = styled.div`
  overflow: hidden;
  width: 300px;
  img {
    width: 100%;
    display: block;
  }
`;

const SpaceBetween = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InternalCard: React.ForwardRefRenderFunction<HTMLDivElement, ICardProps> = ({
  cover,
  variant = 'vertical',
  children,
  footer,
  ...props
}) => (
  <StyledCard $variant={variant} {...props}>
    <Cover>{cover}</Cover>
    <SpaceBetween>
      {children}
      {footer}
    </SpaceBetween>
  </StyledCard>
);

/**
 * `Card` 是一個可以顯示單個主題內容及操作的元件，通常這個主題內容包含圖片、標題、描述或是一些操作。
 */
const Card = React.forwardRef(InternalCard);

export default Card;
