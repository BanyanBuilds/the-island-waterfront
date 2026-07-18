import { Anchor, Binoculars, ShipWheel, Waves } from 'lucide-react';
import PageIntro from '../components/PageIntro';

const features = [
  [Anchor, 'Pull up by boat', 'The Banana River is part of the experience, not background decoration.'],
  [Waves, 'Open-air everything', 'Covered deck, waterfront breeze and a building that blurs indoors and outdoors.'],
  [Binoculars, 'Watch the water', 'Dolphins, boats, sunsets and launch-day skies show up without a reservation.'],
  [ShipWheel, 'Old Florida energy', 'Weathered wood, cold beer and the kind of place locals actually use.'],
];

export default function WaterfrontPage() {
  return (
    <section className="page page-waterfront">
      <div className="waterfront-visual">
        <div className="waterfront-tag">BANANA RIVER · MERRITT ISLAND</div>
        <div className="waterfront-quote">“The building isn’t the luxury. The location is.”</div>
      </div>
      <div className="waterfront-copy">
        <PageIntro
          eyebrow="Come by land or by water"
          title="The river is the whole point."
          copy="Facing toward Cocoa Beach from Merritt Island, The Island is a casual waterfront hangout with a covered deck and one of those views that makes a two-drink stop turn into an entire afternoon."
          dark
        />
        <div className="feature-grid">
          {features.map(([Icon, title, copy]) => (
            <article key={title}>
              <Icon size={24} />
              <h2>{title}</h2>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
