import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Temporarily disable smooth scroll so we jump to top instantly on route change
        const html = document.documentElement;
        const prev = html.style.scrollBehavior;
        html.style.scrollBehavior = 'auto';
        window.scrollTo(0, 0);
        // Restore after a frame
        requestAnimationFrame(() => {
            html.style.scrollBehavior = prev;
        });
    }, [pathname]);

    return null;
};

export default ScrollToTop;
