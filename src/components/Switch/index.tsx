import React, { useState, useRef, useLayoutEffect } from 'react';
import styled, { css } from 'styled-components';
import { useColor } from '@/theme/useColor';

const transitionStyle = css`
  transition: left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    right 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

interface IThumb {
  $thumbSize: number;
  $switchWidth: number;
  $isChecked?: boolean;
}

const StyledThumb = styled.div<IThumb>`
  width: ${(props) => props.$thumbSize}px;
  height: ${(props) => props.$thumbSize}px;
  border-radius: 50px;
  background: #fff;
  position: absolute;
  ${(props) => {
    if (props.$isChecked) {
      return `left: ${props.$switchWidth - props.$thumbSize}px;`;
    }
    return 'left: 0px;';
  }}
  ${transitionStyle}
`;

interface ILabel {
  $padding: number;
  $switchWidth: number;
  $labelWidth: number;
  $isChecked?: boolean;
}

const StyledLabel = styled.div<ILabel>`
  position: absolute;
  font-size: 14px;
  white-space: nowrap;
  top: 50%;
  transform: translateY(-50%);
  padding: 0px ${(props) => props.$padding}px;
  ${(props) => {
    if (props.$isChecked) {
      return `right: ${props.$switchWidth - props.$labelWidth}px;`;
    }
    return `
    right: 0px;
    `;
  }}
  ${transitionStyle}
`;

interface IMain {
  $thumbSize: number;
  $switchWidth: number;
  $switchColor: string;
  $isDisabled: boolean;
}

const StyledMain = styled.div<IMain>`
  height: ${(props) => props.$thumbSize}px;
  width: ${(props) => props.$switchWidth}px;
  background: ${(props) => props.$switchColor};
  display: inline-flex;
  color: #fff;
  border-radius: 50px;
  position: relative;
  border: 3px solid ${(props) => props.$switchColor};
  cursor: ${(props) => (props.$isDisabled ? 'not-allowed' : 'pointer')};
  box-sizing: content-box;
`;

export interface ISwitchProps {
  /**
   * 開啟狀態的內容。若設置，則由外部參數控制；若不設置，則由內部 state 控制
   */
  isChecked?: boolean;
  /**
   * 預設狀態，如果設置了`isChecked`則此參數則無效
   */
  defaultChecked?: boolean;
  /**
   * 禁用狀態
   */
  isDisabled?: boolean;
  /**
   * 主題配色，primary、secondary 或是自己傳入色票
   */
  themeColor?: string;
  /**
   * 狀態改變的 callback function
   */
  onChange?: (isChecked: boolean) => void;
  /**
   * 開關大小
   */
  size?: 'default' | 'small';
  /**
   * 開啟狀態的內容
   */
  checkedChildren?: string;
  /**
   * 關閉狀態的內容
   */
  unCheckedChildren?: string;
}

/**
 * `Switch` 元件是一個開關的選擇器。
 * 在我們表示開關狀態，或兩種狀態之間的切換時，很適合使用。和 Checkbox 的區別是， Checkbox 一般只用來標記狀態是否被選取，
 * 需要提交之後才會生效，而 Switch 則會在觸發的當下直接觸發狀態的改變。
 */
export const InternalSwitch: React.ForwardRefRenderFunction<HTMLDivElement, ISwitchProps> = (
  {
    isChecked: isCheckedOuter,
    defaultChecked = false,
    isDisabled = false,
    size = 'default',
    themeColor = 'primary',
    onChange,
    checkedChildren,
    unCheckedChildren,
    ...props
  },
  ref
) => {
  const [isChecked, setIsChecked] = useState(() => {
    if (isCheckedOuter !== undefined) return isCheckedOuter;
    return defaultChecked;
  });
  const [labelWidth, setLabelWidth] = useState(0);
  const labelRef = useRef<HTMLDivElement>(null);
  const { makeColor } = useColor();
  const thumbSize = size === 'small' ? 12 : 18;
  const switchWidth = thumbSize + labelWidth;
  const switchColor = makeColor({ themeColor, isDisabled: !isChecked });

  useLayoutEffect(() => {
    const minLabelSize = thumbSize * 1.2;
    const currentLabelWidth = labelRef.current?.clientWidth;
    if (currentLabelWidth) {
      setLabelWidth(currentLabelWidth < minLabelSize ? minLabelSize : currentLabelWidth);
    }
  }, [labelRef.current?.clientWidth, thumbSize]);

  const handleOnChange = (newChecked: boolean) => {
    if (!isDisabled) {
      setIsChecked(newChecked);
      onChange?.(isChecked);
    }
  };

  return (
    <StyledMain
      ref={ref}
      $switchWidth={switchWidth}
      $thumbSize={thumbSize}
      $switchColor={switchColor}
      $isDisabled={isDisabled}
      onClick={() => {
        handleOnChange(!isChecked);
      }}
      {...props}
    >
      <StyledThumb $isChecked={isChecked} $thumbSize={thumbSize} $switchWidth={switchWidth} />
      <StyledLabel
        ref={labelRef}
        $padding={thumbSize / 3}
        $labelWidth={labelWidth}
        $switchWidth={switchWidth}
        $isChecked={isChecked}
      >
        {isChecked ? checkedChildren : unCheckedChildren}
      </StyledLabel>
    </StyledMain>
  );
};

const Switch =
  React.forwardRef<HTMLDivElement, ISwitchProps & Omit<extendElement<'div'>, 'onChange'>>(
    InternalSwitch
  );

export default Switch;
