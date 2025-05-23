
// Daily Coffee Facts
export const coffeeFacts = [
  "Coffee is the world's second most traded commodity, after oil.",
  "NESCAFÉ was created in 1938 to help solve the problem of coffee surplus in Brazil.",
  "A coffee tree produces 1 pound of coffee per year - that's about 4,000 beans.",
  "The world's most expensive coffee is Indonesia's Kopi Luwak, which can cost over $600 per pound.",
  "NESCAFÉ's name comes from the first three letters of Nestlé and 'café'.",
  "Coffee beans are technically seeds, not beans.",
  "One cup of black coffee only contains about 2 calories.",
  "NESCAFÉ plants over 20 million coffee trees annually to support sustainable farming.",
  "The average American drinks 3.1 cups of coffee per day.",
  "Brazil is the world's largest coffee producer.",
  "Coffee is grown in over 50 countries around the world, primarily near the equator.",
  "The first webcam was invented to watch a coffee pot at Cambridge University.",
  "NESCAFÉ works with over 100,000 coffee farmers worldwide.",
  "Decaf coffee still contains a small amount of caffeine.",
  "Coffee was the first food to be freeze-dried.",
  "NESCAFÉ pioneered the freeze-drying process for coffee in the 1960s.",
  "Coffee beans can be used to absorb odors.",
  "The smell of coffee can actually make you feel less stressed.",
  "Finland consumes more coffee per capita than any other country.",
  "NESCAFÉ products are enjoyed in over 180 countries worldwide."
];

// Mini-game data
export const miniGames = [
  {
    id: "bean-catcher",
    name: "Bean Catcher",
    description: "Catch falling coffee beans in your cup! The more you catch, the more Aroma Points you earn.",
    imageUrl: "https://images.unsplash.com/photo-1574914629385-46e8178f0e9f",
    difficulty: "easy",
    rewardPoints: 50
  },
  {
    id: "flavor-match",
    name: "Flavor Match",
    description: "Match pairs of NESCAFÉ flavors before time runs out to earn bonus points.",
    imageUrl: "https://images.unsplash.com/photo-1568649929103-28ffbefaca1e",
    difficulty: "medium",
    rewardPoints: 75
  },
  {
    id: "brew-master",
    name: "Brew Master",
    description: "Create the perfect cup by timing your brew process just right.",
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd",
    difficulty: "hard",
    rewardPoints: 100
  }
];

// Coffee recipes suggestions based on mood
export const moodCoffeeMatches = {
  "Energized": {
    recipe: "Double-Shot NESCAFÉ Gold",
    ingredients: ["2 tsp NESCAFÉ Gold", "Hot water", "Optional: dash of cinnamon"],
    description: "A strong brew to match your high energy and keep you going.",
    aromaPoints: 25
  },
  "Focused": {
    recipe: "NESCAFÉ Classic Americano",
    ingredients: ["1 tsp NESCAFÉ Classic", "Hot water", "Optional: lemon zest"],
    description: "Clean, simple flavor to help maintain your concentration.",
    aromaPoints: 20
  },
  "Relaxed": {
    recipe: "NESCAFÉ Vanilla Latte",
    ingredients: ["1 tsp NESCAFÉ Gold", "Hot milk", "Vanilla extract", "Optional: honey"],
    description: "A smooth, comforting drink to enhance your relaxed state.",
    aromaPoints: 30
  },
  "Tired": {
    recipe: "NESCAFÉ Mocha Boost",
    ingredients: ["2 tsp NESCAFÉ Classic", "Hot water", "1 tsp cocoa powder", "Sugar to taste"],
    description: "The perfect pick-me-up when you need an energy boost.",
    aromaPoints: 35
  },
  "Social": {
    recipe: "NESCAFÉ Caramel Frappé",
    ingredients: ["2 tsp NESCAFÉ Gold", "Ice", "Milk", "Caramel sauce", "Whipped cream"],
    description: "A fun, indulgent drink perfect for social gatherings.",
    aromaPoints: 40
  },
  "Contemplative": {
    recipe: "NESCAFÉ Cardamom Brew",
    ingredients: ["1 tsp NESCAFÉ Classic", "Hot water", "Pinch of cardamom", "Optional: dash of milk"],
    description: "A thoughtful blend with subtle spice to accompany your reflections.",
    aromaPoints: 25
  }
};

// Avatar customization options
export const avatarCustomizations = {
  hairStyles: ["curly", "straight", "wavy", "short", "long", "bald"],
  facialFeatures: ["glasses", "beard", "mustache", "freckles", "none"],
  outfits: ["casual", "business", "sporty", "creative", "relaxed"],
  accessories: ["coffee cup", "laptop", "book", "headphones", "plant", "none"]
};

// Achievement badges
export const achievementBadges = [
  {
    id: "first-brew",
    name: "First Brew",
    description: "Completed your first virtual coffee brewing",
    image: "☕",
    points: 10
  },
  {
    id: "streak-7",
    name: "Week Warrior",
    description: "Maintained a 7-day brewing streak",
    image: "🔥",
    points: 50
  },
  {
    id: "coffee-expert",
    name: "Coffee Connoisseur",
    description: "Tried 10 different coffee recipes",
    image: "👨‍🍳",
    points: 100
  },
  {
    id: "game-master",
    name: "Game Master",
    description: "Scored over 1000 points in mini-games",
    image: "🎮",
    points: 150
  },
  {
    id: "social-butterfly",
    name: "Social Butterfly",
    description: "Shared your coffee persona 5 times",
    image: "🦋",
    points: 75
  },
  {
    id: "fact-finder",
    name: "Fact Finder",
    description: "Read 20 coffee facts",
    image: "📚",
    points: 60
  }
];
