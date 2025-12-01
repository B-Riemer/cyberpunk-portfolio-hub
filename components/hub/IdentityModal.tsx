"use client";

export default function IdentityModal() {
  return (
    <div className="space-y-6">
      {/* Sektion 1: CURRENT STATUS */}
      <div className="bg-white/5 rounded-xl border border-white/10 p-5 relative">
        <div className="flex items-start gap-4">
          <span className="text-3xl text-cyan-400 flex-shrink-0">💻</span>
          <div className="flex-1">
            <h3 className="font-orbitron font-bold text-white text-lg mb-3">
              Developer & AI Enthusiast
            </h3>
            <p className="font-sans text-sm text-gray-300 leading-relaxed mb-3">
              Ich transformiere komplexe Anforderungen in smarte Softwarelösungen. Aktuell absolviere ich meine Umschulung zum Fachinformatiker (FIAE) mit einem klaren Fokus: Die Brücke zwischen klassischer Softwareentwicklung und modernen KI-Agenten zu schlagen.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="bg-cyan-900/30 border border-cyan-500/20 text-[10px] text-cyan-200 rounded-full px-2 py-1">
                #Fullstack
              </span>
              <span className="bg-cyan-900/30 border border-cyan-500/20 text-[10px] text-cyan-200 rounded-full px-2 py-1">
                #NextJS
              </span>
              <span className="bg-cyan-900/30 border border-cyan-500/20 text-[10px] text-cyan-200 rounded-full px-2 py-1">
                #FutureReady
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sektion 2: ORIGIN & BACKGROUND */}
      <div className="bg-white/5 rounded-xl border border-white/10 p-5 relative">
        <div className="flex items-start gap-4">
          <span className="text-3xl text-cyan-400 flex-shrink-0">🛡️</span>
          <div className="flex-1">
            <h3 className="font-orbitron font-bold text-white text-lg mb-3">
              Leadership DNA & Disziplin
            </h3>
            <p className="font-sans text-sm text-gray-300 leading-relaxed mb-3">
              Mein Code basiert auf Struktur. Mit über 27 Jahren Erfahrung in Führungspositionen (Militär & Sicherheitsmanagement) bringe ich eine Disziplin in die IT, die man selten findet: Krisenfestigkeit, strategische Planung und präzise Kommunikation.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="bg-cyan-900/30 border border-cyan-500/20 text-[10px] text-cyan-200 rounded-full px-2 py-1">
                #Leadership
              </span>
              <span className="bg-cyan-900/30 border border-cyan-500/20 text-[10px] text-cyan-200 rounded-full px-2 py-1">
                #Discipline
              </span>
              <span className="bg-cyan-900/30 border border-cyan-500/20 text-[10px] text-cyan-200 rounded-full px-2 py-1">
                #Structure
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sektion 3: MISSION */}
      <div className="bg-white/5 rounded-xl border border-white/10 p-5 relative">
        <div className="flex items-start gap-4">
          <span className="text-3xl text-cyan-400 flex-shrink-0">🚀</span>
          <div className="flex-1">
            <h3 className="font-orbitron font-bold text-white text-lg mb-3">
              AI Solution Engineering
            </h3>
            <p className="font-sans text-sm text-gray-300 leading-relaxed mb-3">
              Ich schreibe nicht nur Code, ich löse Probleme. Meine Leidenschaft gilt autonomen Systemen und RAG-Pipelines. Mein Ziel: Technologien zu entwickeln, die echten, messbaren Mehrwert schaffen und Prozesse radikal vereinfachen.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="bg-cyan-900/30 border border-cyan-500/20 text-[10px] text-cyan-200 rounded-full px-2 py-1">
                #ProblemSolving
              </span>
              <span className="bg-cyan-900/30 border border-cyan-500/20 text-[10px] text-cyan-200 rounded-full px-2 py-1">
                #Innovation
              </span>
              <span className="bg-cyan-900/30 border border-cyan-500/20 text-[10px] text-cyan-200 rounded-full px-2 py-1">
                #AI-Native
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

