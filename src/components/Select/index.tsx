import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import CircularProgress from '../CircularProgress';
import Arrow from '../Arrow';
import Dropdown from '../Dropdown';

interface IStyledCircularProgress {
  $color: string;
}

interface ISelectBox {
  $isDisabled: boolean;
}

interface IArrowDown {
  $isOpen: boolean;
}

interface IMenuItem {
  $isSelected: boolean;
}

export interface ISelectProps {
  /**
   * 選項內容
   */
  options: Array<any>;
  /**
   * 用來指定當前被選中的項目
   */
  value: string;
  /**
   * 未選擇任何選項時顯示的 placeholder
   */
  placeholder: string;
  /**
   * 是否禁用下拉選單
   */
  isDisabled: boolean;
  /**
   * 資料是否正在載入中
   */
  isLoading: boolean;
  /**
   * 當選項被選中時會被調用
   */
  onSelect: Function;
}

const StyledCircularProgress = styled(CircularProgress)<IStyledCircularProgress>`
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

const SelectBox = styled.div<ISelectBox>`
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

const ArrowDown = styled.div<IArrowDown>`
  height: 24px;
  width: 24px;
  transform: rotate(${(props) => (props.$isOpen ? 180 : 0)}deg);
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
`;

const Menu = styled.div`
  min-width: 180px;
  display: inline-flex;
  flex-direction: column;
`;

const MenuItem = styled.div<IMenuItem>`
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

const InternalSelect: React.ForwardRefRenderFunction<HTMLDivElement, ISelectProps> = (
  { options, value, onSelect, placeholder, isDisabled, isLoading, ...props },
  ref
) => {
  const [isOpen, setIsOpen] = useState(false);

  const foundOption = options.find((option) => option.value === value) || {};

  return (
    <Dropdown
      ref={ref}
      isOpen={isOpen}
      onClick={() => (isDisabled || isLoading ? null : setIsOpen(true))}
      onClose={() => setIsOpen(false)}
      placement="bottom-left"
      overlay={
        <Menu>
          {options.map((option) => (
            <MenuItem
              key={option.value}
              role="presentation"
              $isSelected={option.value === value}
              onClick={() => {
                onSelect(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      }
      {...props}
    >
      <SelectBox $isDisabled={isDisabled || isLoading}>
        <span>{foundOption.label || placeholder}</span>
        {isLoading ? (
          <StyledCircularProgress $color="#00000040" />
        ) : (
          <ArrowDown $isOpen={isOpen}>
            <Arrow direction="down" />
          </ArrowDown>
        )}
      </SelectBox>
    </Dropdown>
  );
};

/**
 * `Select` 是一個下拉選擇器。觸發時能夠彈出一個菜單讓用戶選擇操作。
 */
const Select = React.forwardRef(InternalSelect);

export default Select;
