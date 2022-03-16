import { useLayoutEffect } from 'react';

export const useBodyScrollLock = () => {
  useLayoutEffect(()=>{
    const initialStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = initialStyle);
  }, []);
};
