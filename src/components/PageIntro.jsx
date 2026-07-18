export default function PageIntro({ eyebrow, title, copy, dark = false }) {
  return (
    <div className={`page-intro ${dark ? 'is-dark' : ''}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {copy ? <p className="intro-copy">{copy}</p> : null}
    </div>
  );
}
