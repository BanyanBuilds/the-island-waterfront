import { ArrowUpRight, MapPin, Phone } from 'lucide-react';
import FacebookIcon from '../components/FacebookIcon';
import { business } from '../data/siteData';
import PageIntro from '../components/PageIntro';

export default function VisitPage() {
  return (
    <section className="page page-visit">
      <div className="visit-copy">
        <PageIntro
          eyebrow="Merritt Island, Florida"
          title="Find the river. Follow the music."
          copy="Come casual. The newest music lineup, specials and schedule changes live on Facebook."
          dark
        />

        <div className="visit-details">
          <article>
            <small>ADDRESS</small>
            <strong>{business.address}</strong>
          </article>
          <article>
            <small>PHONE</small>
            <a href={business.phoneHref}>{business.phoneDisplay}</a>
          </article>
          <article>
            <small>LIVE MUSIC</small>
            <strong>Friday · Saturday · Sunday</strong>
          </article>
          <article>
            <small>HOURS</small>
            <strong>Opening daily at 11 AM*</strong>
            <em>*Final closing hours need owner confirmation before launch.</em>
          </article>
        </div>

        <div className="visit-actions">
          <a href={business.mapsUrl} target="_blank" rel="noreferrer" className="button button-primary">
            <MapPin size={18} /> Get Directions <ArrowUpRight size={16} />
          </a>
          <a href={business.phoneHref} className="button button-dark">
            <Phone size={18} /> Call The Island
          </a>
          <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="button button-facebook">
            <FacebookIcon size={18} /> Facebook
          </a>
        </div>
      </div>

      <div className="map-wrap">
        <iframe
          title="Map to The Island Waterfront Bar & Grill"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=The%20Island%20Waterfront%20Bar%20%26%20Grill%201891%20E%20Merritt%20Island%20Causeway%20Merritt%20Island%20FL%2032952&output=embed"
        />
        <div className="map-stamp">WHERE THE LOCALS GO</div>
      </div>
    </section>
  );
}
