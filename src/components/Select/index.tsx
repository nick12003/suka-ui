import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import CircularProgress from '../CircularProgress';
import Arrow from '../Arrow';
import Dropdown from '../Dropdown';

import useValue from '@/hooks/useValue';

interface ICircularProgress {
  $color: string;
}

const StyledCircularProgress = styled(CircularProgress)<ICircularProgress>`
  margin-right: 8px;
  color: ${(props) => props.$color};
`;

const selectBoxEnable = css`
  color: #333;
  &:hover {
    border: 1px solid #222;
  }
`;

const selectBoxDisable = css`
  background: #f5f5f5;
  color: #00000040;
`;

interface IMain {
  $isDisabled: boolean;
}

const StyledMain = styled.div<IMain>`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  height: 38px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  min-width: 180px;

  & > *:not(:first-child) {
    margin-left: 12px;
  }

  ${(props) => (props.$isDisabled ? selectBoxDisable : selectBoxEnable)}
`;

interface IArrow {
  $isOpen: boolean;
}

const StyledArrow = styled.div<IArrow>`
  height: 24px;
  width: 24px;
  transform: rotate(${(props) => (props.$isOpen ? 180 : 0)}deg);
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
`;

const StyledMenu = styled.div`
  min-width: 180px;
  display: inline-flex;
  flex-direction: column;
`;

interface IMenuItem {
  $isSelected: boolean;
}

const StyledMenuItem = styled.div<IMenuItem>`
  display: inline-flex;
  align-items: center;
  height: 38px;
  padding: 6px 12px;
  box-sizing: border-box;
  cursor: pointer;
  color: ${(props) => (props.$isSelected ? '#3091fd' : '#222')};

  &:hover {
    background: #e7f4f9;
  }
`;

export interface ISelectProps {
  /**
   * 選項內容
   */
  options?: Array<{
    label: string;
    value: string;
  }>;
  /**
   * 當前被選中的項目。若設置，則由外部參數控制；若不設置，則由內部 state 控制
   */
  value?: string;
  /**
   * 預設選中的項目，如果設置了`value`則此參數則無效
   */
  defaultValue?: string;
  /**
   * 未選擇任何選項時顯示的 placeholder
   */
  placeholder?: string;
  /**
   * 是否禁用下拉選單
   */
  isDisabled?: boolean;
  /**
   * 資料是否正在載入中
   */
  isLoading?: boolean;
  /**
   * 當選項被選中時會被調用
   */
  onSelect?: (value: string) => void;
}

/**
 * `Select` 是一個下拉選擇器。觸發時能夠彈出一個菜單讓用戶選擇操作。
 */
export const InternalSelect: React.ForwardRefRenderFunction<HTMLDivElement, ISelectProps> = (
  {
    options = [],
    value: outerValue,
    defaultValue,
    onSelect,
    placeholder,
    isDisabled = false,
    isLoading = false,
    ...props
  },
  ref
) => {
  const [value, setValue] = useValue(defaultValue, outerValue);

  const [isOpen, setIsOpen] = useState(false);

  const handleOnSelect = (selectValue: string) => {
    setValue(selectValue);
    if (onSelect) {
      onSelect(selectValue);
    }
  };

  return (
    <Dropdown
      ref={ref}
      {...props}
      isOpen={isOpen}
      onClick={() => (isDisabled || isLoading ? null : setIsOpen(true))}
      onClose={() => setIsOpen(false)}
      placement="bottom-left"
      overlay={
        <StyledMenu>
          {options.map((option) => (
            <StyledMenuItem
              key={option.value}
              role="presentation"
              $isSelected={option.value === value}
              onClick={() => {
                handleOnSelect(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </StyledMenuItem>
          ))}
        </StyledMenu>
      }
    >
      <StyledMain $isDisabled={isDisabled || isLoading}>
        <span>{options.find((option) => option.value === value)?.label ?? placeholder}</span>
        {isLoading ? (
          <StyledCircularProgress $color="#00000040" />
        ) : (
          <StyledArrow $isOpen={isOpen}>
            <Arrow direction="down" />
          </StyledArrow>
        )}
      </StyledMain>
    </Dropdown>
  );
};

const Select =
  React.forwardRef<HTMLDivElement, ISelectProps & Omit<extendElement<'div'>, 'onSelect'>>(
    InternalSelect
  );

export default Select;
