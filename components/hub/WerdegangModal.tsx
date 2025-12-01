"use client";

import { ContentDocument } from "@/content/website-content";
import { Wrench, Bot, MessageSquare } from "lucide-react";

interface WerdegangModalProps {
  content: ContentDocument[];
}

export default function WerdegangModal({ content }: WerdegangModalProps) {
  // Helper-Komponente für Neon-Badges
  const NeonBadge = ({ tag }: { tag: string }) => (
    <span className="rounded-full bg-cyan-900/40 border border-cyan-500/30 text-cyan-300 text-xs px-2 py-1 shadow-[0_0_5px_rgba(0,255,255,0.3)]">
      {tag}
    </span>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Kachel 1: CURRENT STATUS - Full width on mobile */}
      <div className="md:col-span-2 bg-white/5 rounded-xl border border-white/10 p-4">
        <h3 className="text-cyan-400 font-orbitron text-lg mb-2">
          🚀 FIAE Trainee (Dev & Cloud)
        </h3>
        <p className="text-gray-300 text-sm mb-2">CBW Hamburg (2025–2027)</p>
        <p className="text-gray-200 text-sm">Focus: Fullstack Development & Cloud Architecture</p>
      </div>

      {/* Kachel 2: TECH STACK */}
      <div className="bg-white/5 rounded-xl border border-white/10 p-4">
        <h3 className="text-cyan-300 font-orbitron text-lg mb-4">TECH STACK</h3>
        <div className="space-y-3">
          <div>
            <p className="text-gray-400 text-xs mb-2 font-semibold">Core:</p>
            <div className="flex flex-wrap gap-2">
              {['Python', 'Java', 'SQL', 'JavaScript'].map((skill) => (
                <NeonBadge key={skill} tag={skill} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-2 font-semibold">Web/UI:</p>
            <div className="flex flex-wrap gap-2">
              {['React', 'Next.js', 'Tailwind CSS'].map((skill) => (
                <NeonBadge key={skill} tag={skill} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-xs mb-2 font-semibold">AI/Ops:</p>
            <div className="flex flex-wrap gap-2">
              {['AWS', 'n8n', 'RAG', 'GPT-Agents', 'Scrum'].map((skill) => (
                <NeonBadge key={skill} tag={skill} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Kachel 3: LEGACY & LEADERSHIP */}
      <div className="bg-white/5 rounded-xl border border-white/10 p-4">
        <h3 className="text-cyan-300 font-orbitron text-lg mb-2">
          ⭐ 20+ Years Professional Background
        </h3>
        <p className="text-gray-200 text-sm mb-4">
          Transitioning from High-Security Leadership to Tech.
        </p>
        <div className="flex flex-wrap gap-2">
          {['Structural Analysis', 'Process Optimization', 'Team Leadership', 'Crisis Management'].map((skill) => (
            <NeonBadge key={skill} tag={skill} />
          ))}
        </div>
      </div>

      {/* Kachel 4: KEY DEPLOYMENTS */}
      <div className="md:col-span-2 bg-white/5 rounded-xl border border-white/10 p-4">
        <h3 className="text-cyan-300 font-orbitron text-lg mb-4">KEY DEPLOYMENTS</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Wrench className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-gray-200 text-sm font-semibold">Vertrags-Parser</p>
              <p className="text-gray-400 text-xs">PDF-Pipeline & Laufzeiterkennung</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Bot className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-gray-200 text-sm font-semibold">Consultant-Matcher</p>
              <p className="text-gray-400 text-xs">Use-Case Matching für Beratungsfirmen</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MessageSquare className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-gray-200 text-sm font-semibold">Corp-Chatbot</p>
              <p className="text-gray-400 text-xs">Interne Wissensdatenbank (RAG)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
