import React from 'react';

import Option, { IOptionProps } from '../Option';

export type ICheckboxProps = Omit<IOptionProps, 'checkedIcon' | 'unCheckedIcon'>;

/**
 * `Checkbox` 是一個多選框元件。通常使用情境是在一個群組的選項當中進行多項選擇時使用。
 */
export const InternalCheckbox: React.ForwardRefRenderFunction<HTMLDivElement, ICheckboxProps> = (
  props,
  ref
) => {
  return <Option ref={ref} {...props} />;
};

const Checkbox =
  React.forwardRef<HTMLDivElement, ICheckboxProps & Omit<extendElement<'div'>, 'onChange'>>(
    InternalCheckbox
  );

export default Checkbox;
