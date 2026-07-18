export const business = {
  name: 'The Island Waterfront Bar & Grill',
  shortName: 'The Island',
  phoneDisplay: '(321) 806-3661',
  phoneHref: 'tel:+13218063661',
  address: '1891 E Merritt Island Causeway, Merritt Island, FL 32952',
  mapsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=The+Island+Waterfront+Bar+%26+Grill+1891+E+Merritt+Island+Causeway+Merritt+Island+FL+32952',
  facebookUrl:
    'https://www.facebook.com/p/The-Island-Waterfront-Bar-Grill-100045905126891/',
  liveMusicDays: ['Friday', 'Saturday', 'Sunday'],
};

export const routes = [
  { path: '/', label: 'Home', eyebrow: 'Where the locals go' },
  { path: '/waterfront', label: 'Waterfront', eyebrow: 'Banana River views' },
  { path: '/menu', label: 'Menu', eyebrow: 'Food & cold drinks' },
  { path: '/visit', label: 'Visit', eyebrow: 'Come as you are' },
];

export const menuCategories = [
  {
    id: 'appetizers',
    label: 'Appetizers',
    items: [
      { name: 'Chicken Wings', price: '13.95', description: 'Ten wings served hot, medium, teriyaki, spicy boom sauce, roasted garlic, garlic parmesan, Old Bay or Cajun, with ranch or bleu cheese.' },
      { name: 'Fresh Water Mussels', price: '13.95', description: 'Steamed in white wine, garlic and parsley sauce, served with garlic toast.' },
      { name: 'Mahi Bites', price: '10.95', description: 'Cubed mahi nuggets served grilled, fried or blackened with your choice of sauce.' },
      { name: 'Potato Fritters', price: '11.95', description: 'Baked potato centers, cheddar cheese, bacon bits and scallions with ranch.' },
      { name: 'Peel & Eat Shrimp', price: '19.95', description: 'One pound of shrimp seasoned in Old Bay with drawn butter and cocktail sauce.' },
      { name: 'Seafood Sampler', price: '16.95', description: 'Mahi bites, calamari and shrimp, served fried, blackened or grilled.' },
      { name: 'Potato Skins', price: '10.95', description: 'Fresh baked potato skins loaded with bacon, cheddar and scallions.' },
      { name: 'Ceviche', price: '11.95', description: 'Shrimp and fish in tomato and cilantro salsa with tortilla chips.' },
      { name: 'Island Boom Shrimp', price: '9.95', description: "Hand-breaded fried shrimp in The Island's signature spicy boom sauce." },
      { name: 'Coconut Shrimp', price: '11.95', description: 'Butterflied coconut shrimp with piña colada dipping sauce.' },
      { name: 'Smoked Fish Dip', price: '11.95', description: 'Locally caught, freshly smoked fish dip with pita bread or tortilla chips, jalapeños and pickles.' },
      { name: 'Chicken Quesadilla', price: '12.95', description: 'Chicken, cheddar, tomatoes, onions and cilantro between flour tortillas. Add a fried egg for the signature Island version.' },
      { name: 'Ahi Tuna', price: '13.95', description: 'Sesame-crusted ahi tuna over greens with wasabi ginger and sesame ginger soy sauce.' },
      { name: 'Fried Mozzarella', price: '8.95', description: 'Italian-breaded mozzarella fried golden brown and served with marinara.' },
    ],
  },
  {
    id: 'bowls',
    label: 'Bowls',
    items: [
      { name: 'Tuna Poke Bowl', price: '14.95', description: 'Marinated ahi tuna over coconut rice with tomato, red onion, red pepper, avocado, green onion and pickled ginger.' },
      { name: "Shepherd's Pie Bowl", price: '13.95', description: 'Mashed potatoes, corn, peas and beef smothered with gravy, topped with cheddar cheese and scallions.' },
      { name: 'Shrimp & Grits', price: '14.95', description: 'Grilled or blackened sweet shrimp over house cheesy grits.' },
      { name: 'Southwest Chicken Bowl', price: '13.95', description: 'Blackened chicken breast over rice, black beans, corn salsa, cheddar, avocado and spicy ranch.' },
    ],
  },
  {
    id: 'sandwiches',
    label: 'Sandwiches',
    items: [
      { name: 'Short Rib Sandwich', price: '12.95', description: 'Beef short rib topped with bacon, pepper jack cheese and sriracha mayo.' },
      { name: 'Cuban Sandwich', price: '12.95', description: 'Grill-pressed mojo pork, sliced ham and Swiss with spicy Island mustard and pickles.' },
      { name: 'The Island Burger', price: '10.49', description: 'Eight-ounce burger with lettuce, tomato, onion and pickles, served with house chips. Add bacon, mushrooms, onions or jalapeños.' },
      { name: 'Chicken Sandwich', price: '9.95', description: 'Fried chicken breast with your choice of wing sauce, lettuce, tomato and onion.' },
      { name: 'Fried Bologna Sandwich', price: '9.49', description: 'Thick-cut fried bologna on white bread with mustard and house chips.' },
      { name: 'Fish Sandwich', price: '10.95', description: 'Grilled, blackened or fried fish with lettuce, tomato and onion. Substitute mahi or grouper for an additional charge.' },
      { name: 'Philly Cheese Steak', price: '10.49', description: 'Shaved ribeye, grilled peppers, mushrooms, onions and provolone.' },
      { name: 'Fish & Chips', price: '12.95', description: 'Fried fish fillet with house chips and the choice of coleslaw or tartar sauce.' },
    ],
  },
  {
    id: 'entrees',
    label: 'Island Entrées',
    items: [
      { name: 'Caribbean Grouper or Mahi', price: '16.95', description: 'Grilled, jerked or blackened fish topped with mango salsa, served with two sides.' },
      { name: 'Shrimp Scampi', price: '16.95', description: 'Shrimp sautéed in white wine, butter and scallions over linguine with salad and garlic toast.' },
      { name: 'Salmon', price: '17.95', description: 'Norwegian salmon, lightly seasoned and grilled with cucumber dill sauce and two sides.' },
      { name: 'Steak Tenderloin', price: '19.95', description: 'Eight-ounce tenderloin with two sides. Add bacon, blackened or fried shrimp, or chicken.' },
      { name: 'Basil & Pesto Pasta', price: '10.95', description: 'Fresh basil, pesto and parmesan over tri-color bowtie pasta. Add chicken or shrimp.' },
      { name: 'Cold Water Lobster', price: '16.95', description: 'Succulent lobster with drawn butter and baked potato or grilled vegetables.' },
      { name: 'Fried Fish Dinner', price: '12.95', description: 'Lightly breaded fried fish with your choice of two sides.' },
      { name: 'Seafood Au Gratin', price: '15.95', description: 'Shrimp, scallops and crab baked in au gratin sauce, served with two sides.' },
      { name: 'Pulled Pork Platter', price: '11.95', description: 'Slow-cooked pulled pork with BBQ sauce and two sides.' },
      { name: 'The Island Seafood Platter', price: '18.95', description: 'Lightly breaded mahi, shrimp and scallops with two sides.' },
      { name: 'Beef Short Ribs', price: '15.95', description: 'Fork-tender beef braised in au jus with two sides.' },
      { name: 'Coconut Shrimp', price: '11.95', description: 'Eight coconut-battered shrimp with piña colada sauce and two sides.' },
    ],
  },
  {
    id: 'soups-salads',
    label: 'Soups & Salads',
    items: [
      { name: 'Caesar or Garden Salad', price: '6.95', description: 'Classic Caesar or garden salad. Add mahi, shrimp or chicken.' },
      { name: 'Asian Chicken Salad', price: '9.95', description: 'Grilled chicken over baby field greens with onion, diced tomato, bell pepper, cucumber, ginger, red cabbage and chow mein noodles with sesame ginger dressing.' },
      { name: 'Mahi Mango Salad', price: '10.95', description: 'Grilled or blackened mahi over baby greens with diced mango, pineapple and onions, served with citrus ginger dressing.' },
      { name: 'Island Soups', price: 'Market', description: 'New England clam chowder or the soup of the day.' },
    ],
  },
  {
    id: 'cocktails',
    label: 'Cocktails',
    items: [
      { name: 'Key Lime Martini', price: '7.50', description: 'Vanilla vodka and key lime liqueur with a graham cracker rim.' },
      { name: 'Cucumber Martini', price: '7.50', description: 'Cucumber vodka, St-Germain elderflower and sour mix.' },
      { name: 'Mermaid Water', price: '6.50', description: 'Spiced rum, Malibu, blue curaçao, pineapple juice and Sprite.' },
      { name: 'Paradise Punch', price: '7.00', description: 'Vodka, Bacardi Dragonberry, orange and cranberry juice with a splash of 7-Up.' },
      { name: 'Watermelon Basil Margarita', price: '7.00', description: 'Silver tequila, watermelon oasis, sour mix and basil.' },
      { name: 'Mojito', price: '7.00', description: 'Bacardi silver rum, muddled fresh mint, soda and sugar.' },
      { name: 'Electric Shark', price: '6.50', description: 'Captain Morgan spiced rum, blue curaçao, pineapple juice and orange juice.' },
      { name: 'The Bryce', price: '6.50', description: 'Bacardi Dragonberry rum, sour mix and cranberry juice.' },
      { name: 'Tropical Tease', price: '6.50', description: 'Malibu rum, banana and melon schnapps with pineapple juice.' },
      { name: 'Merritt Mule', price: '6.50', description: "Tito's vodka, Gosling's ginger beer and muddled lime." },
      { name: 'Piña Colada', price: '7.00', description: 'Rum, piña colada and pineapple juice.' },
      { name: 'Daiquiri', price: '7.00', description: 'Rum with mango, strawberry or watermelon.' },
      { name: 'Margarita', price: '7.00', description: 'Tequila, triple sec and sour mix with mango, strawberry or watermelon.' },
      { name: 'Island Blue', price: '7.50', description: 'Malibu rum, blue curaçao, pineapple juice and piña colada.' },
    ],
  },
];

export const barSayings = [
  "It's so hot outside I almost called my ex so I could be around something shady.",
  'Cold beer. Loud bands. Questionable decisions.',
  'Come for the view. Stay because somebody ordered another round.',
];
