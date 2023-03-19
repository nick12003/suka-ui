import React from 'react';
import styled, { css } from 'styled-components';

type TVariant = keyof typeof variantMap;

const variantMap = {
  vertical: css`
    display: inline-flex;
    flex-direction: column;
  `,
  horizontal: css`
    display: flex;
  `,
  'horizontal-reverse': css`
    display: flex;
    flex-direction: row-reverse;
  `,
};

interface IMain {
  $variant: TVariant;
}

const StyledMain = styled.div<IMain>`
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;

  ${(props) => variantMap[props.$variant] || variantMap.vertical}
`;

const StyledCover = styled.div`
  overflow: hidden;
  width: 300px;
  img {
    width: 100%;
    display: block;
  }
`;

const StyledSpaceBetween = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export interface ICardProps {
  /**
   * 卡片封面媒體
   */
  cover?: React.ReactNode;
  /**
   * 排版變化
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

/**
 * `Card` 是一個可以顯示單個主題內容及操作的元件，通常這個主題內容包含圖片、標題、描述或是一些操作。
 */
export const InternalCard: React.ForwardRefRenderFunction<HTMLDivElement, ICardProps> = (
  { cover, variant = 'vertical', children, footer, ...props },
  ref
) => (
  <StyledMain $variant={variant} ref={ref} {...props}>
    <StyledCover>{cover}</StyledCover>
    <StyledSpaceBetween>
      {children}
      {footer}
    </StyledSpaceBetween>
  </StyledMain>
);

const Card = React.forwardRef<HTMLDivElement, ICardProps & extendElement<'div'>>(InternalCard);

export default Card;
