import { MapPin, Phone, UtensilsCrossed } from 'lucide-react';
import FacebookIcon from '../components/FacebookIcon';
import { Link } from 'react-router-dom';
import { business } from '../data/siteData';
import { useLiveMusic } from '../hooks/useLiveMusic';

function eventLabel(event) {
  if (!event.starts_at) return '';
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
  }).format(new Date(event.starts_at));
}

export default function HomePage() {
  const { events, loading } = useLiveMusic();

  return (
    <section className="page page-home">
      <div className="hero-shade" />
      <div className="hero-grain" />

      <div className="home-logo-wrap">
        <img src="/assets/island-sign-logo.png" alt="The Island Waterfront Bar & Grill — Where The Locals Go — Live Bands" />
      </div>

      <aside className="ground-chalkboard" aria-label="Upcoming live music">
        <div className="chalkboard-frame">
          <div className="chalkboard-face">
            <span className="chalkboard-kicker">LIVE MUSIC</span>
            <strong>THIS WEEK</strong>
            <span className="chalkboard-flourish">✦ ~ ✦</span>
            <div className="chalkboard-events">
              {loading ? <span className="chalkboard-loading">Writing the board…</span> : events.map((event) => (
                <div className="chalkboard-event" key={event.id}>
                  {event.starts_at && <span>{eventLabel(event)}</span>}
                  <b>{event.performer_name || event.title}</b>
                </div>
              ))}
            </div>
            <span className="chalkboard-footer">FRIDAY • SATURDAY • SUNDAY</span>
          </div>
        </div>
        <span className="chalkboard-leg chalkboard-leg-left" />
        <span className="chalkboard-leg chalkboard-leg-right" />
        <span className="chalkboard-ground-shadow" />
      </aside>

      <div className="home-actions">
        <Link className="button button-primary" to="/menu"><UtensilsCrossed size={18} /> View Menu</Link>
        <a className="button button-facebook" href={business.facebookUrl} target="_blank" rel="noreferrer"><FacebookIcon size={18} /> Facebook</a>
        <a className="button button-ghost" href={business.mapsUrl} target="_blank" rel="noreferrer"><MapPin size={18} /> Directions</a>
        <a className="button button-ghost" href={business.phoneHref}><Phone size={18} /> Call</a>
      </div>

      <div className="home-live-ribbon" aria-label="Live music schedule">
        <div><span className="live-dot" /><strong>LIVE MUSIC EVERY FRIDAY–SUNDAY</strong></div>
      </div>
    </section>
  );
}
