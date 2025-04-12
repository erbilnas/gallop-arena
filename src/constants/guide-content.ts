export const GUIDE_CONTENT = {
  title: 'Welcome to Gazi Koşusu Simulator!',
  subtitle:
    "Gazi Koşusu (Veteran Race) is Turkey's most prestigious horse racing event, established in 1927 in honor of Mustafa Kemal Atatürk, the founder and the father of the Turkish Republic. Experience the thrill of this historic race in our interactive simulator.",

  steps: [
    {
      title: 'Generate Your Stable',
      description:
        'Create your stable of 20 unique racing horses. Each horse will be randomly generated with:',
      items: [
        'A distinctive color for easy identification',
        'A condition score between 1-100 that affects performance',
        'Unique racing characteristics',
      ],
    },
    {
      title: 'Create Race Schedule',
      description: 'Design a comprehensive race schedule featuring 6 challenging rounds:',
      items: [
        'Round 1: 1200 meters - Sprint Challenge',
        'Round 2: 1400 meters - Speed Test',
        'Round 3: 1600 meters - Classic Distance',
        'Round 4: 1800 meters - Endurance Trial',
        'Round 5: 2000 meters - Marathon Run',
        'Round 6: 2200 meters - Ultimate Challenge',
      ],
    },
    {
      title: 'Race Day Experience',
      description: 'Experience the excitement of race day with these features:',
      items: [
        '10 horses compete in each round',
        'Real-time animated horse movements',
        'Dynamic race commentary',
        'Detailed performance statistics',
        'Round-by-round results tracking',
      ],
    },
  ],

  gameMechanics: {
    title: 'Game Mechanics',
    cards: [
      {
        title: 'Horse Selection',
        description:
          '10 horses are randomly selected from your stable of 20 for each race, ensuring variety and strategy in each round.',
      },
      {
        title: 'Performance Factors',
        description:
          'Horse condition scores directly impact their racing performance. Higher condition scores generally lead to better results.',
      },
      {
        title: 'Race Progression',
        description:
          'Races progress automatically once started. You can pause between rounds to analyze results and prepare for the next challenge.',
      },
      {
        title: 'Results Tracking',
        description:
          'Comprehensive results are available after each round, showing detailed performance metrics and standings.',
      },
    ],
  },
} as const
