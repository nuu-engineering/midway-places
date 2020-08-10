// from https://www.jayfreestone.com/writing/react-portals-with-hooks/
import { createPortal } from 'react-dom';
import usePortal from './usePortal';

/**
 * @example
 * <Portal>
 *   <p>Thinking with portals</p>
 * </Portal>
 * @returns {Portal} A simple portal
 */
const Portal = ({ id, children, className = 'portal' }) => {
  const target = usePortal(id, className);
  return createPortal(
    children,
    target,
  );
};

export default Portal;