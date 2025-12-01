"use client";

import { ReactNode } from "react";

interface NodeButtonProps {
  label: string;
  icon?: ReactNode;
  position: { top: string; left: string };
  color: "cyan" | "pink" | "blue";
  onClick: () => void;
  isActive?: boolean;
  scale?: number; // Skalierung für Raumtiefe (Standard: 1.0)
  perspectiveRotation?: number; // Perspektivische Rotation in Grad für Raumtiefe (Standard: 0)
}

export default function NodeButton({
  label,
  icon,
  position,
  color,
  onClick,
  isActive = false,
  scale = 1.0,
  perspectiveRotation = 0,
}: NodeButtonProps) {
  const colorClasses = {
    cyan: {
      text: "text-cyan-400",
      border: "border-cyan-400",
      shadow: "drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]",
      glow: "shadow-[0_0_15px_rgba(0,255,255,0.6)]",
    },
    pink: {
      text: "text-pink-400",
      border: "border-pink-400",
      shadow: "drop-shadow-[0_0_8px_rgba(255,0,255,0.8)]",
      glow: "shadow-[0_0_15px_rgba(255,0,255,0.6)]",
    },
    blue: {
      text: "text-blue-400",
      border: "border-blue-400",
      shadow: "drop-shadow-[0_0_8px_rgba(0,128,255,0.8)]",
      glow: "shadow-[0_0_15px_rgba(0,128,255,0.6)]",
    },
  };

  const colors = colorClasses[color];

  return (
    <button
      onClick={onClick}
      className={`node-button absolute ${colors.text} ${colors.shadow} transition-all duration-300 z-50 ${
        isActive ? "opacity-100" : "opacity-90 hover:opacity-100"
      }`}
      style={{
        top: position.top,
        left: position.left,
        transform: `translate(-50%, -50%) scale(${scale})`, // Zentriert den Button und skaliert für Raumtiefe
      }}
    >
      {/* Äußerer Rahmen um alles - Trapez-Form (Hochkant) mit gleicher Neigung oben und unten */}
      <div
        className="absolute transition-all duration-300"
        style={{
          top: '-3.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '5rem',
          height: '7rem',
        }}
      >
        <svg
          width="80"
          height="112"
          viewBox="0 0 80 112"
          preserveAspectRatio="none"
          className={isActive ? colors.glow : ""}
        >
          {/* Hintergrund - Trapez: obere und untere Linie gleich lang und parallel, innere Seite senkrecht */}
          <polygon
            points={perspectiveRotation !== 0
              ? perspectiveRotation < 0
                ? `0,0 66,7 80,105 14,112`
                : `14,0 80,7 80,112 0,105`
              : '0,0 80,0 80,112 0,112'}
            fill="rgba(0, 0, 0, 0.3)"
            style={{ backdropFilter: 'blur(4px)' }}
          />
          {/* Rahmen - Trapez: obere und untere Linie gleich lang und parallel, innere Seite senkrecht */}
          <polygon
            points={perspectiveRotation !== 0
              ? perspectiveRotation < 0
                ? `0,0 66,7 80,105 14,112`
                : `14,0 80,7 80,112 0,105`
              : '0,0 80,0 80,112 0,112'}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={colors.border}
            style={{
              filter: isActive ? `drop-shadow(0 0 10px currentColor)` : 'none',
            }}
          />
        </svg>
      </div>
      
      {/* Icon if provided */}
      {icon && (
        <div className={`absolute -top-10 left-1/2 -translate-x-1/2 text-3xl transition-transform duration-300 z-10 ${
          isActive ? "scale-125" : ""
        }`}>
          {icon}
        </div>
      )}
      
      {/* Glowing Node Circle - größer und auffälliger */}
      <div
        className={`relative w-6 h-6 rounded-full ${colors.border} border-2 ${colors.glow} bg-white/30 backdrop-blur-sm node-pulse transition-transform duration-300 z-10 ${
          isActive ? "scale-150" : "scale-100"
        }`}
        style={{
          boxShadow: `0 0 15px currentColor, 0 0 30px currentColor, 0 0 45px currentColor, 0 0 60px currentColor`,
        }}
      />
      
      {/* Outer Glow Ring */}
      <div
        className={`absolute inset-0 rounded-full ${colors.border} node-pulse-outer z-10`}
        style={{
          width: '24px',
          height: '24px',
          transform: 'translate(-50%, -50%)',
          top: '50%',
          left: '50%',
          borderWidth: '1px',
          boxShadow: `0 0 20px currentColor, 0 0 40px currentColor`,
        }}
      />
      
      {/* Label - immer sichtbar, aber mit Hover-Effekt */}
      <div
        className={`absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-base font-orbitron font-semibold ${colors.text} node-label z-10`}
        style={{
          opacity: isActive ? 1 : 0.7,
          WebkitTextStroke: '2px rgba(0, 0, 0, 0.8)',
          paintOrder: 'stroke fill',
          textShadow: `
            -1px -1px 0 rgba(0, 0, 0, 0.8),
            1px -1px 0 rgba(0, 0, 0, 0.8),
            -1px 1px 0 rgba(0, 0, 0, 0.8),
            1px 1px 0 rgba(0, 0, 0, 0.8),
            0 0 8px currentColor,
            0 0 16px currentColor
          `,
        }}
      >
        {label}
      </div>
      
      {/* Connection Line (appears on hover/active) */}
      <div
        className={`absolute top-3 left-1/2 -translate-x-1/2 w-1 h-16 node-connection-line transition-opacity duration-300 z-10`}
        style={{
          background: `linear-gradient(to bottom, currentColor, transparent)`,
          boxShadow: `0 0 8px currentColor, 0 0 16px currentColor`,
          opacity: isActive ? 0.8 : 0,
        }}
      />
    </button>
  );
}

