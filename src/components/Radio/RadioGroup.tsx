import React from 'react';
import styled from 'styled-components';

import { RadioProvider, TValue, TOnChange } from './RadioContext';

import useValue from '@/hooks/useValue';

interface IMain {
  $columns: number;
}

const StyledMain = styled.div<IMain>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$columns}, 1fr);
  grid-gap: 8px;
`;

export interface IRadioGroupProps {
  columns?: number;
  /**
   * default value
   */
  defaultValue?: TValue;
  /**
   * Selected value
   */
  value?: TValue;
  /**
   * children of RadioGroup
   */
  children?: React.ReactNode;
  /**
   * callback when event on change
   */
  onChange?: TOnChange;
}

const InternalRadioGroup: React.ForwardRefRenderFunction<HTMLDivElement, IRadioGroupProps> = (
  { columns = 1, value, defaultValue = null, children, onChange, ...props },
  ref
) => {
  const [internalValue, setInternalValue] = useValue(defaultValue, value);

  const onRadioChange = (newValue: TValue) => {
    const lastValue = internalValue;
    if (value !== undefined) {
      setInternalValue(newValue);
    }
    if (onChange && newValue !== lastValue) {
      onChange(newValue);
    }
  };

  return (
    <StyledMain ref={ref} $columns={columns} {...props}>
      <RadioProvider value={{ value: internalValue, onChange: onRadioChange }}>
        {children}
      </RadioProvider>
    </StyledMain>
  );
};

const RadioGroup =
  React.forwardRef<
    HTMLDivElement,
    IRadioGroupProps & Omit<extendElement<'div'>, 'onChange' | 'defaultValue'>
  >(InternalRadioGroup);

export default RadioGroup;
