"use client";

interface Credential {
  icon: string;
  main: string;
  sub: string;
  status: {
    text: string;
    type: "verified" | "in-progress" | "trainee";
  };
}

const credentials: Credential[] = [
  {
    icon: "🔄",
    main: "Professional Scrum Master I",
    sub: "Scrum.org",
    status: {
      text: "✅ VERIFIED",
      type: "verified",
    },
  },
  {
    icon: "☁️",
    main: "AWS Cloud Practitioner",
    sub: "Amazon Web Services",
    status: {
      text: "⏳ IN PROGRESS",
      type: "in-progress",
    },
  },
  {
    icon: "🎓",
    main: "Fachinformatiker (FIAE)",
    sub: "IHK / CBW Hamburg",
    status: {
      text: "🚀 TRAINEE",
      type: "trainee",
    },
  },
];

const statusStyles = {
  verified: "border-green-500/30 text-green-400",
  "in-progress": "border-yellow-500/30 text-yellow-400",
  trainee: "border-cyan-500/30 text-cyan-400",
};

export default function CredentialsModal() {
  return (
    <div className="grid grid-cols-1 gap-3">
      {credentials.map((credential, index) => (
        <div
          key={index}
          className="bg-white/5 border border-white/5 rounded-lg px-4 py-3 flex items-center justify-between"
        >
          {/* Left: Icon and Text */}
          <div className="flex items-center gap-3 flex-1">
            <span className="text-cyan-400 text-xl flex-shrink-0">
              {credential.icon}
            </span>
            <div className="flex-1 min-w-0">
              <div className="font-orbitron text-sm text-white mb-0.5">
                {credential.main}
              </div>
              <div className="text-xs text-gray-400">
                {credential.sub}
              </div>
            </div>
          </div>

          {/* Right: Status Badge */}
          <div className="flex-shrink-0 ml-3">
            <span
              className={`text-[10px] border px-2 rounded-sm ${statusStyles[credential.status.type]}`}
            >
              {credential.status.text}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

