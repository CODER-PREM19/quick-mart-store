const products = [
  // ==========================================
  // 1. HOME & KITCHEN APPLIANCES (Indian Household Must-Haves)
  // ==========================================
  {
    name: 'Preethi Zodiac Cosmo 750W Mixer Grinder with 5 Jars',
    image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&auto=format&fit=crop&q=80',
    description:
      'High-performance 750W Vega W5 motor capable of grinding tough turmeric in 2 minutes. Includes Master Chef Plus jar for atta kneading, slicing, grating, citrus juicing, and purees.',
    brand: 'Preethi',
    category: 'Home Appliances',
    price: 7499,
    countInStock: 12,
    rating: 4.8,
    numReviews: 45,
  },
  {
    name: 'Hawkins Contura 3L Hard Anodised Inner Lid Pressure Cooker',
    image: 'https://images.unsplash.com/photo-1584990347449-399778c187f5?w=800&auto=format&fit=crop&q=80',
    description:
      'Hard anodised non-reactive body with 3.25mm thick base. Curved body for easy stirring of dals, curries, and sabzis. Stays looking new for years.',
    brand: 'Hawkins',
    category: 'Home Appliances',
    price: 1750,
    countInStock: 25,
    rating: 4.9,
    numReviews: 68,
  },
  {
    name: 'Philips 2100W Induction Cooktop with Indian Menu Presets',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80',
    description:
      'Programmed for Indian cooking with dedicated 1-touch buttons for Roti/Dosa, Gravy, Deep Fry, Idli, and Milk Boiling. Fast electromagnetic induction heating.',
    brand: 'Philips',
    category: 'Home Appliances',
    price: 2999,
    countInStock: 15,
    rating: 4.7,
    numReviews: 38,
  },
  {
    name: 'Pigeon Kessel 1.2L Stainless Steel Multi-Purpose Electric Kettle',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80',
    description:
      'Ideal for quick morning Masala Chai, boiling eggs, preparing instant Maggi, and hot water. Features 360-degree swivel base and hygienic stainless steel interior.',
    brand: 'Pigeon',
    category: 'Home Appliances',
    price: 899,
    countInStock: 30,
    rating: 4.6,
    numReviews: 52,
  },
  {
    name: 'Prestige 800W Non-Stick Sandwich & Grill Toaster',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
    description:
      'Durable die-cast aluminium grill plates with non-stick coating. Perfect for crispy Bombay Veg Grilled Sandwiches and Paneer toast in minutes.',
    brand: 'Prestige',
    category: 'Home Appliances',
    price: 1299,
    countInStock: 20,
    rating: 4.5,
    numReviews: 29,
  },

  // ==========================================
  // 2. DAILY GROCERIES & INDIAN STAPLES
  // ==========================================
  {
    name: 'Aashirvaad Shuddh Chakki Whole Wheat Atta (10kg)',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80',
    description:
      '100% pure whole wheat grain grounded through traditional 4-step chakki process. High in natural dietary fiber for soft, fluffy rotis that stay fresh longer.',
    brand: 'Aashirvaad',
    category: 'Groceries',
    price: 449,
    countInStock: 60,
    rating: 4.9,
    numReviews: 124,
  },
  {
    name: 'India Gate Classic Aged Basmati Rice (5kg Bag)',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop&q=80',
    description:
      'Aged for 2 years for signature aroma, pearly white slender grains, and non-sticky elongation. Ideal for festive Biryani, Pulao, and Jeera Rice.',
    brand: 'India Gate',
    category: 'Groceries',
    price: 820,
    countInStock: 45,
    rating: 4.9,
    numReviews: 89,
  },
  {
    name: 'Amul Pure Cow Ghee 1 Litre Tin',
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=800&auto=format&fit=crop&q=80',
    description:
      'Made from fresh cow milk cream with rich granular (daanedaar) texture and golden aroma. Essential for tempering dals, parathas, and traditional sweets.',
    brand: 'Amul',
    category: 'Groceries',
    price: 595,
    countInStock: 40,
    rating: 4.9,
    numReviews: 95,
  },
  {
    name: 'Tata Sampann Unpolished Toor Dal (Arhar Dal - 1kg)',
    image: 'https://images.unsplash.com/photo-1585994192701-f1a505c817ea?w=800&auto=format&fit=crop&q=80',
    description:
      'Rich in natural protein, dietary fiber, and unpolished to retain essential minerals and authentic taste. Daily staple for aromatic Dal Tadka and Sambar.',
    brand: 'Tata Sampann',
    category: 'Groceries',
    price: 175,
    countInStock: 50,
    rating: 4.7,
    numReviews: 61,
  },
  {
    name: 'Fortune Sunlite Refined Sunflower Cooking Oil (5L Can)',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&auto=format&fit=crop&q=80',
    description:
      'Light and easy to digest cooking oil enriched with Vitamins A and D. High smoke point ideal for everyday tadka, poori frying, and sabzi preparation.',
    brand: 'Fortune',
    category: 'Groceries',
    price: 680,
    countInStock: 35,
    rating: 4.8,
    numReviews: 73,
  },
  {
    name: 'Tata Salt Vacuum Evaporated Iodised Salt (1kg Pouch)',
    image: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=800&auto=format&fit=crop&q=80',
    description:
      'Desh Ka Namak! Vacuum evaporated for highest purity and guaranteed iodine content to support healthy mental and physical development.',
    brand: 'Tata Salt',
    category: 'Groceries',
    price: 28,
    countInStock: 100,
    rating: 5.0,
    numReviews: 180,
  },
  {
    name: 'Everest Royal Garam Masala & Turmeric (Haldi) Powder Combo (200g each)',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=80',
    description:
      'Authentic blend of 13 aromatic spices crafted for deep North and South Indian curries, paired with pure high-curcumin golden haldi powder.',
    brand: 'Everest',
    category: 'Groceries',
    price: 145,
    countInStock: 55,
    rating: 4.8,
    numReviews: 64,
  },

  // ==========================================
  // 3. SNACKS & CHAI / BEVERAGES
  // ==========================================
  {
    name: 'Tata Tea Gold CTC Tea with 15% Long Leaves (1kg Pack)',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80',
    description:
      'Exquisite blend of strong Granular Assam CTC tea leaves with gently rolled aromatic long leaves. Creates the ultimate refreshing morning kadak chai.',
    brand: 'Tata Tea',
    category: 'Snacks & Beverages',
    price: 520,
    countInStock: 45,
    rating: 4.9,
    numReviews: 112,
  },
  {
    name: 'Maggi 2-Minute Masala Instant Noodles (Pack of 12)',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=800&auto=format&fit=crop&q=80',
    description:
      'India’s favourite 2-minute snack with iconic blend of 10 roasted spices. Fortified with Iron for a quick after-school or late-night bite.',
    brand: 'Nestle',
    category: 'Snacks & Beverages',
    price: 168,
    countInStock: 80,
    rating: 4.9,
    numReviews: 210,
  },
  {
    name: 'Haldiram’s Nagpur Aloo Bhujia Crispy Namkeen (400g Pouch)',
    image: 'https://images.unsplash.com/photo-1508061252445-5350f31d8cdd?w=800&auto=format&fit=crop&q=80',
    description:
      'Spicy mint-infused potato and gram flour sev fried in pure vegetable oil. The classic crunchy tea-time companion for every Indian home.',
    brand: 'Haldiram',
    category: 'Snacks & Beverages',
    price: 115,
    countInStock: 70,
    rating: 4.8,
    numReviews: 95,
  },
  {
    name: 'Britannia Good Day Cashew Cookies (Pack of 6)',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop&q=80',
    description:
      'Loaded with crunchy roasted cashews and rich dairy butter. Baked to golden perfection with signature smiling grooves.',
    brand: 'Britannia',
    category: 'Snacks & Beverages',
    price: 120,
    countInStock: 65,
    rating: 4.7,
    numReviews: 83,
  },
  {
    name: 'Nescafe Classic 100% Pure Instant Coffee Jar (100g)',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
    description:
      'Crafted from finest South Indian Robusta beans, slow-roasted to deliver deep aroma and bold flavour for beaten hot coffee or chilled frappe.',
    brand: 'Nescafe',
    category: 'Snacks & Beverages',
    price: 245,
    countInStock: 50,
    rating: 4.8,
    numReviews: 76,
  },
  {
    name: 'Haldiram’s Traditional Gulab Jamun Tin (1kg)',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&auto=format&fit=crop&q=80',
    description:
      'Melt-in-mouth soft khoya dumplings soaked in rose and cardamom infused sugar syrup. Ready to serve sweet indulgence for family celebrations.',
    brand: 'Haldiram',
    category: 'Snacks & Beverages',
    price: 220,
    countInStock: 40,
    rating: 4.8,
    numReviews: 54,
  },

  // ==========================================
  // 4. DAILY CLEANING & PUJA ESSENTIALS
  // ==========================================
  {
    name: 'Surf Excel Matic Top Load Detergent Powder (2kg Box)',
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=800&auto=format&fit=crop&q=80',
    description:
      'Formulated with advanced optical brighteners and stain lifters designed specifically for Indian top load washing machines.',
    brand: 'Surf Excel',
    category: 'Daily Essentials',
    price: 410,
    countInStock: 40,
    rating: 4.9,
    numReviews: 88,
  },
  {
    name: 'Vim Dishwash Gel with Real Lemon Juice (750ml Spout Pouch)',
    image: 'https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?w=800&auto=format&fit=crop&q=80',
    description:
      'Concentrated degreaser gel that cleans burnt ghee, oil, and curry stains without scratching delicate non-stick cookware or stainless steel utensils.',
    brand: 'Vim',
    category: 'Daily Essentials',
    price: 145,
    countInStock: 60,
    rating: 4.8,
    numReviews: 71,
  },
  {
    name: 'Cycle Pure Agarbatti & Camphor (Bhimseni Kapoor) Daily Puja Pack',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80',
    description:
      'Natural sandalwood incense sticks with zero chemical dipping, bundled with 100% pure organic Bhimseni Kapoor for morning and evening Aarti.',
    brand: 'Cycle Pure',
    category: 'Daily Essentials',
    price: 199,
    countInStock: 50,
    rating: 4.9,
    numReviews: 63,
  },
  {
    name: 'Dettol Antiseptic Disinfectant Liquid (550ml)',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80',
    description:
      'Iconic multi-purpose disinfectant trusted by Indian households for first aid cuts, floor mopping, laundry sanitization, and personal hygiene.',
    brand: 'Dettol',
    category: 'Daily Essentials',
    price: 215,
    countInStock: 55,
    rating: 4.9,
    numReviews: 104,
  },
];

export default products;
