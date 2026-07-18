# The Island Waterfront Bar & Grill — React Website

A full-screen React/Vite website prototype for The Island Waterfront Bar & Grill in Merritt Island, Florida.

## Local setup

```bash
npm install
npm run dev
```

Vite will print the local address, normally `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

## Interaction model

- Desktop uses real full-screen routes with no page scrolling.
- Desktop navigation, keyboard arrows and next/previous buttons move between pages.
- Mobile uses the same real routes. One vertical swipe moves exactly one page and then locks briefly so the transition settles.
- Browser URLs and back/forward history update normally.
- The menu uses an internal tabbed browser and a contained inner scroll area so it does not turn the whole site into a long page.

## Current routes

- `/` — Home
- `/menu` — Text-based menu
- `/live-music` — Friday/Saturday/Sunday music + Facebook centerpiece
- `/waterfront` — Banana River experience
- `/gallery` — Local photo framework
- `/visit` — Address, call, directions, map and Facebook

## Fast content edits

Business details, route labels, menu categories and bar sayings are in:

```text
src/data/siteData.js
```

Images are in:

```text
public/assets/
```

## Items to confirm before launch

1. Replace the draft menu text with the newest printed menu and exact prices.
2. Confirm the official daily closing hours. The current prototype only states the commonly listed 11 AM opening time and flags closing hours for confirmation.
3. Add the strongest restaurant-owned or authorized Google Business/Facebook photos to the gallery.
4. Add this week's bands through an owner-editable data source or future admin panel. Facebook remains the official current-lineup destination.
5. Confirm whether boat docking language should be presented as a direct amenity or simply waterfront/boat access.

## Facebook

The live-music buttons currently point to:

`https://www.facebook.com/p/The-Island-Waterfront-Bar-Grill-100045905126891/`

## Supabase

The full database setup is included in `supabase/schema.sql`, with a matching migration in `supabase/migrations/`. See `supabase/README.md` for setup steps.

## Desktop navigation behavior

The mouse wheel changes pages on desktop. On the Menu page, the menu panel scrolls internally first; when it reaches the top or bottom, the next wheel gesture moves to the previous or next website page.


## Confirmed business phone

- Display: `(321) 806-3661`
- Click-to-call: `tel:+13218063661`
