"use client";

import { ContentDocument } from "@/content/website-content";
import { playNodeClickSound } from "@/components/utils/soundEffects";
import { Mail, Linkedin, Github, MessageCircle } from "lucide-react";

interface ContactModalProps {
  content: ContentDocument[];
}

// Funktion zum Extrahieren von URLs und Kontaktdaten aus Content
function extractContactInfo(content: string) {
  // E-Mail: ai@b-riemer.dev
  const emailMatch = content.match(/E-Mail:\s*([^\s.]+@[^\s.]+)/i);
  // LinkedIn: https://linkedin.com/in/björn-riemer-97a136163 oder linkedin.com/in/...
  const linkedInMatch = content.match(/LinkedIn:\s*(https?:\/\/[^\s.]+|[^\s.]+linkedin\.com[^\s.]+)/i);
  // GitHub: https://github.com/b-riemer
  const githubMatch = content.match(/GitHub:\s*(https?:\/\/[^\s.]+)/i);
  // Discord: bjorvik_roughneck
  const discordMatch = content.match(/Discord:\s*([^\s.]+)/i);

  return {
    email: emailMatch ? emailMatch[1] : null,
    linkedIn: linkedInMatch ? linkedInMatch[1] : null,
    github: githubMatch ? githubMatch[1] : null,
    discord: discordMatch ? discordMatch[1] : null,
  };
}

export default function ContactModal({ content }: ContactModalProps) {
  // Finde die Kontakt-Sektionen
  const contactInfo = content.find(item => item.id === "contact-1");

  // Extrahiere Kontaktdaten
  const contacts = contactInfo ? extractContactInfo(contactInfo.content) : {
    email: null,
    linkedIn: null,
    github: null,
    discord: null,
  };

  // Kontakt-Buttons-Konfiguration
  const contactButtons = [
    {
      name: "Email",
      subtext: "Send Encrypted Message",
      href: contacts.email ? `mailto:${contacts.email}` : "#",
      icon: Mail,
    },
    {
      name: "LinkedIn",
      subtext: "Professional Profile",
      href: contacts.linkedIn ? (contacts.linkedIn.startsWith("http") ? contacts.linkedIn : `https://${contacts.linkedIn}`) : "#",
      icon: Linkedin,
    },
    {
      name: "GitHub",
      subtext: "Code Repositories",
      href: contacts.github || "#",
      icon: Github,
    },
    {
      name: "Discord",
      subtext: "Direct Chat",
      href: contacts.discord ? `https://discord.com/users/${contacts.discord}` : "#",
      icon: MessageCircle,
    },
  ];

  const handleClick = (href: string) => {
    playNodeClickSound();
    setTimeout(() => {
      if (href.startsWith("http") || href.startsWith("mailto")) {
        window.open(href, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = href;
      }
    }, 100);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="mb-6 -mx-4 md:-mx-6 px-4 md:px-6">
        <h2 className="font-orbitron text-3xl text-cyan-400 mb-3 text-center">
          Kontaktmöglichkeiten
        </h2>
        {/* Status Line */}
        <div className="flex items-center justify-center gap-2 text-xs tracking-widest text-green-400/80">
          <span className="animate-pulse text-green-500">●</span>
          <span>SYSTEM ONLINE // OPEN FOR WORK</span>
        </div>
      </div>

      {/* Body Text */}
      <p className="text-sm text-gray-300 mb-6">
        Interesse an gemeinsamen Projekten, Beratung oder Workshops im Bereich KI und Softwareentwicklung? Kontakt über E-Mail oder Social Media möglich.
      </p>

      {/* Touch-Panel Buttons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contactButtons.map((button) => {
          const IconComponent = button.icon;
          return (
            <button
              key={button.name}
              onClick={() => handleClick(button.href)}
              className="group relative flex flex-row items-center gap-4 p-4 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300 cursor-pointer"
            >
              <IconComponent className="w-6 h-6 text-white group-hover:text-cyan-400 transition-colors flex-shrink-0" />
              <div className="flex flex-col items-start flex-1">
                <span className="text-cyan-400 font-semibold text-base group-hover:text-cyan-300 transition-colors">
                  {button.name}
                </span>
                <span className="text-xs text-cyan-200/60 group-hover:text-cyan-200/80 transition-colors">
                  {button.subtext}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
