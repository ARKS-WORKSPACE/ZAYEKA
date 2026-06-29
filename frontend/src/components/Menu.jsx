import React, { useState, useEffect } from 'react';
import { Search, Info, X, Leaf, Flame, ArrowRight, Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import './Menu.css';

export const MENU_ITEMS = [
  {
    id: 1,
    name: 'Tandoori Paneer Tikka',
    category: 'indian',
    price: 18,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Cottage cheese marinated in yogurt and hand-ground spices, clay-oven roasted.',
    longDescription: 'Premium cottage cheese cubes marinated in an artisanal yogurt blend infused with roasted cumin, Kashmiri red chili, and mustard oil. Skewered with bell peppers and Spanish onions, then charred to perfection in our traditional clay tandoor. Served with a vibrant mint-coriander chutney and pickled shallots.',
    tags: ['Vegetarian', 'Gluten-Free'],
    ingredients: ['Cottage Cheese', 'Hung Curd', 'Kashmiri Chili', 'Cumin', 'Mint', 'Bell Peppers'],
    chefNotes: 'The key to the texture is the high-temperature clay oven which chars the edges while keeping the paneer exceptionally soft inside.',
    pairing: 'Dry Riesling or a crisp Indian Pale Ale'
  },
  {
    id: 2,
    name: 'Corn & Cheese Garlic Bread',
    category: 'continental',
    price: 12,
    image: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Toasted artisanal baguette slices topped with sweet corn, garlic butter, and melted cheese.',
    longDescription: 'Crispy slices of freshly baked artisanal sourdough baguette baked with rich garlic-herb butter, loaded with sweet organic corn kernels and a premium blend of mozzarella and cheddar cheeses. Baked under high heat until bubbly and golden brown, finished with fresh parsley and chili flakes.',
    tags: ['Vegetarian'],
    ingredients: ['Sourdough Baguette', 'Sweet Corn', 'Mozzarella', 'Cheddar', 'Garlic Butter', 'Chili Flakes'],
    chefNotes: 'We slow-roast the garlic before whipping it into the butter to give a sweet, mellow undertone that pairs beautifully with the sweet corn.',
    pairing: 'Lightly oaked Pinot Grigio'
  },
  {
    id: 3,
    name: 'Cheesy Stuffed Mushrooms',
    category: 'continental',
    price: 14,
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Earthy white button mushrooms packed with spinach, cream cheese, and baked herbs.',
    longDescription: 'Selected large white button mushrooms, stuffed with a decadent mixture of sautéed baby spinach, garlic, cream cheese, and sharp parmesan. Topped with seasoned panko breadcrumbs and drizzled with cold-pressed olive oil, then baked until the cheese is melted and the top is crispy.',
    tags: ['Vegetarian', 'Gluten-Free'],
    ingredients: ['White Button Mushrooms', 'Baby Spinach', 'Cream Cheese', 'Parmesan', 'Garlic', 'Herbs'],
    chefNotes: 'Removing the moisture from the spinach completely before stuffing prevents the mushroom caps from getting soggy during baking.',
    pairing: 'Sauvignon Blanc or a light Pinot Noir'
  },
  {
    id: 4,
    name: 'Crispy Calamari Rings',
    category: 'continental',
    price: 17,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Lightly battered fried squid rings, served with zesty lemon-herb garlic aioli.',
    longDescription: 'Tender squid rings dusted in a seasoned cornstarch and sea salt coating, flash-fried to a perfect crispy texture. Served immediately over fresh lemon slices, accompanied by a house-made zesty garlic aioli infused with fresh dill, lemon zest, and cracked black pepper.',
    tags: [],
    ingredients: ['Squid Rings', 'Seasoned Batter', 'Sea Salt', 'Garlic Aioli', 'Lemon Zest', 'Dill'],
    chefNotes: 'Flash-frying for exactly 60 seconds ensures the calamari remains incredibly tender and crispy without becoming rubbery.',
    pairing: 'Crisp Champagne or an extra dry Prosecco'
  },
  {
    id: 5,
    name: 'Crispy Avocado Bhel',
    category: 'indian',
    price: 16,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Modern street-food fusion of puffed rice, fresh avocado, and tamarind glaze.',
    longDescription: 'A playful, modern reimagining of Mumbai street food. We toss light puffed rice, crispy gram-flour sev, chopped Spanish onions, and juicy tomatoes with fresh Hass avocado cubes. Coated with organic tamarind glaze and spicy green chili chutney, then garnished with fresh pomegranate seeds and micro-coriander.',
    tags: ['Vegan', 'Vegetarian'],
    ingredients: ['Puffed Rice', 'Hass Avocado', 'Sev', 'Tamarind Chutney', 'Pomegranate', 'Micro-coriander'],
    chefNotes: 'This dish must be assembled and served immediately to preserve the contrasting textures of crispy puffed rice and buttery avocado.',
    pairing: 'Sparkling Sauvignon Blanc or a crisp Prosecco'
  },
  {
    id: 6,
    name: 'Royal Saffron Biryani',
    category: 'indian',
    price: 28,
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Aromatic basmati rice layered with seasonal vegetables, saffron, and gold leaf.',
    longDescription: 'A majestic preparation of aged long-grain Basmati rice, slow-cooked on "dum" under a sealed dough crust. Layered with saffron milk, caramelized onions, fresh mint, rose water, and choice of heritage seasonal vegetables or spiced mock-protein. Elegantly presented in a traditional copper handi and crowned with genuine edible gold leaf.',
    tags: ['Vegetarian', 'Gluten-Free'],
    ingredients: ['Aged Basmati Rice', 'Kashmiri Saffron', 'Caramelized Onions', 'Rose Water', 'Edible Gold Leaf'],
    chefNotes: 'Cooked using the classic handi dum technique. Do not rush the cooking; the rice absorbs the steam and spice oils over 4 hours.',
    pairing: 'Medium-bodied Syrah or refreshing Mint Raita'
  },
  {
    id: 7,
    name: 'Truffle Butter Chicken',
    category: 'indian',
    price: 29,
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Charred chicken simmered in velvet tomato gravy, finished with white truffle oil.',
    longDescription: 'Our signature take on a global favorite. Free-range chicken thigh meat is marinated overnight, charred in the tandoor, and then simmered in a velvety, satin-smooth tomato and cashew gravy. Rich in butter and cream, we elevate the dish by infusing it with premium Italian white truffle oil just before serving.',
    tags: ['Gluten-Free'],
    ingredients: ['Free-range Chicken', 'San Marzano Tomatoes', 'Cashew Paste', 'Amul Butter', 'Italian White Truffle Oil'],
    chefNotes: 'The addition of white truffle oil adds an earthy, complex aroma that bridges Indian spices and European luxury culinary arts.',
    pairing: 'Oaked Chardonnay or a smooth Pinot Noir'
  },
  {
    id: 8,
    name: 'Royal Butter Chicken (Traditional)',
    category: 'indian',
    price: 26,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Authentic Delhi-style clay-oven charred chicken in a rich, buttery tomato gravy.',
    longDescription: 'A spectacular rendition of the traditional Delhi-style Butter Chicken. Succulent chicken pieces on the bone are marinated in spices, roasted in our clay tandoor, and simmered in a rich, mildly spiced, creamy tomato gravy sweetened with a touch of organic honey and dried fenugreek leaves.',
    tags: ['Gluten-Free'],
    ingredients: ['Chicken on the bone', 'Butter', 'Cream', 'Honey', 'Fenugreek Leaves', 'Kashmiri Chili'],
    chefNotes: 'The authentic flavor comes from bone-in chicken, which imparts a deeper flavor to the velvet gravy during the simmering process.',
    pairing: 'Warm Butter Naan or a glass of Merlot'
  },
  {
    id: 9,
    name: 'Smoked Dal Makhani',
    category: 'indian',
    price: 22,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Black lentils slow-cooked for 24 hours, finished with charcoal smoke.',
    longDescription: 'An absolute labor of love. Premium organic whole black lentils and red kidney beans are slow-cooked on a gentle charcoal ember for 24 hours. Finished with fresh house-churned white butter, cream, and a tempering of sun-dried fenugreek leaves. Before sealing, the dish undergoes "dhungar" (charcoal smoking) to add a deep rustic campfire aroma.',
    tags: ['Vegetarian', 'Gluten-Free'],
    ingredients: ['Black Urad Lentils', 'White Butter', 'Fresh Cream', 'Kasuri Methi', 'Charcoal Smoke'],
    chefNotes: 'Simmered continuously for 24 hours. The slow cooking breaks down the starch in the lentils, resulting in a naturally thick, creamy consistency.',
    pairing: 'Freshly baked Garlic Naan and a full-bodied Cabernet Sauvignon'
  },
  {
    id: 10,
    name: 'Veg Au Gratin',
    category: 'continental',
    price: 21,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Seasonal vegetables baked in creamy white béchamel sauce under a cheese crust.',
    longDescription: 'A classic French comfort food popular in India. A colorful assortment of fresh garden vegetables (broccoli, baby corn, carrots, French beans, and peas) gently blanched, folded in a rich, velvety, nutmeg-infused béchamel white sauce, topped with a thick layer of shredded mozzarella and parmesan, and baked to bubbly perfection.',
    tags: ['Vegetarian'],
    ingredients: ['Garden Vegetables', 'Béchamel Sauce', 'Mozzarella', 'Parmesan', 'Nutmeg', 'Herbs'],
    chefNotes: 'A pinch of freshly grated nutmeg in the béchamel sauce elevates the flavor profile of the baked vegetables immensely.',
    pairing: 'Dry Chenin Blanc'
  },
  {
    id: 11,
    name: 'Gourmet Mushroom Risotto',
    category: 'continental',
    price: 24,
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Slow-cooked Arborio rice with wild forest mushrooms, finished with white truffle.',
    longDescription: 'Rich and creamy Italian Arborio rice slowly cooked by incorporating hot mushroom-vegetable broth ladle by ladle. Loaded with sautéed wild forest mushrooms (shiitake, oyster, and button) and finished with premium butter, freshly grated Grana Padano parmesan cheese, and a light drizzle of white truffle oil.',
    tags: ['Vegetarian', 'Gluten-Free'],
    ingredients: ['Arborio Rice', 'Wild Mushrooms', 'Grana Padano', 'Vegetable Broth', 'Truffle Oil'],
    chefNotes: 'Stirring the rice continuously releases its starches, which creates the signature luxurious, creamy sauce without needing heavy cream.',
    pairing: 'Pinot Noir or a dry, earthy Barolo'
  },
  {
    id: 12,
    name: 'Herb-Grilled Chicken Steak',
    category: 'continental',
    price: 26,
    image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Herb-marinated chicken breast served with peppercorn sauce and mashed potatoes.',
    longDescription: 'Tender chicken breast marinated in fresh rosemary, thyme, garlic, and olive oil, grilled to juicy perfection. Served over a bed of creamy, buttery whipped Idaho potatoes, accompanied by a serving of pan-sautéed seasonal vegetables and a rich, velvety black peppercorn reduction sauce.',
    tags: ['Gluten-Free'],
    ingredients: ['Chicken Breast', 'Rosemary', 'Thyme', 'Black Peppercorns', 'Mashed Potatoes', 'Seasonal Veg'],
    chefNotes: 'Letting the chicken rest for 5 minutes after grilling keeps the juices locked inside, ensuring it stays exceptionally tender.',
    pairing: 'Medium-bodied Syrah or a smooth oaked Chardonnay'
  },
  {
    id: 13,
    name: 'Spaghetti Aglio e Olio',
    category: 'continental',
    price: 20,
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Classic spaghetti tossed in premium olive oil, garlic, and red chili flakes.',
    longDescription: 'A beautifully simple and authentic Italian pasta dish. Al dente spaghetti tossed in a generous amount of extra virgin olive oil infused with slowly toasted garlic slivers, spicy dried red chili flakes, and fresh flat-leaf parsley. Garnished with a light dusting of aged parmesan.',
    tags: ['Vegetarian', 'Vegan'],
    ingredients: ['Spaghetti', 'Extra Virgin Olive Oil', 'Garlic', 'Chili Flakes', 'Flat Parsley', 'Parmesan'],
    chefNotes: 'Adding a splash of starchy pasta water to the olive oil and garlic creates a smooth emulsion that coats the spaghetti perfectly.',
    pairing: 'Crisp Pinot Grigio or Vermentino'
  },
  {
    id: 14,
    name: 'Artisanal Paneer Steak',
    category: 'indian',
    price: 23,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Pan-seared spiced cottage cheese steak served over spiced tomato reduction.',
    longDescription: 'A gorgeous fusion dish featuring a thick, block-cut artisanal cottage cheese (paneer) steak marinated in warm tandoori spices and pan-seared. Served over a pool of velvety, spiced tomato-cashew butter reduction, and garnished with sautéed bell pepper ribbons and fresh micro-greens.',
    tags: ['Vegetarian', 'Gluten-Free'],
    ingredients: ['Cottage Cheese (Paneer)', 'Spiced Marinade', 'Tomato Butter Sauce', 'Bell Peppers', 'Micro-greens'],
    chefNotes: 'We lightly score the paneer steak before marinating to allow the spices and yogurt to penetrate deep into the center.',
    pairing: 'Dry Rosé or a chilled Viognier'
  },
  {
    id: 15,
    name: 'Royal Lamb Shank Korma',
    category: 'indian',
    price: 32,
    image: 'https://images.unsplash.com/photo-1514516345957-556ca7d90a29?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Slow-cooked tender lamb shank in a rich, cardamom-cashew korma gravy.',
    longDescription: 'A culinary masterpiece originating from the royal Mughal courts. A whole tender lamb shank is slow-cooked for 6 hours in a rich, fragrant gravy made of caramelized onions, yogurt, toasted cashews, and a spice blend highlighted by green cardamom and mace. Garnished with toasted almond slivers.',
    tags: ['Gluten-Free'],
    ingredients: ['Lamb Shank', 'Korma Gravy', 'Green Cardamom', 'Mace', 'Cashews', 'Almond Slivers'],
    chefNotes: 'The slow, low-temperature braising breaks down the collagen in the lamb shank, making it literally fall off the bone.',
    pairing: 'Full-bodied Cabernet Sauvignon or a vintage Syrah'
  },
  {
    id: 16,
    name: 'Cardamom Chocolate Gateau',
    category: 'desserts',
    price: 14,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Flourless dark chocolate cake infused with green cardamom, served with kulfi.',
    longDescription: 'A luxurious dessert pairing a rich, flourless dark chocolate gateau (70% Belgian cocoa) infused with freshly crushed green cardamom pods, and a scoop of house-made pistachio and saffron kulfi. Drizzled with warm cardamom-scented caramel sauce and gold dust.',
    tags: ['Vegetarian', 'Gluten-Free'],
    ingredients: ['Belgian Dark Chocolate', 'Green Cardamom', 'Pistachios', 'Saffron', 'Gold Dust'],
    chefNotes: 'The warmth of the cardamom perfectly cuts through the bitterness of the dark chocolate, creating an incredibly balanced palate.',
    pairing: 'Tawny Port or a hot Cardamom Chai'
  },
  {
    id: 17,
    name: 'Deconstructed Shahi Tukda',
    category: 'desserts',
    price: 15,
    image: 'https://images.unsplash.com/photo-1605697040359-161db06ff7c9?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Saffron-soaked crisp brioche topped with condensed milk rabri and silver leaf.',
    longDescription: 'An elegant interpretation of the royal dessert. Crispy, ghee-fried artisanal brioche points are soaked in a warm saffron and cardamom sugar syrup. Draped in thick, slow-reduced condensed milk (rabri) infused with almond slivers, and finished with delicate edible silver leaf (vark) and wild rose petal dust.',
    tags: ['Vegetarian'],
    ingredients: ['Brioche Bread', 'Desi Ghee', 'Reduced Milk (Rabri)', 'Almonds', 'Edible Silver Leaf'],
    chefNotes: 'We deconstruct the classic heavy dish by serving the rabri chilled against the warm, crisp brioche, offering an engaging temperature contrast.',
    pairing: 'Late Harvest Riesling or Sweet Sauternes'
  },
  {
    id: 18,
    name: 'Gulab Jamun Cheesecake',
    category: 'desserts',
    price: 16,
    image: 'https://images.unsplash.com/photo-1524351199679-46cddf530c04?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Baked New York-style cheesecake layered with saffron-soaked gulab jamuns.',
    longDescription: 'An exquisite fusion dessert that combines the rich, creamy texture of a classic baked New York-style cream cheese cake with the aromatic sweetness of Indian heritage. Layered with soft, saffron-and-cardamom-soaked gulab jamuns inside a buttery biscuit crust. Finished with a drizzle of rose syrup and crushed pistachios.',
    tags: ['Vegetarian'],
    ingredients: ['Cream Cheese', 'Gulab Jamuns', 'Biscuit Crust', 'Rose Syrup', 'Pistachios', 'Saffron'],
    chefNotes: 'Baking the gulab jamuns directly into the cheesecake batter requires a water bath to keep the cheesecake silky smooth and crack-free.',
    pairing: 'Sauternes or a sparkling Moscato d\'Asti'
  },
  {
    id: 19,
    name: 'Rose Cardamom Elixir',
    category: 'drinks',
    price: 10,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Refreshing fusion of fresh mint, rose syrup, cardamom, and sparkling soda.',
    longDescription: 'An exquisite, highly refreshing mocktail. Built over crushed ice, it features muddled fresh organic spearmint, lime wheels, and crushed green cardamom pods. Balanced with our house-made organic Damascus rose petal syrup and topped with premium carbonated tonic water. Served in a gold-rimmed goblet.',
    tags: ['Vegan', 'Vegetarian', 'Gluten-Free'],
    ingredients: ['Organic Rose Syrup', 'Mint Leaves', 'Green Cardamom Pods', 'Lime', 'Sparkling Soda'],
    chefNotes: 'Muddle the cardamom gently to release the essential oils without crushing the bitter seeds inside.',
    pairing: 'Complements spicy appetizers perfectly'
  },
  {
    id: 20,
    name: 'Truffle Malai Soya Chaap',
    category: 'indian',
    price: 19,
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Soy chops marinated in a rich cream, cashew, and cheese blend, clay-oven roasted with truffle oil.',
    longDescription: 'Premium soy chops marinated in a luxurious mixture of fresh cream, cashew paste, cream cheese, and green cardamom. Chargrilled in the clay tandoor and finished with a generous drizzle of white truffle oil and fresh coriander. Served with mint chutney.',
    tags: ['Vegetarian'],
    ingredients: ['Soy Chops', 'Fresh Cream', 'Cashew Paste', 'Cream Cheese', 'Truffle Oil', 'Mint Chutney'],
    chefNotes: 'The white truffle oil adds an earthy, luxurious depth that elevates the traditional street food into a fine-dining delicacy.',
    pairing: 'Chilled Viognier or a light Pinot Noir'
  },
  {
    id: 21,
    name: 'Mughlai Lamb Galouti Kebab',
    category: 'indian',
    price: 24,
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Melt-in-your-mouth minced lamb patties smoked with cloves, served on saffron parathas.',
    longDescription: 'Originating from the royal kitchens of Awadh, these incredibly tender minced lamb patties are finely ground with papaya paste and a secret blend of 15 royal spices. Smoked with ghee and cloves, pan-seared, and served on top of miniature saffron-infused parathas.',
    tags: ['Gluten-Free'],
    ingredients: ['Minced Lamb', 'Raw Papaya', 'Secret Awadhi Spices', 'Saffron Paratha', 'Desi Ghee', 'Cloves'],
    chefNotes: 'The texture is so delicate that the kebab should literally melt in the mouth. Handle gently during searing.',
    pairing: 'Full-bodied Shiraz or a vintage Merlot'
  },
  {
    id: 22,
    name: 'Saffron Lobster Thermidor',
    category: 'continental',
    price: 38,
    image: 'https://images.unsplash.com/photo-1553618551-fba689030290?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Lobster meat cooked in a creamy saffron-cognac sauce, baked in shell with Gruyère.',
    longDescription: 'A classic French luxury preparation. Tender lobster tail meat is poached, diced, and folded into a rich, velvety velouté sauce infused with Kashmiri saffron, French cognac, English mustard, and fresh tarragon. Placed back in the lobster shell, topped with grated Gruyère cheese, and broiled until golden.',
    tags: ['Gluten-Free'],
    ingredients: ['Lobster Tail', 'Kashmiri Saffron', 'Cognac', 'Gruyère Cheese', 'Tarragon', 'Mustard'],
    chefNotes: 'Saffron adds a beautiful golden hue and a subtle floral aroma that pairs perfectly with the rich sweetness of the lobster.',
    pairing: 'Oaked Chardonnay or Champagne'
  },
  {
    id: 23,
    name: 'Pistachio Baklava Cheesecake',
    category: 'desserts',
    price: 17,
    image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Baked cardamom cheesecake layered over a crispy, honey-soaked pistachio baklava base.',
    longDescription: 'An exceptional fusion dessert. The base features multiple layers of flaky, butter-brushed phyllo pastry stuffed with spiced, crushed pistachios and soaked in orange blossom honey. It is topped with a smooth, baked cream cheese layer lightly scented with green cardamom and finished with whole pistachios.',
    tags: ['Vegetarian'],
    ingredients: ['Phyllo Pastry', 'Pistachios', 'Orange Blossom Honey', 'Cream Cheese', 'Cardamom', 'Butter'],
    chefNotes: 'Bake the cheesecake slowly at a lower temperature to ensure the baklava base remains crisp while the cheesecake achieves a velvety texture.',
    pairing: 'Sweet Tokaji or Turkish Coffee'
  },
  {
    id: 24,
    name: 'Smoked Rosemary Old Fashioned',
    category: 'drinks',
    price: 12,
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Sophisticated mocktail featuring oak-smoked rosemary, orange bitters, and maple syrup.',
    longDescription: 'A refined, non-alcoholic cocktail with deep woodsy notes. We muddle caramelized orange wheels with pure maple syrup and aromatic bitters. Shaken with ice, strained over a single large clear ice sphere, and served in an oak-smoked double Old Fashioned glass with a smoldering rosemary sprig.',
    tags: ['Vegan', 'Vegetarian', 'Gluten-Free'],
    ingredients: ['Fresh Rosemary', 'Orange Bitters', 'Maple Syrup', 'Oak Wood Smoke', 'Orange Wheel'],
    chefNotes: 'We trap the smoke of burning oak wood inside the serving glass right before pouring, giving it a rich, campfire aroma.',
    pairing: 'Complements rich, smoked main courses'
  }
];

export default function Menu({ selectedDishes, setSelectedDishes }) {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('');
  const [selectedDish, setSelectedDish] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch('/api/menu');
        if (res.ok) {
          const data = await res.json();
          setMenuItems(data);
        } else {
          throw new Error('Failed to fetch menu');
        }
      } catch (err) {
        console.warn('Using fallback local menu items:', err);
        setMenuItems(MENU_ITEMS);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);
  const categories = [
    { id: 'all', name: 'All Selections' },
    { id: 'indian', name: 'Indian Specialties' },
    { id: 'continental', name: 'Continental Selections' },
    { id: 'desserts', name: 'Exquisite Desserts' },
    { id: 'drinks', name: 'Artisanal Drinks' }
  ];

  const diets = ['Vegetarian', 'Vegan', 'Gluten-Free'];

  // Filter logic
  const filteredMenu = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiet = !selectedDiet || item.tags.includes(selectedDiet);
    
    return matchesCategory && matchesSearch && matchesDiet;
  });

  // Dynamic selection logic
  const getSelectedDishesCount = () => {
    return Object.values(selectedDishes).reduce((a, b) => a + b, 0);
  };

  const getSelectedDishesTotal = () => {
    return Object.entries(selectedDishes).reduce((total, [id, qty]) => {
      const item = menuItems.find(dish => dish.id === parseInt(id));
      return total + (item ? item.price * qty : 0);
    }, 0);
  };

  const updateDishQuantity = (dishId, change) => {
    setSelectedDishes(prev => {
      const updated = { ...prev };
      const currentQty = updated[dishId] || 0;
      const newQty = currentQty + change;
      if (newQty <= 0) {
        delete updated[dishId];
      } else {
        updated[dishId] = newQty;
      }
      return updated;
    });
  };

  // Limit displayed items to 6 if collapsed
  const displayedMenu = isExpanded ? filteredMenu : filteredMenu.slice(0, 6);

  return (
    <section id="menu" className="menu-section section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Our Culinary Creations</span>
          <h2 className="section-title">The Culinary Menu</h2>
        </div>

        {/* Filter Controls Bar */}
        <div className="menu-controls glass-panel">
          {/* Category Tabs */}
          <div className="category-tabs">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setIsExpanded(false); // Reset expansion on tab change
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="filter-actions">
            {/* Search Input */}
            <div className="search-wrapper">
              <Search className="search-icon" size={18} />
              <input
                type="text"
                placeholder="Search culinary items..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsExpanded(true); // Auto-expand when searching
                }}
                className="menu-search-input"
              />
              {searchQuery && (
                <button className="clear-search" onClick={() => setSearchQuery('')}>
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Diet Dropdown */}
            <div className="diet-select-wrapper">
              <select
                value={selectedDiet}
                onChange={(e) => {
                  setSelectedDiet(e.target.value);
                  setIsExpanded(true); // Auto-expand when filtering diet
                }}
                className="diet-select"
              >
                <option value="">All Dietary Needs</option>
                {diets.map(diet => (
                  <option key={diet} value={diet}>{diet}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        {displayedMenu.length > 0 ? (
          <div className="menu-container-block">
            <div className="menu-grid">
              {displayedMenu.map(dish => {
                const qty = selectedDishes[dish.id] || 0;
                const isSelected = qty > 0;
                
                return (
                  <div 
                    key={dish.id} 
                    className={`menu-card glass-panel glow-gold-hover animate-fade-in-up ${isSelected ? 'selected-card' : ''}`}
                    onClick={() => setSelectedDish(dish)}
                  >
                    <div className="menu-card-img-wrapper">
                      <img src={dish.image} alt={dish.name} loading="lazy" />
                      <span className="menu-card-price">${dish.price}</span>
                    </div>
                    
                    <div className="menu-card-content">
                      <div className="menu-card-tags">
                        {dish.tags.map(tag => (
                          <span key={tag} className="menu-tag">
                            {tag === 'Vegetarian' && <Leaf size={12} className="tag-icon veg" />}
                            {tag === 'Vegan' && <Leaf size={12} className="tag-icon vegan" />}
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <h3 className="menu-card-title">{dish.name}</h3>
                      <p className="menu-card-desc">{dish.shortDescription}</p>
                      
                      <div className="menu-card-footer" onClick={(e) => e.stopPropagation()}>
                        <span className="view-details-btn" onClick={() => setSelectedDish(dish)}>
                          <Info size={14} style={{ marginRight: '6px' }} />
                          Details
                        </span>
                        
                        <div className="selection-action-container">
                          {isSelected ? (
                            <div className="qty-selector">
                              <button className="qty-btn" onClick={() => updateDishQuantity(dish.id, -1)} aria-label="Decrease quantity">
                                <Minus size={12} />
                              </button>
                              <span className="qty-val">{qty}</span>
                              <button className="qty-btn" onClick={() => updateDishQuantity(dish.id, 1)} aria-label="Increase quantity">
                                <Plus size={12} />
                              </button>
                            </div>
                          ) : (
                            <button className="select-dish-btn" onClick={() => updateDishQuantity(dish.id, 1)}>
                              Select
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* View More / Collapse Toggle Button */}
            {filteredMenu.length > 6 && (
              <div className="menu-expand-container text-center animate-fade-in-up">
                <button 
                  type="button" 
                  className="btn-primary menu-expand-btn" 
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? (
                    <>
                      Collapse Menu
                      <ChevronUp size={16} style={{ marginLeft: '8px' }} />
                    </>
                  ) : (
                    <>
                      Explore Full Menu ({filteredMenu.length} items)
                      <ChevronDown size={16} style={{ marginLeft: '8px' }} />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="no-results glass-panel">
            <Search size={32} className="no-results-icon" />
            <h3>No Culinary Delights Found</h3>
            <p>Try resetting your filters or search terms to explore other exquisite creations.</p>
            <button 
              className="btn-secondary" 
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setSelectedDiet('');
                setIsExpanded(false);
              }}
              style={{ marginTop: '1.5rem' }}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Expanded Dish Details Modal */}
      {selectedDish && (
        <div className="modal-overlay" onClick={() => setSelectedDish(null)}>
          <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedDish(null)} aria-label="Close details">
              <X size={22} />
            </button>
            
            <div className="modal-body-grid">
              {/* Modal Left Column: Image */}
              <div className="modal-visual">
                <img src={selectedDish.image} alt={selectedDish.name} />
                <div className="modal-visual-overlay">
                  <span className="modal-price">${selectedDish.price}</span>
                </div>
              </div>

              {/* Modal Right Column: Detailed Info */}
              <div className="modal-info-wrapper">
                <div className="modal-tags">
                  {selectedDish.tags.map(tag => (
                    <span key={tag} className="menu-tag">
                      {tag === 'Vegetarian' && <Leaf size={12} className="tag-icon veg" />}
                      {tag === 'Vegan' && <Leaf size={12} className="tag-icon vegan" />}
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h2 className="modal-title">{selectedDish.name}</h2>
                <p className="modal-long-desc">{selectedDish.longDescription}</p>
                
                <div className="modal-details-section">
                  <h4>Ingredients</h4>
                  <div className="ingredients-list">
                    {selectedDish.ingredients.map(ing => (
                      <span key={ing} className="ingredient-tag">{ing}</span>
                    ))}
                  </div>
                </div>
                
                <div className="modal-details-section chef-notes-box">
                  <h4>Chef's Note</h4>
                  <p>"{selectedDish.chefNotes}"</p>
                </div>
                
                <div className="modal-details-section pairing-box">
                  <h4>Sommelier Recommendation</h4>
                  <p>{selectedDish.pairing}</p>
                </div>

                {/* Modal Action in Details */}
                <div className="modal-action-bar">
                  <span className="action-price">Estimated Price: <strong>${selectedDish.price}</strong></span>
                  {selectedDishes[selectedDish.id] > 0 ? (
                    <div className="modal-qty-selector">
                      <button className="qty-btn" onClick={() => updateDishQuantity(selectedDish.id, -1)}>
                        <Minus size={14} />
                      </button>
                      <span className="qty-val">{selectedDishes[selectedDish.id]} selected</span>
                      <button className="qty-btn" onClick={() => updateDishQuantity(selectedDish.id, 1)}>
                        <Plus size={14} />
                      </button>
                    </div>
                  ) : (
                    <button className="btn-primary select-modal-btn" onClick={() => updateDishQuantity(selectedDish.id, 1)}>
                      Select For Dinner
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Cart / Culinary Planner Badge */}
      {getSelectedDishesCount() > 0 && (
        <div className="planner-floating-badge animate-fade-in-up" onClick={() => setShowDrawer(true)}>
          <div className="badge-content">
            <div className="badge-sparkle-box">
              <Flame size={16} className="badge-sparkle" />
            </div>
            <span className="badge-label">My Dinner Selection</span>
            <span className="badge-count">{getSelectedDishesCount()}</span>
            <span className="badge-divider">|</span>
            <span className="badge-price">${getSelectedDishesTotal()}</span>
          </div>
        </div>
      )}

      {/* Culinary Planner Slider Drawer */}
      {showDrawer && (
        <div className="planner-drawer-overlay" onClick={() => setShowDrawer(false)}>
          <div className="planner-drawer glass-panel" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div className="drawer-title-box">
                <Flame size={18} className="gold-text" />
                <h3>Dinner Selection</h3>
              </div>
              <button className="drawer-close" onClick={() => setShowDrawer(false)} aria-label="Close Selection">
                <X size={20} />
              </button>
            </div>
            
            <div className="drawer-items">
              {Object.entries(selectedDishes).map(([id, qty]) => {
                const dish = menuItems.find(item => item.id === parseInt(id));
                if (!dish) return null;
                return (
                  <div key={dish.id} className="drawer-item">
                    <div className="drawer-item-img">
                      <img src={dish.image} alt={dish.name} />
                    </div>
                    <div className="drawer-item-info">
                      <h4>{dish.name}</h4>
                      <span className="drawer-item-price">${dish.price} each</span>
                    </div>
                    <div className="drawer-item-actions">
                      <button className="drawer-qty-btn" onClick={() => updateDishQuantity(dish.id, -1)}>
                        <Minus size={10} />
                      </button>
                      <span className="drawer-qty-val">{qty}</span>
                      <button className="drawer-qty-btn" onClick={() => updateDishQuantity(dish.id, 1)}>
                        <Plus size={10} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="drawer-footer">
              <div className="drawer-total">
                <span>Estimated Total:</span>
                <span className="total-val">${getSelectedDishesTotal()}</span>
              </div>
              <p className="drawer-note">We will attach these selections directly to your VIP table reservation pass below.</p>
              <button 
                className="btn-primary proceed-btn" 
                onClick={() => {
                  setShowDrawer(false);
                  document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Proceed to Reservation
                <ArrowRight size={16} style={{ marginLeft: '8px' }} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
