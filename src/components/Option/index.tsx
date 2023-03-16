import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import CheckBoxIcon from '@/assets/CheckBox.svg';
import CheckBoxOutlineBlankIcon from '@/assets/CheckBoxOutlineBlank.svg';
import { useColor } from '@/theme/useColor';

const DISABLED_COLOR = '#dadada';

interface IStyledOptionProps {
  $btnColor: string;
  $isDisabled: boolean;
}

export interface IOptionProps {
  /**
   * 開啟或關閉
   */
  isChecked?: boolean;
  /**
   * 是否禁用
   */
  isDisabled?: boolean;
  /**
   * 主題配色，primary、secondary 或是自己傳入色票
   */
  themeColor?: string;
  /**
   * 點擊事件
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
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

const StyledOption = styled.div<IStyledOptionProps>`
  display: inline-flex;
  align-items: center;
  cursor: ${(props) => (props.$isDisabled ? 'not-allowed' : 'pointer')};
  color: ${(props) => (props.$isDisabled ? DISABLED_COLOR : '#222222')};

  & > *:not(:first-child) {
    margin-left: 8px;
  }

  .option__checked-icon {
    color: ${(props) => props.$btnColor};
  }

  .option__unchecked-icon {
    color: ${(props) => (props.$isDisabled ? DISABLED_COLOR : '#808080')};
  }

  &:hover {
    .option__unchecked-icon {
      color: ${(props) => (props.$isDisabled ? DISABLED_COLOR : props.$btnColor)};
    }
  }
`;

const InternalOption: React.ForwardRefRenderFunction<HTMLDivElement, IOptionProps> = (
  {
    isChecked,
    isDisabled = false,
    themeColor = 'primary',
    onClick,
    checkedIcon = <CheckBoxIcon />,
    unCheckedIcon = <CheckBoxOutlineBlankIcon />,
    children = '',
    ...props
  },
  ref
) => {
  const { makeColor } = useColor();
  const btnColor = makeColor({ themeColor, isDisabled });

  return (
    <StyledOption
      onClick={isDisabled ? undefined : onClick}
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
    </StyledOption>
  );
};

const Option = React.forwardRef(InternalOption);

export default Option;
