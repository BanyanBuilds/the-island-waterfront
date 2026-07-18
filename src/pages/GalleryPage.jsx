import PageIntro from '../components/PageIntro';

const tiles = [
  { className: 'gallery-hero', label: 'Waterfront nights', image: '/assets/island-waterfront-hero.jpg' },
  { className: 'gallery-logo', label: 'Where the locals go', image: '/assets/island-sign-logo.png' },
  { className: 'gallery-joke', label: 'Bar wisdom', image: '/assets/bar-humor.jpg' },
  { className: 'gallery-detail one', label: 'Covered deck', image: '/assets/island-waterfront-hero.jpg' },
  { className: 'gallery-detail two', label: 'Right on the river', image: '/assets/island-waterfront-hero.jpg' },
];

export default function GalleryPage() {
  return (
    <section className="page page-gallery">
      <div className="gallery-heading">
        <PageIntro
          eyebrow="Real place. Real people. Real signs."
          title="No stock-photo tiki bar nonsense."
          copy="The gallery is already structured for the best Google Business, food, crowd, band and waterfront photos. Drop new images into the assets folder and replace the entries in one list."
          dark
        />
      </div>

      <div className="gallery-grid" data-swipe-lock="true">
        {tiles.map((tile) => (
          <figure className={tile.className} key={`${tile.label}-${tile.className}`}>
            <img src={tile.image} alt={tile.label} />
            <figcaption>{tile.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
