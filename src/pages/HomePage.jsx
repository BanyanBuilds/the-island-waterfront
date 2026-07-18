import { MapPin, Phone, UtensilsCrossed } from 'lucide-react';
import FacebookIcon from '../components/FacebookIcon';
import { Link } from 'react-router-dom';
import { business } from '../data/siteData';

export default function HomePage() {
  return (
    <section className="page page-home">
      <div className="hero-shade" />
      <div className="hero-grain" />

      <div className="home-logo-wrap">
        <img src="/assets/island-sign-logo.png" alt="The Island Waterfront Bar & Grill — Where The Locals Go — Live Bands" />
      </div>

      <div className="home-actions">
        <Link className="button button-primary" to="/menu">
          <UtensilsCrossed size={18} /> View Menu
        </Link>
        <a className="button button-facebook" href={business.facebookUrl} target="_blank" rel="noreferrer">
          <FacebookIcon size={18} /> This Week’s Music
        </a>
        <a className="button button-ghost" href={business.mapsUrl} target="_blank" rel="noreferrer">
          <MapPin size={18} /> Directions
        </a>
        <a className="button button-ghost" href={business.phoneHref}>
          <Phone size={18} /> Call
        </a>
      </div>

      <div className="home-live-ribbon">
        <div>
          <span className="live-dot" />
          <strong>LIVE MUSIC EVERY FRIDAY–SUNDAY</strong>
        </div>
      </div>
    </section>
  );
}
