import React from 'react';
import styled, { css } from 'styled-components';
import classNames from 'classnames';

import { ReactComponent as Cancel } from '@/assets/cancel.svg';
import { useColor } from '@/theme/useColor';

type TVariant = 'contained' | 'outlined';
interface IVariantProps {
  $color: string;
}

interface IStyledChipProps {
  $color: string;
  $variant: TVariant;
  $hasDelete: boolean;
}

export interface IChipProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * 設置變化模式
   */
  variant?: TVariant;
  /**
   * 內容
   */
  label: React.ReactNode;
  /**
   * 主題配色，primary、secondary 或是自己傳入色票
   */
  themeColor?: string;
  /**
   * 圖示
   */
  icon?: React.ReactElement;
  /**
   * 刪除圖示
   */
  deleteIcon?: React.ReactElement;
  /**
   * 刪除事件
   */
  onDelete?: React.MouseEventHandler<HTMLOrSVGElement>;
}

const containedStyle = css<IVariantProps>`
  background: ${(props) => props.$color};
  color: #fff;
`;

const outlinedStyle = css<IVariantProps>`
  background: #fff;
  color: ${(props) => props.$color};
`;

const variantMap = {
  contained: containedStyle,
  outlined: outlinedStyle,
};

const StyledChip = styled.div<IStyledChipProps>`
  display: inline-flex;
  align-items: center;
  border-radius: 50px;
  height: 32px;
  border: 1px solid ${(props) => props.$color};
  ${(props) => variantMap[props.$variant] || variantMap.contained}

  .chip__start-icon {
    margin-left: 4px;
    margin-right: -6px;
  }

  .chip__end-icon {
    margin-right: 4px;
    margin-left: -6px;
    ${(props) => (props.$hasDelete ? 'cursor: pointer;' : null)}

    &:hover {
      ${(props) => (props.$hasDelete ? 'opacity: 0.8;' : null)}
    }
  }
`;

const Label = styled.span`
  padding: 0px 12px;
`;

const InternalChip: React.ForwardRefRenderFunction<HTMLDivElement, IChipProps> = (
  { variant = 'contained', label, themeColor = 'primary', icon, deleteIcon, onDelete, ...props },
  ref
) => {
  const { makeColor } = useColor();
  const color = makeColor({ themeColor });
  const endIcon = deleteIcon || <Cancel />;
  return (
    <StyledChip ref={ref} $variant={variant} $color={color} $hasDelete={!!onDelete} {...props}>
      {icon &&
        React.cloneElement(icon, {
          className: classNames(icon.props.className, 'chip__start-icon'),
        })}
      <Label>{label}</Label>
      {(deleteIcon || onDelete) &&
        React.cloneElement(endIcon, {
          className: 'chip__end-icon',
          onClick: onDelete,
        })}
    </StyledChip>
  );
};

/**
 * `Chip` 元件用於標記事物的屬性、標籤或用於分類、篩選。
 */
const Chip = React.forwardRef(InternalChip);

export default Chip;
