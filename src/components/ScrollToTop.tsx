
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollToTopProps {
  trigger?: string;
}

/**
 * Component that scrolls to the top of the page when the route changes or when triggered.
 * This is used to ensure that when users navigate between pages or major sections, they always start at the top.
 */
export default function ScrollToTop({ trigger }: ScrollToTopProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, trigger]);

  return null;
}
