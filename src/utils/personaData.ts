
// Spotify playlist data with multiple options per persona
export const spotifyPlaylists = {
  "The Hustler": [
    {
      name: "Hustle Mode On",
      description: "Upbeat tracks to keep your productivity high all day.",
      tracks: ["Power Up by Imagine Dragons", "Work from Home by Fifth Harmony", "9 to 5 by Dolly Parton"]
    },
    {
      name: "Productivity Boost",
      description: "High-energy tracks to fuel your workday.",
      tracks: ["Eye of the Tiger by Survivor", "Can't Stop by Red Hot Chili Peppers", "Harder Better Faster Stronger by Daft Punk"]
    },
    {
      name: "Focus Flow",
      description: "Get in the zone with these concentration-enhancing tracks.",
      tracks: ["Blinding Lights by The Weeknd", "High Hopes by Panic! At The Disco", "Believer by Imagine Dragons"]
    }
  ],
  "The Dreamer": [
    {
      name: "Creative Flow",
      description: "Ambient melodies to inspire your imagination.",
      tracks: ["Dreams by Fleetwood Mac", "Imagine by John Lennon", "Daydreamer by Adele"]
    },
    {
      name: "Imagination Station",
      description: "Drift away with these dreamy soundscapes.",
      tracks: ["Stardust by Music Sounds Better With You", "Porcelain by Moby", "Moon by Jonny Greenwood"]
    },
    {
      name: "Inspiration Soundtrack",
      description: "Fuel your creativity with these inspiring melodies.",
      tracks: ["Weightless by Marconi Union", "Experience by Ludovico Einaudi", "The Hours by Philip Glass"]
    }
  ],
  "The Socialite": [
    {
      name: "Social Vibes",
      description: "Fun tracks for gathering with friends and making memories.",
      tracks: ["Good Time by Owl City & Carly Rae Jepsen", "We Are Young by Fun", "Uptown Funk by Mark Ronson ft. Bruno Mars"]
    },
    {
      name: "Party Starter",
      description: "Kickstart any social gathering with these crowd-pleasers.",
      tracks: ["Don't Start Now by Dua Lipa", "Blinding Lights by The Weeknd", "Levitating by Dua Lipa"]
    },
    {
      name: "Hangout Hits",
      description: "The perfect soundtrack for your next get-together.",
      tracks: ["I Gotta Feeling by Black Eyed Peas", "Can't Stop the Feeling by Justin Timberlake", "24K Magic by Bruno Mars"]
    }
  ],
  "The Zen Master": [
    {
      name: "Mindful Moments",
      description: "Peaceful melodies for mindfulness and relaxation.",
      tracks: ["Zen Garden by Enya", "Breathe by Télépopmusik", "Meditation by Hans Zimmer"]
    },
    {
      name: "Calm Collection",
      description: "Find your inner peace with these serene tracks.",
      tracks: ["Weightless by Marconi Union", "Gymnopédie No.1 by Erik Satie", "Light Through the Veins by Jon Hopkins"]
    },
    {
      name: "Tranquility Tunes",
      description: "Gentle sounds to help you unwind and find balance.",
      tracks: ["Bloom by Odesza", "Intro by The xx", "Avril 14th by Aphex Twin"]
    }
  ],
  "The Adventurer": [
    {
      name: "Adventure Awaits",
      description: "Songs to fuel your next journey and exploration.",
      tracks: ["On Top Of The World by Imagine Dragons", "The Wanderer by Dion", "Life Is A Highway by Rascal Flatts"]
    },
    {
      name: "Explorer's Anthem",
      description: "Soundtrack your next adventure with these energetic tracks.",
      tracks: ["Send Me On My Way by Rusted Root", "Walking on a Dream by Empire of the Sun", "Born to Run by Bruce Springsteen"]
    },
    {
      name: "Discovery Channel",
      description: "Music for those who never stop exploring.",
      tracks: ["Go Your Own Way by Fleetwood Mac", "Around the World by Daft Punk", "Where the Streets Have No Name by U2"]
    }
  ]
};

// Motivational quotes with multiple options per persona
export const motivationalQuotes = {
  "The Hustler": [
    "The future belongs to those who believe in the beauty of their dreams.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Don't watch the clock; do what it does. Keep going.",
    "The only way to do great work is to love what you do."
  ],
  "The Dreamer": [
    "Every great dream begins with a dreamer.",
    "All our dreams can come true, if we have the courage to pursue them.",
    "The biggest adventure you can take is to live the life of your dreams.",
    "Dream big and dare to fail."
  ],
  "The Socialite": [
    "Surround yourself with those who make you happy.",
    "Happiness is only real when shared.",
    "The best part of life is the people we meet.",
    "Good friends, good books, and a sleepy conscience: this is the ideal life."
  ],
  "The Zen Master": [
    "Peace comes from within. Do not seek it without.",
    "The present moment is filled with joy and happiness. If you are attentive, you will see it.",
    "Silence is sometimes the best answer.",
    "Quiet the mind, and the soul will speak."
  ],
  "The Adventurer": [
    "Life begins at the end of your comfort zone.",
    "Adventure may hurt you, but monotony will kill you.",
    "The journey, not the arrival, matters.",
    "To travel is to live."
  ]
};

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
