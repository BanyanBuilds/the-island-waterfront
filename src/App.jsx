import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useRef } from 'react';
import { routes } from './data/siteData';
import SiteShell from './components/SiteShell';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import WaterfrontPage from './pages/WaterfrontPage';
import VisitPage from './pages/VisitPage';

function RoutedExperience() {
  const location = useLocation();
  const navigate = useNavigate();
  const touchStart = useRef(null);
  const navigationLocked = useRef(false);

  const routeIndex = useMemo(() => {
    const index = routes.findIndex((item) => item.path === location.pathname);
    return index === -1 ? 0 : index;
  }, [location.pathname]);

  const go = (direction) => {
    if (navigationLocked.current) return;
    const target = routeIndex + direction;
    if (target < 0 || target >= routes.length) return;
    navigationLocked.current = true;
    navigate(routes[target].path);
    window.setTimeout(() => {
      navigationLocked.current = false;
    }, 260);
  };

  useEffect(() => {
    const onTouchStart = (event) => {
      if (event.target.closest('[data-swipe-lock="true"]')) return;
      const point = event.touches[0];
      touchStart.current = { x: point.clientX, y: point.clientY };
    };

    const onTouchEnd = (event) => {
      if (!touchStart.current) return;
      const point = event.changedTouches[0];
      const deltaX = point.clientX - touchStart.current.x;
      const deltaY = point.clientY - touchStart.current.y;
      touchStart.current = null;

      if (Math.abs(deltaY) < 72 || Math.abs(deltaY) < Math.abs(deltaX) * 1.15) return;
      go(deltaY < 0 ? 1 : -1);
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [routeIndex]);

  useEffect(() => {
    let lastWheelAt = 0;

    const canScrollInDirection = (element, deltaY) => {
      if (!element) return false;

      const maxScrollTop = element.scrollHeight - element.clientHeight;
      if (maxScrollTop <= 1) return false;

      if (deltaY > 0) return element.scrollTop < maxScrollTop - 1;
      if (deltaY < 0) return element.scrollTop > 1;
      return false;
    };

    const onWheel = (event) => {
      const vertical = Math.abs(event.deltaY) >= Math.abs(event.deltaX);
      if (!vertical || Math.abs(event.deltaY) < 2) return;

      const target = event.target instanceof Element ? event.target : null;
      const scrollRegion = target?.closest('.menu-list, .facebook-feed-shell, [data-wheel-lock="true"]');

      // Let inner panels scroll normally until they reach their top or bottom.
      // At the boundary, the same wheel gesture advances to the next site page.
      if (scrollRegion && canScrollInDirection(scrollRegion, event.deltaY)) return;

      const now = performance.now();
      if (now - lastWheelAt < 220 || navigationLocked.current) {
        event.preventDefault();
        return;
      }

      const direction = event.deltaY > 0 ? 1 : -1;
      const targetIndex = routeIndex + direction;

      // Do not trap the wheel at the first or last page.
      if (targetIndex < 0 || targetIndex >= routes.length) return;

      event.preventDefault();
      lastWheelAt = now;
      go(direction);
    };

    document.addEventListener('wheel', onWheel, { passive: false, capture: true });
    return () => document.removeEventListener('wheel', onWheel, { capture: true });
  }, [routeIndex]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (['ArrowDown', 'PageDown', 'ArrowRight'].includes(event.key)) go(1);
      if (['ArrowUp', 'PageUp', 'ArrowLeft'].includes(event.key)) go(-1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [routeIndex]);

  return (
    <SiteShell routeIndex={routeIndex} onPrevious={() => go(-1)} onNext={() => go(1)}>
      <div className="route-stage" key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/waterfront" element={<WaterfrontPage />} />
          <Route path="/visit" element={<VisitPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </SiteShell>
  );
}

export default function App() {
  return <RoutedExperience />;
}
