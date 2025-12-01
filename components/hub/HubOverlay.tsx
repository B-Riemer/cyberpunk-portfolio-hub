"use client";

import { ReactNode } from "react";
import { playPanelCloseSound } from "@/components/utils/soundEffects";

interface HubOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  color?: "cyan" | "pink" | "blue";
}

export default function HubOverlay({
  isOpen,
  onClose,
  title,
  children,
  color = "cyan",
}: HubOverlayProps) {
  if (!isOpen) return null;

  const colorClasses = {
    cyan: {
      border: "border-cyan-400",
      text: "text-cyan-400",
      shadow: "shadow-[0_0_20px_rgba(0,255,255,0.3)]",
    },
    pink: {
      border: "border-pink-400",
      text: "text-pink-400",
      shadow: "shadow-[0_0_20px_rgba(255,0,255,0.3)]",
    },
    blue: {
      border: "border-blue-400",
      text: "text-blue-400",
      shadow: "shadow-[0_0_20px_rgba(0,128,255,0.3)]",
    },
  };

  const colors = colorClasses[color];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 animate-fade-in"
        onClick={() => {
          playPanelCloseSound();
          onClose();
        }}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      />
      
      {/* Panel */}
      <div
        className={`fixed right-4 md:right-8 top-1/2 -translate-y-1/2 w-[calc(100vw-2rem)] md:w-96 max-w-md max-h-[80vh] bg-white/10 backdrop-blur-md ${colors.border} border-2 rounded-xl ${colors.shadow} z-50 overflow-hidden animate-slide-in-right`}
      >
        {/* Header */}
        <div className={`px-4 md:px-6 py-4 ${colors.border} border-b-2 bg-white/5`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-xl md:text-2xl font-orbitron ${colors.text} neon-text`}>
              {title}
            </h2>
            <button
              onClick={() => {
                playPanelCloseSound();
                onClose();
              }}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${colors.border} border-2 ${colors.text} hover:bg-white/20 hover:scale-110 transition-all text-xl font-bold`}
              aria-label="Panel schließen"
            >
              ×
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(80vh-80px)] custom-scrollbar">
          {children}
        </div>
      </div>
    </>
  );
}

