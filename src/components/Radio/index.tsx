import React, { useContext } from 'react';

import { ReactComponent as RadioButtonUncheckedIcon } from '@/assets/SVG/radioUncheck.svg';
import { ReactComponent as RadioButtonCheckedIcon } from '@/assets/SVG/radioCheck.svg';

import Option, { IOptionProps } from '../Option';

import { RadioContext, TValue } from './RadioContext';

export interface IRadioProps extends IOptionProps {
  /**
   * Selected value
   */
  value: TValue;
}

/**
 * `Radio` 是一個單選框元件，讓我們在一組選項當中選擇其中一個選項。
 * 當我們的情境是希望用戶可以一次看到所有選項時，可以使用 Radio Button。
 * Radio Button 的選項不宜多，
 * `如果你的選項多到需要被折疊，那建議你使用更不佔空間的下拉選單元件`。
 */
export const InternalRadio: React.ForwardRefRenderFunction<HTMLDivElement, IRadioProps> = (
  props,
  ref
) => {
  const { isDisabled = false, themeColor = 'primary' } = props;

  const groupContext = useContext(RadioContext);

  const handleOnChange = () => {
    groupContext?.onChange?.(props.value);
  };

  const radioProps = { ...props };

  if (groupContext) {
    radioProps.onChange = handleOnChange;
    radioProps.isChecked = props.value === groupContext.value;
  }

  return (
    <Option
      ref={ref}
      checkedIcon={<RadioButtonCheckedIcon />}
      unCheckedIcon={<RadioButtonUncheckedIcon />}
      {...{ isDisabled, themeColor, ...radioProps }}
    />
  );
};

const Radio =
  React.forwardRef<
    HTMLDivElement,
    IRadioProps & Omit<extendElement<'div'>, 'onChange' | 'defaultValue'>
  >(InternalRadio);

export default Radio;
