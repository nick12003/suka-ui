import styled, { css } from 'styled-components';

type IVariant = 'vertical' | 'horizontal' | 'horizontal-reverse';

interface ICustomer {
  $variant: IVariant;
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

const StyledCard = styled.div<ICustomer>`
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

export type ICardProps = React.ComponentPropsWithoutRef<'div'> & {
  /**
   * 客製化樣式
   */
  className?: string;
  /**
   * 卡片封面媒體
   */
  cover?: React.ReactNode;
  /**
   * 變化模式
   */
  variant?: IVariant;
  /**
   * 內容
   */
  children: React.ReactNode;
  /**
   * 卡片置底頁尾
   */
  footer?: React.ReactNode;
};

/**
 * `Card` 是一個可以顯示單個主題內容及操作的元件，通常這個主題內容包含圖片、標題、描述或是一些操作。
 */
const Card = ({
  className,
  cover,
  variant = 'vertical',
  children,
  footer,
  ...props
}: ICardProps) => (
  <StyledCard className={className} $variant={variant} {...props}>
    <Cover>{cover}</Cover>
    <SpaceBetween>
      {children}
      {footer}
    </SpaceBetween>
  </StyledCard>
);

export default Card;
