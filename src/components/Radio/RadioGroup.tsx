import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { RadioProvider, TValue, TOnChange } from './RadioContext';

interface IStyledRadioGroup {
  $columns: number;
}

const StyledRadioGroup = styled.div<IStyledRadioGroup>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$columns}, 1fr);
  grid-gap: 8px;
`;

export type IRadioGroupProps = React.ComponentPropsWithoutRef<'div'> & {
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
  children?: any;
  /**
   * callback when event on change
   */
  handleChange?: TOnChange;
};

const InitializesValue: (value: TValue, defaultValue: TValue) => TValue = (value, defaultValue) => {
  if (value) return value;
  if (defaultValue) return defaultValue;
  return null;
};

const InternalRadioGroup: React.ForwardRefRenderFunction<HTMLDivElement, IRadioGroupProps> = (
  props
) => {
  const [internalValue, setInternalValue] = useState(() =>
    InitializesValue(props.value ?? null, props.defaultValue ?? null)
  );

  const onRadioChange = (newValue: TValue) => {
    const lastValue = internalValue;
    if (!('value' in props)) {
      setInternalValue(newValue);
    }
    const { handleChange } = props;
    if (handleChange && newValue !== lastValue) {
      handleChange(newValue);
    }
  };

  useEffect(() => {
    setInternalValue(props.value as TValue);
  }, [props.value]);

  return (
    <StyledRadioGroup $columns={props.columns ?? 1} {...props}>
      <RadioProvider value={{ value: internalValue, onChange: onRadioChange }}>
        {props.children}
      </RadioProvider>
    </StyledRadioGroup>
  );
};

const RadioGroup = React.forwardRef(InternalRadioGroup);

export default RadioGroup;
