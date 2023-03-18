import React from 'react';
import styled from 'styled-components';

type TDirection = keyof typeof degreeMap;
type TSize = keyof typeof sizeMap;

const degreeMap = {
  up: '-135deg',
  down: '45deg',
  left: '135deg',
  right: '-45deg',
};

const sizeMap = {
  small: 0.125,
  medium: 0.25,
  large: 0.5,
};

interface IMain extends extendElement<'span'> {
  $direction: TDirection;
  $size: TSize;
}

const StyledMain = styled.span<IMain>`
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: ${({ $size }) => `${sizeMap[$size]}rem`};
  margin: 0.5rem;
  transform: ${({ $direction }) => `rotate(${degreeMap[$direction]})`};
  -webkit-transform: ${({ $direction }) => `rotate(${degreeMap[$direction]})`};
`;

export interface IArrowProps {
  direction?: TDirection;
  size?: TSize;
}

const InternalArrow: React.ForwardRefRenderFunction<HTMLSpanElement, IArrowProps> = (
  { direction = 'up', size = 'medium', ...props },
  ref
) => <StyledMain ref={ref} $direction={direction} $size={size} {...props} />;

const Arrow = React.forwardRef(InternalArrow);

export default Arrow;
