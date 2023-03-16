import React from 'react';
import styled from 'styled-components';

const StyledColorBlock = styled.div`
  width: 12px;
  height: 12px;
  background: #eee;
`;

const InternalColorBlock: React.ForwardRefRenderFunction<HTMLDivElement, {}> = (props) => (
  <StyledColorBlock {...props} />
);

const ColorBlock = React.forwardRef(InternalColorBlock);

export default ColorBlock;
