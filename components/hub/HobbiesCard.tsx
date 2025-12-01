"use client";

interface HobbyCategory {
  category: string;
  icon: string;
  items: {
    title: string;
    description: string;
  }[];
}

const hobbyCategories: HobbyCategory[] = [
  {
    category: "Mentale Interessen & Weiterbildung",
    icon: "🧠",
    items: [
      {
        title: "AI & Automatisierung",
        description: "Künstliche Intelligenz, Automatisierungstechnologien, Prompt-Engineering",
      },
      {
        title: "Tech-Weiterbildung",
        description: "Selbststudium, moderne Tools & Frameworks",
      },
    ],
  },
  {
    category: "Körper & Bewegung",
    icon: "🧘‍♂️",
    items: [
      {
        title: "Fitness & Bodybuilding",
        description: "Kraftsport, Trainingsroutinen, Regeneration",
      },
      {
        title: "Calisthenics",
        description: "Eigengewichtstraining, funktionelle Kraft",
      },
      {
        title: "Boxen / UCC",
        description: "Kampfsport, Fokus & Technik",
      },
      {
        title: "Motorradfahren - Harley Davidson Road Glide 🏍",
        description: "Freiheit auf zwei Rädern, Technik & Erlebnis",
      },
    ],
  },
  {
    category: "Mensch & Verbindung",
    icon: "❤️",
    items: [
      {
        title: "Zeit mit Familie 👨‍👩‍👧",
        description: "Partnerschaft, Lebensbalance",
      },
      {
        title: "Zeit mit Hund 🐕",
        description: "Natur, Ruhe, Bindung",
      },
      {
        title: "Freunde & Gemeinschaft 🧑‍🤝‍🧑",
        description: "Sozialleben, gemeinsame Erlebnisse",
      },
    ],
  },
  {
    category: "Natur & Reisen",
    icon: "🌍",
    items: [
      {
        title: "Tauchen (Leidenschaft) 🐠",
        description: "Unterwasserwelt, Entdeckung, Ruhe",
      },
      {
        title: "Landschaften & Natur erleben 🏞",
        description: "Strände, Safari, Jungle, Wasser",
      },
      {
        title: "Tiere & Kultur 🐘",
        description: "Tierbeobachtungen, Begegnung mit Kulturen",
      },
      {
        title: "Reise-Erlebnisse ✈️",
        description: "Erkundung, Perspektivwechsel, Inspiration",
      },
    ],
  },
];

export default function HobbiesCard() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-cyan-200/80 mb-4">
        Neben der Programmierung beschäftige ich mich mit verschiedenen
        Interessen, die meine Kreativität und Energie aufladen.
      </p>
      
      <div className="space-y-6">
        {hobbyCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{category.icon}</span>
              <h3 className="text-cyan-300 font-semibold text-lg">
                {category.category}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-8">
              {category.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="bg-white/5 border border-cyan-400/30 rounded-lg p-3 hover:bg-white/10 transition-colors"
                >
                  <h4 className="text-cyan-300 font-semibold text-sm mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-cyan-200/70">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-cyan-400/30">
        <p className="text-xs text-cyan-400/70 font-mono">
          &gt; Interessen synchronisiert...
        </p>
      </div>
    </div>
  );
}

