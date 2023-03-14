import Option, { IOptionProps } from '../Option';

export type ICheckboxProps = Pick<
  IOptionProps,
  'isChecked' | 'isDisabled' | 'themeColor' | 'onClick' | 'children'
>;

/**
 * `Checkbox` 是一個多選框元件。通常使用情境是在一個群組的選項當中進行多項選擇時使用。
 */
const Checkbox = (props: ICheckboxProps) => <Option {...props} />;

export default Checkbox;
