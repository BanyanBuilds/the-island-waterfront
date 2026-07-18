import { useState } from 'react';
import { menuCategories } from '../data/siteData';
import PageIntro from '../components/PageIntro';

export default function MenuPage() {
  const [active, setActive] = useState(menuCategories[0].id);
  const category = menuCategories.find((item) => item.id === active) ?? menuCategories[0];

  return (
    <section className="page page-menu">
      <div className="menu-board">
        <PageIntro
          eyebrow="Waterfront bar food, rebuilt for the web"
          title="The Island Menu"
          copy="Seafood, burgers, bowls, cold drinks and the local favorites people keep coming back for — organized clearly for desktop and mobile."
          dark
        />

        <div className="menu-tabs" data-swipe-lock="true" role="tablist" aria-label="Menu categories">
          {menuCategories.map((item) => (
            <button
              key={item.id}
              className={active === item.id ? 'is-active' : ''}
              onClick={() => setActive(item.id)}
              type="button"
              role="tab"
              aria-selected={active === item.id}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="menu-list" data-swipe-lock="true">
          {category.items.map(({ name, description, price }) => (
            <article className="menu-item" key={name}>
              <div className="menu-item-rule">
                <h2>{name}</h2>
                <span />
                <strong className="menu-price">{price === 'Market' ? 'Market' : `$${price}`}</strong>
              </div>
              <p>{description}</p>
            </article>
          ))}
        </div>

        <p className="menu-note">Menu and prices may change. Call the restaurant for today’s availability and specials.</p>
      </div>
    </section>
  );
}
