import { ChevronDown, ChevronUp, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { business, routes } from '../data/siteData';

export default function SiteShell({ children, routeIndex, onPrevious, onNext }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const current = routes[routeIndex];

  return (
    <main className="site-shell">
      <header className="topbar">
        <NavLink className="brand-mini" to="/" aria-label="The Island home">
          <img className="brand-logo-image" src="/assets/island-illustrated-logo.png" alt="" />
          <span>
            <strong>THE ISLAND</strong>
            <small>WATERFRONT BAR & GRILL</small>
          </span>
        </NavLink>

        <nav className="desktop-nav" aria-label="Main navigation">
          {routes.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.path === '/'}>
              {item.label}
            </NavLink>
          ))}
        </nav>


        <button
          className="mobile-menu-button"
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      <div className={`mobile-drawer ${menuOpen ? 'is-open' : ''}`}>
        {routes.map((item) => (
          <NavLink key={item.path} to={item.path} onClick={() => setMenuOpen(false)} end={item.path === '/'}>
            <small>{item.eyebrow}</small>
            <strong>{item.label}</strong>
          </NavLink>
        ))}
        <a href={business.facebookUrl} target="_blank" rel="noreferrer">
          <small>Current bands & times</small>
          <strong>Open Facebook</strong>
        </a>
      </div>

      {children}

      <aside className="mobile-stepper" aria-label="Swipe page indicator">
        <button onClick={onPrevious} disabled={routeIndex === 0} aria-label="Previous page">
          <ChevronUp size={17} />
        </button>
        <div className="mobile-dots">
          {routes.map((route, index) => (
            <NavLink
              key={route.path}
              to={route.path}
              className={index === routeIndex ? 'is-current' : ''}
              aria-label={`Go to ${route.label}`}
            />
          ))}
        </div>
        <button onClick={onNext} disabled={routeIndex === routes.length - 1} aria-label="Next page">
          <ChevronDown size={17} />
        </button>
      </aside>
    </main>
  );
}
