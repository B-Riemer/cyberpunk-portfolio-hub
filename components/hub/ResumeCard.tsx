"use client";

export default function ResumeCard() {
  return (
    <div className="space-y-6 text-cyan-200">
      {/* Profile Section */}
      <div>
        <h3 className="text-cyan-300 font-semibold text-lg mb-3 border-b border-cyan-400/30 pb-2">
          Profile
        </h3>
        <div className="bg-white/5 p-4 rounded border border-cyan-400/20">
          <p className="text-sm leading-relaxed">
            Quereinsteiger in der Softwareentwicklung mit Fokus auf KI-Automatisierung, Python und moderne Webtechnologien. Kombiniert technische Ausbildung mit langjähriger Führungs- und Strukturierungserfahrung. Ziel: AI-Solution-Engineer.
          </p>
        </div>
      </div>

      {/* Current Qualification Section */}
      <div>
        <h3 className="text-cyan-300 font-semibold text-lg mb-3 border-b border-cyan-400/30 pb-2">
          Current Qualification
        </h3>
        <div className="space-y-3">
          <div className="bg-white/5 p-3 rounded border border-cyan-400/20">
            <p className="font-semibold text-cyan-300">FIAE-Umschulung</p>
            <p className="text-sm text-cyan-200/70">CBW Hamburg • 2025–2027</p>
            <p className="text-sm mt-1">
              Schwerpunkte: Python, Java, SQL, Webentwicklung, Cloud (AWS), Scrum.
            </p>
          </div>
        </div>
      </div>

      {/* IT Focus Areas */}
      <div>
        <h3 className="text-cyan-300 font-semibold text-lg mb-3 border-b border-cyan-400/30 pb-2">
          IT Focus Areas
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            "Python",
            "Java",
            "JavaScript",
            "Next.js",
            "React",
            "Tailwind",
            "SQL",
            "APIs",
            "Automatisierung",
            "KI-Agenten",
            "n8n",
            "Cloud (AWS)",
          ].map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 text-sm bg-cyan-400/10 border border-cyan-400/30 rounded text-cyan-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Relevant Projects */}
      <div>
        <h3 className="text-cyan-300 font-semibold text-lg mb-3 border-b border-cyan-400/30 pb-2">
          Relevant Projects
        </h3>
        <div className="space-y-3">
          <div className="bg-white/5 p-3 rounded border border-cyan-400/20">
            <p className="font-semibold text-cyan-300">Vertragslaufzeiterkennung</p>
            <p className="text-sm text-cyan-200/70">NER + PDF-Pipeline</p>
          </div>
          <div className="bg-white/5 p-3 rounded border border-cyan-400/20">
            <p className="font-semibold text-cyan-300">IT-Chatbot</p>
            <p className="text-sm text-cyan-200/70">RAG</p>
          </div>
          <div className="bg-white/5 p-3 rounded border border-cyan-400/20">
            <p className="font-semibold text-cyan-300">Use-Case-Matcher</p>
            <p className="text-sm text-cyan-200/70">für Beratungsfirmen</p>
          </div>
          <div className="bg-white/5 p-3 rounded border border-cyan-400/20">
            <p className="font-semibold text-cyan-300">KI-Automatisierungs-Agentur</p>
            <p className="text-sm text-cyan-200/70">n8n + GPT-Agents</p>
          </div>
        </div>
      </div>

      {/* Professional Experience */}
      <div>
        <h3 className="text-cyan-300 font-semibold text-lg mb-3 border-b border-cyan-400/30 pb-2">
          Professional Experience
        </h3>
        <div className="bg-white/5 p-4 rounded border border-cyan-400/20">
          <p className="text-sm leading-relaxed">
            Über 20 Jahre Führung, Prozessoptimierung & Organisation in sicherheitskritischen Bereichen. Starker Background in Strukturarbeit, digitaler Prozessmodernisierung und Teamkoordination.
          </p>
        </div>
      </div>

      {/* Additional Competencies */}
      <div>
        <h3 className="text-cyan-300 font-semibold text-lg mb-3 border-b border-cyan-400/30 pb-2">
          Additional Competencies
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            "Projektorganisation & Prozessdesign",
            "Strukturierte Problemlösung",
            "Agiles Arbeiten (Scrum)",
          ].map((competency) => (
            <span
              key={competency}
              className="px-3 py-1 text-sm bg-cyan-400/10 border border-cyan-400/30 rounded text-cyan-300"
            >
              {competency}
            </span>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div>
        <h3 className="text-cyan-300 font-semibold text-lg mb-3 border-b border-cyan-400/30 pb-2">
          Languages
        </h3>
        <div className="space-y-2">
          <div className="bg-white/5 p-3 rounded border border-cyan-400/20 flex justify-between items-center">
            <span className="text-cyan-300">Deutsch</span>
            <span className="text-sm text-cyan-200/70">C2</span>
          </div>
          <div className="bg-white/5 p-3 rounded border border-cyan-400/20 flex justify-between items-center">
            <span className="text-cyan-300">Englisch</span>
            <span className="text-sm text-cyan-200/70">B2</span>
          </div>
        </div>
      </div>
      
      {/* Download Button */}
      <div className="pt-4 border-t border-cyan-400/30">
        <button className="w-full px-4 py-2 bg-cyan-400/10 border border-cyan-400/50 rounded-lg text-cyan-300 hover:bg-cyan-400/20 transition-colors">
          Lebenslauf herunterladen
        </button>
      </div>
    </div>
  );
}

