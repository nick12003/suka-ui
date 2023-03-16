import React from 'react';
import styled, { css } from 'styled-components';

const errorStyle = css`
  border: 1px solid ${(props) => props.theme.color.error};
  &:hover {
    border: 1px solid ${(props) => props.theme.color.error};
  }
`;

const disabledStyle = css`
  border: 1px solid ${(props) => props.theme.color.disable};
  cursor: not-allowed;
  background: ${(props) => props.theme.color.disable}22;
  .text-field__input {
    cursor: not-allowed;
    background: none;
  }
  &:hover {
    border: 1px solid ${(props) => props.theme.color.disable};
  }
`;

interface ICustom {
  $isError: boolean;
  $isDisabled: boolean;
}

const StyledTextField = styled.div<ICustom>`
  display: inline-flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px 12px;
  box-sizing: border-box;
  height: 36px;

  &:hover {
    border: 1px solid #222;
  }

  ${(props) => (props.$isError ? errorStyle : null)}
  ${(props) => (props.$isDisabled ? disabledStyle : null)}
`;

const Input = styled.input`
  outline: none;
  border: none;
  font-size: 14px;
  color: #333;
  width: 100%;
`;

export interface ITextFieldProps {
  /**
   * 客製化 class 樣式
   */
  className?: string;
  /**
   * 前綴元件
   */
  prefix?: React.ReactElement;
  /**
   * 後綴元件
   */
  suffix?: React.ReactElement;
  /**
   * 佔位文字
   */
  placeholder?: string;
  /**
   * 錯誤狀態
   */
  isError?: boolean;
  /**
   * 禁用狀態
   */
  isDisabled?: boolean;
}

/**
 * `TextField` 是一個允許用戶輸入和編輯文字的元件。
 */
const InternalTextField: React.ForwardRefRenderFunction<HTMLDivElement, ITextFieldProps> = (
  { className, prefix, suffix, isError = false, isDisabled = false, ...props },
  ref
) => (
  <StyledTextField ref={ref} className={className} $isError={isError} $isDisabled={isDisabled}>
    {prefix}
    <Input type="text" className="text-field__input" disabled={isDisabled} {...props} />
    {suffix}
  </StyledTextField>
);

const TextField = React.forwardRef(InternalTextField);

export default TextField;
