import React, { useState } from 'react';
import classNames from 'classnames';
import styled, { css } from 'styled-components';

import useValue from '@/hooks/useValue';

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

interface IMain {
  $isError: boolean;
  $isDisabled: boolean;
}

const StyledMain = styled.div<IMain>`
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

const StyleInput = styled.input`
  outline: none;
  border: none;
  font-size: 14px;
  color: #333;
  width: 100%;
`;

export interface ITextFieldProps {
  /**
   * 文字內容。若設置，則由外部參數控制；若不設置，則由內部 state 控制
   */
  value?: string;
  /**
   * 預設文字內容，如果設置了`value`則此參數則無效
   */
  defaultValue?: string;
  /**
   * 文字內容改變的 callback function
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * 前綴元件
   */
  prefix?: React.ReactNode;
  /**
   * 後綴元件
   */
  suffix?: React.ReactNode;
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
export const InternalTextField: React.ForwardRefRenderFunction<HTMLInputElement, ITextFieldProps> =
  (
    {
      value: outerValue,
      defaultValue,
      onChange,
      prefix,
      suffix,
      isError = false,
      isDisabled = false,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useValue(defaultValue, outerValue);

    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <StyledMain $isError={isError} $isDisabled={isDisabled}>
        {prefix}
        <StyleInput
          ref={ref}
          type="text"
          value={value}
          className={classNames('text-field__input')}
          disabled={isDisabled}
          onChange={handleOnchange}
          {...props}
        />
        {suffix}
      </StyledMain>
    );
  };

const TextField =
  React.forwardRef<
    HTMLInputElement,
    ITextFieldProps & Omit<extendElement<'div'>, 'prefix' | 'onChange'>
  >(InternalTextField);

export default TextField;
