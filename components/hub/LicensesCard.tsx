"use client";

const licenseCategories = [
  {
    category: "Sport",
    icon: "🏋️",
    licenses: [
      "Fitness-Trainer A-Lizenz",
      "Personal Trainer",
      "Sport- und Bewegungstherapeut",
    ],
  },
  {
    category: "Sicherheit",
    icon: "🛡️",
    licenses: [
      "Sicherheitsfachkraft (nach §34a GewO)",
      "Sachkundeprüfung Bewachungsgewerbe",
      "Erste-Hilfe-Ausbildung",
    ],
  },
  {
    category: "IT",
    icon: "💻",
    licenses: [
      "Fachinformatiker für Anwendungsentwicklung (IHK)",
      "Cloud-Zertifizierungen",
      "KI & Machine Learning Kurse",
    ],
  },
];

export default function LicensesCard() {
  return (
    <div className="space-y-6">
      <p className="text-sm text-cyan-200/80 mb-4">
        Meine Qualifikationen und Zertifizierungen in verschiedenen Bereichen.
      </p>
      
      <div className="space-y-6">
        {licenseCategories.map((category, index) => (
          <div
            key={index}
            className="bg-white/5 border border-cyan-400/30 rounded-lg p-5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{category.icon}</span>
              <h3 className="text-cyan-300 font-semibold text-lg">
                {category.category}
              </h3>
            </div>
            <ul className="space-y-2 ml-12">
              {category.licenses.map((license, licenseIndex) => (
                <li
                  key={licenseIndex}
                  className="text-cyan-200/90 text-sm flex items-start gap-2"
                >
                  <span className="text-cyan-400 mt-1">▸</span>
                  <span>{license}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-cyan-400/30">
        <p className="text-xs text-cyan-400/70 font-mono">
          &gt; Qualifikationen geladen...
        </p>
      </div>
    </div>
  );
}

