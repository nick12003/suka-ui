import React from 'react';
import styled from 'styled-components';

const StyledMain = styled.div`
  padding: 12px 16px;
  display: flex;
  & > *:not(:first-child) {
    margin-left: 8px;
  }
`;

const StyledAvatar = styled.div`
  width: 40px;
  height: 40px;
  & > img {
    width: 100%;
  }
`;

const StyledContent = styled.div`
  .meta__title {
    overflow: hidden;
    color: #000000d9;
    font-weight: 500;
    font-size: 16px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .meta__description {
    font-size: 14px;
    color: #00000073;
  }
`;

export interface IMetaProps {
  /**
   * 客製化樣式
   */
  className?: string;
  /**
   * 標題
   */
  title?: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 頭像圖片位置連結
   */
  avatarUrl?: string;
}

const InternalMeta: React.ForwardRefRenderFunction<
  HTMLDivElement,
  IMetaProps & extendElement<'div'>
> = ({ avatarUrl, title, description, ...props }, ref) => (
  <StyledMain ref={ref} {...props}>
    <StyledAvatar>
      <img src={avatarUrl} alt="" style={{ objectFit: 'cover' }} />
    </StyledAvatar>
    <StyledContent>
      <div className="meta__title">{title}</div>
      <div className="meta__description">{description}</div>
    </StyledContent>
  </StyledMain>
);

const Meta = React.forwardRef(InternalMeta);

export default Meta;
