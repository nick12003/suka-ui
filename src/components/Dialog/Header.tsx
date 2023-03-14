import styled from 'styled-components';

import { ReactComponent as CloseIcon } from '@/assets/close.svg';

const HeaderWrapper = styled.div`
  border-bottom: 1px solid #eeeeee;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.div`
  cursor: pointer;
  height: 24px;
  width: 24px;
`;

export interface IHeaderProps {
  /**
   * 標頭內容
   */
  title?: React.ReactNode;
  /**
   * 關閉事件
   */
  onClose?: React.MouseEventHandler<HTMLDivElement>;
}

const Header = ({ title, onClose }: IHeaderProps) => (
  <HeaderWrapper>
    {title}
    <CloseButton onClick={onClose}>
      <CloseIcon />
    </CloseButton>
  </HeaderWrapper>
);

export default Header;
