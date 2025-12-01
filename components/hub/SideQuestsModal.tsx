"use client";

import { Brain, Dumbbell, Users, Waves } from "lucide-react";

interface Quadrant {
  icon: React.ReactNode;
  headline: string;
  details: string[];
  badges: string[];
}

const quadrants: Quadrant[] = [
  {
    icon: <Brain className="text-3xl text-cyan-400 mb-2 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />,
    headline: "Mentale & Technische Weiterbildung",
    details: [
      "KI & Automatisierung (Prompt Engineering)",
      "Tech-Deep-Dives: Moderne Frameworks",
      "Modus: Autodidaktik & Selbststudium",
    ],
    badges: ["KI", "Automatisierung", "LifeLongLearning"],
  },
  {
    icon: <Dumbbell className="text-3xl text-cyan-400 mb-2 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />,
    headline: "Körper & Dynamik",
    details: [
      "Fitness: Bodybuilding & Calisthenics",
      "Kampfsport: Boxen / UCC (Technik & Reflexe)",
      "Ride: Harley Davidson Road Glide",
    ],
    badges: ["Fitness", "Boxen", "HarleyDavidson"],
  },
  {
    icon: <Users className="text-3xl text-cyan-400 mb-2 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />,
    headline: "Mensch & Verbindung",
    details: [
      "Family First: Partnerschaft & Balance",
      "Loyalty: Zeit mit Hund (Natur & Ruhe)",
      "Crew: Freundschaft & Erleben",
    ],
    badges: ["Familie", "Hund", "Community"],
  },
  {
    icon: <Waves className="text-3xl text-cyan-400 mb-2 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />,
    headline: "Natur & Reisen",
    details: [
      "Deep Dive: Leidenschaft Tauchen",
      "Scenery: Safari, Dschungel & Küsten",
      "Culture: Perspektivwechsel",
    ],
    badges: ["Tauchen", "Globetrotter", "Nature"],
  },
];

export default function SideQuestsModal() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {quadrants.map((quadrant, index) => (
        <div
          key={index}
          className="bg-white/5 rounded-xl border border-white/10 p-5 flex flex-col"
        >
          {/* Icon */}
          <div className="flex justify-center mb-3">
            {quadrant.icon}
          </div>

          {/* Headline */}
          <h3 className="font-orbitron text-sm font-bold text-white mb-4 text-center">
            {quadrant.headline}
          </h3>

          {/* Details List */}
          <ul className="flex-1 space-y-2 mb-4">
            {quadrant.details.map((detail, detailIndex) => (
              <li
                key={detailIndex}
                className="text-xs text-gray-300 font-sans list-disc list-inside"
              >
                {detail}
              </li>
            ))}
          </ul>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 justify-center mt-auto pt-3 border-t border-white/5">
            {quadrant.badges.map((badge, badgeIndex) => (
              <span
                key={badgeIndex}
                className="bg-cyan-900/30 border border-cyan-500/20 text-[10px] text-cyan-200 rounded-full px-2 py-1"
              >
                #{badge}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

