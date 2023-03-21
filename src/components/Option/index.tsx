import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import { ReactComponent as CheckBoxIcon } from '@/assets/SVG/checkBox.svg';
import { ReactComponent as CheckBoxOutlineBlankIcon } from '@/assets/SVG/checkBoxOutlineBlank.svg';
import { useColor } from '@/theme/useColor';
import useValue from '@/hooks/useValue';

type TSize = keyof typeof sizeMap;

const sizeMap = {
  small: 1,
  medium: 1.25,
  large: 1.5,
};

interface IMain {
  $size: TSize;
  $btnColor: string;
  $isDisabled: boolean;
}

const StyledMain = styled.div<IMain>`
  display: inline-flex;
  align-items: center;
  cursor: ${(props) => (props.$isDisabled ? 'not-allowed' : 'pointer')};
  color: ${(props) => (props.$isDisabled ? '#dadada' : '#222222')};

  & > *:not(:first-child) {
    margin-left: 8px;
  }

  .option__checked-icon {
    color: ${(props) => props.$btnColor};
    font-size: ${(props) => sizeMap[props.$size]}rem;
  }

  .option__unchecked-icon {
    color: ${(props) => (props.$isDisabled ? '#dadada' : '#808080')};
    font-size: ${(props) => sizeMap[props.$size]}rem;
  }

  &:hover {
    .option__unchecked-icon {
      color: ${(props) => (props.$isDisabled ? '#dadada' : props.$btnColor)};
    }
  }
`;

export interface IOptionProps {
  /**
   * 開啟或關閉。若設置，則由外部參數控制；若不設置，則由內部 state 控制
   */
  isChecked?: boolean;
  /**
   * 預設狀態，如果設置了`isChecked`則此參數則無效
   */
  defaultChecked?: boolean;
  /**
   * 大小
   */
  size?: TSize;
  /**
   * 是否禁用
   */
  isDisabled?: boolean;
  /**
   * 主題配色，primary、secondary 或是自己傳入色票
   */
  themeColor?: TThemeColor;
  /**
   * 點擊事件
   */
  onChange?: (newValue: boolean) => void;
  /**
   * 被選中的圖示
   */
  checkedIcon?: React.ReactElement;
  /**
   * 未被選中的圖示
   */
  unCheckedIcon?: React.ReactElement;
  /**
   * 內容
   */
  children?: React.ReactNode;
}

const InternalOption: React.ForwardRefRenderFunction<HTMLDivElement, IOptionProps> = (
  {
    isChecked: isCheckedOuter,
    defaultChecked = false,
    size = 'medium',
    isDisabled = false,
    themeColor = 'primary',
    onChange,
    checkedIcon = <CheckBoxIcon />,
    unCheckedIcon = <CheckBoxOutlineBlankIcon />,
    children,
    ...props
  },
  ref
) => {
  const [isChecked, setIsChecked] = useValue(defaultChecked, isCheckedOuter);

  const { makeColor } = useColor();
  const btnColor = makeColor({ themeColor, isDisabled });

  const handleOnChange = () => {
    if (isDisabled) return;
    setIsChecked(!isChecked);
    if (onChange) {
      onChange(!isChecked);
    }
  };

  return (
    <StyledMain
      onClick={handleOnChange}
      $size={size}
      $isDisabled={isDisabled}
      $btnColor={btnColor}
      ref={ref}
      {...props}
    >
      {isChecked
        ? React.cloneElement(checkedIcon, {
            className: classNames(checkedIcon.props.className, 'option__checked-icon'),
          })
        : React.cloneElement(unCheckedIcon, {
            className: classNames(unCheckedIcon.props.className, 'option__unchecked-icon'),
          })}
      {!!children && <span>{children}</span>}
    </StyledMain>
  );
};

const Option =
  React.forwardRef<HTMLDivElement, IOptionProps & Omit<extendElement<'div'>, 'onChange'>>(
    InternalOption
  );

export default Option;
