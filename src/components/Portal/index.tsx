import { useEffect } from 'react';
import ReactDOM from 'react-dom';

export interface IPortalProps {
  children: React.ReactNode;
  customRootId?: string;
}

const Portal = ({ children, customRootId }: IPortalProps) => {
  let portalRoot: HTMLElement;

  const rootId = customRootId || 'portal-root';

  if (document.getElementById(rootId)) {
    portalRoot = document.getElementById(rootId) as HTMLElement;
  } else {
    const divDOM = document.createElement('div');
    divDOM.id = rootId;
    document.body.appendChild(divDOM);
    portalRoot = divDOM;
  }

  useEffect(
    () => () => {
      portalRoot.parentElement?.removeChild(portalRoot);
    },
    [portalRoot]
  );

  return ReactDOM.createPortal(children, portalRoot);
};

export default Portal;
