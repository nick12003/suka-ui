import React from 'react';
import styled from 'styled-components';

export interface IMetaProps extends React.ComponentPropsWithoutRef<'div'> {
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

const StyledMeta = styled.div`
  padding: 12px 16px;
  display: flex;
  & > *:not(:first-child) {
    margin-left: 8px;
  }
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  & > img {
    width: 100%;
  }
`;

const Content = styled.div`
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

const InternalMeta: React.ForwardRefRenderFunction<HTMLDivElement, IMetaProps> = ({
  avatarUrl,
  title,
  description,
  ...props
}: IMetaProps) => (
  <StyledMeta {...props}>
    <Avatar>
      <img src={avatarUrl} alt="" style={{ objectFit: 'cover' }} />
    </Avatar>
    <Content>
      <div className="meta__title">{title}</div>
      <div className="meta__description">{description}</div>
    </Content>
  </StyledMeta>
);

const Meta = React.forwardRef(InternalMeta);

export default Meta;
