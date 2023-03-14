import styled from 'styled-components';
import PropTypes from 'prop-types';

import Button from '../Button';

const FooterWrapper = styled.div`
  padding: 12px 20px;
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  & > *:not(:first-child) {
    margin-left: 12px;
  }
`;

export interface IFooterProps {
  /**
   * 關閉事件
   */
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * 送出事件
   */
  onSubmit?: React.MouseEventHandler<HTMLButtonElement>;
}

const Footer = ({ onClose, onSubmit }: IFooterProps) => (
  <FooterWrapper>
    <ButtonGroup>
      <Button variant="outlined" onClick={onClose}>
        取消
      </Button>
      <Button onClick={onSubmit}>確認</Button>
    </ButtonGroup>
  </FooterWrapper>
);

export default Footer;
