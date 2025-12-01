"use client";

import "./styles/AboutCard.styles.css";

export default function AboutCard() {
  return (
    <div className="space-y-4 text-cyan-200">
      {/* Avatar Placeholder */}
      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400/20 to-pink-400/20 border-2 border-cyan-400/50 flex items-center justify-center text-4xl">
          👤
        </div>
      </div>
      
      {/* Bio Text */}
      <div className="space-y-3">
        <h2 className="about-card-title">
          Ihr Experte für smarte Softwarelösungen mit KI-Fokus
        </h2>
        <p className="about-card-text">
          Ich befinde mich aktuell in einer zweijährigen Umschulung zum Fachinformatiker für Anwendungsentwicklung (IHK) mit Schwerpunkt auf moderner Softwareentwicklung und zukunftsorientierten Technologien.
        </p>
        <p className="about-card-text">
          Mit Führungserfahrung aus über 27 Jahren in sicherheitsrelevanten und organisatorischen Positionen beim Militär und Sicherheitsdienst sowie einem starken Hintergrund in Fitness- und Sportmanagement verbinde ich Disziplin, strategisches Denken und technisches Interesse.
        </p>
        <p className="about-card-text">
          Mein Ziel: mich kontinuierlich weiterzuentwickeln und mein Wissen in praxisnahen Projekten einzusetzen – mit einem besonderen Interesse an den Bereichen Künstliche Intelligenz, Cloud-Lösungen und moderner Webentwicklung.
        </p>
        <p className="about-card-text">
          Meine Spezialisierung liegt im AI Solution Engineering – der Entwicklung intelligenter, lernfähiger Systeme, die echten Mehrwert schaffen.
        </p>
        <p className="about-card-text">
          Meine Leidenschaft: innovative Technologien einsetzen, um reale Probleme zu lösen und Ihre Prozesse auf das nächste Level zu heben.
        </p>
      </div>
      
      {/* Animated Text Line */}
      <div className="mt-6 pt-4 border-t border-cyan-400/30">
        <p className="text-xs text-cyan-400/70 font-mono animate-pulse">
          &gt; System initialisiert...
        </p>
      </div>
    </div>
  );
}

