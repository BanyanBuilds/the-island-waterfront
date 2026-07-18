import { ArrowUpRight, Music2 } from 'lucide-react';
import FacebookIcon from '../components/FacebookIcon';
import { business } from '../data/siteData';
import PageIntro from '../components/PageIntro';

const facebookPluginUrl = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
  business.facebookUrl,
)}&tabs=timeline&width=500&height=720&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false`;

export default function LiveMusicPage() {
  return (
    <section className="page page-music">
      <div className="music-glow one" />
      <div className="music-glow two" />

      <div className="music-copy">
        <PageIntro
          eyebrow="Three nights. Right on the river."
          title="Live bands Friday, Saturday & Sunday."
        />

        <div className="music-days">
          {business.liveMusicDays.map((day, index) => (
            <article key={day}>
              <span>0{index + 1}</span>
              <strong>{day}</strong>
              <small>Current band & time in the live Facebook feed</small>
            </article>
          ))}
        </div>

        <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="button button-facebook music-facebook-link">
          <FacebookIcon size={18} /> Open Full Facebook Page <ArrowUpRight size={17} />
        </a>
      </div>

      <aside className="facebook-stage" aria-label="The Island Facebook timeline">
        <div className="led-sign">
          <Music2 size={28} />
          <span>LIVE BANDS</span>
        </div>
        <div className="facebook-feed-shell">
          <iframe
            title="The Island Waterfront Bar & Grill Facebook timeline"
            src={facebookPluginUrl}
            width="500"
            height="720"
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling="yes"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
          <div className="facebook-feed-fallback">
            <p>Facebook blocked the embedded feed in this browser.</p>
            <a href={business.facebookUrl} target="_blank" rel="noreferrer">
              View the latest lineup on Facebook <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </aside>
    </section>
  );
}
