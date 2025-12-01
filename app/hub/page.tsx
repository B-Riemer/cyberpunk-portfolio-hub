// src/app/hub/page.tsx
'use client';

import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MoveHorizontal } from 'lucide-react';
import HubCard from '@/components/HubCard';
import ChatBot from '@/components/hub/ChatBot';
import HubOverlay from '@/components/hub/HubOverlay';
import WerdegangModal from '@/components/hub/WerdegangModal';
import ContactModal from '@/components/hub/ContactModal';
import SideQuestsModal from '@/components/hub/SideQuestsModal';
import IdentityModal from '@/components/hub/IdentityModal';
import DeploymentsModal from '@/components/hub/DeploymentsModal';
import CredentialsModal from '@/components/hub/CredentialsModal';
import HubSceneWrapper from '@/components/HubSceneWrapper';
import { playNodeClickSound } from '@/components/utils/soundEffects';
import { websiteContent, ContentDocument } from '@/content/website-content';

// Explizites Mapping: EXAKT 6 Cards mit Tiefenperspektive
// Diskretisierung: Kleine, präzise Größen für subtilen Hologramm-Look
// Präzise absolute Positionierung: Zentriert vor den Serverracks
// Positionen sind Prozentwerte relativ zum HubSceneWrapper (16:9 Aspect Ratio Lock)
// Größen sind relativ (%), damit sie mit dem Wrapper skalieren
// WICHTIG: Alle Werte in Prozent (%) - keine Pixel (px) oder Viewport-Units (vw/vh)
const hubItems = [
  // Linke Seite - Perspektivisch kleiner werdend (vorne → hinten)
  // Rack 1: Links Außen (größte Card)
  { 
    title: "CREDENTIALS", 
    slug: "certs", 
    content: "Alle relevanten Abschlüsse, Zertifizierungen und Auszeichnungen.", 
    direction: 'left' as const, 
    order: 1, 
    pos: { top: '45%', left: '11%' },
    size: { w: '6.48%', h: '13.5%' }
  },
  // Rack 2: Links Mitte
  { 
    title: "DEPLOYMENTS", 
    slug: "projects", 
    content: "Eine Übersicht der wichtigsten Open-Source und kommerziellen Projekte.", 
    direction: 'left' as const, 
    order: 2, 
    pos: { top: '47.7%', left: '21.24%' },
    size: { w: '4.275180405%', h: '9.819554992734375%' }
  },
  // Rack 3: Links Innen
  { 
    title: "IDENTITY", 
    slug: "about", 
    content: "Werdegang, Vision und Hintergrundinformationen.", 
    direction: 'left' as const, 
    order: 3, 
    pos: { top: '49.6%', left: '28.7401899%' },
    size: { w: '3.47251528396125%', h: '7.2344068415859375%' }
  },
  
  // Rechte Seite - Spiegelverkehrt zu den linken Buttons
  // Rack 4: Rechts Innen (spiegelverkehrt zu LIZENZEN)
  { 
    title: "SIDE QUESTS", 
    slug: "hobbies", 
    content: "Interessen außerhalb der Architektur und Programmierung.", 
    direction: 'right' as const, 
    order: 4, 
    pos: { top: '50%', right: '28.2401899%' },
    size: { w: '3.47251528396125%', h: '7.2344068415859375%' }
  },
  // Rack 5: Rechts Mitte (spiegelverkehrt zu PROJEKTE)
  { 
    title: "COMM LINK", 
    slug: "contact", 
    content: "So erreichen Sie mich und alle relevanten Social Media Links.", 
    direction: 'right' as const, 
    order: 5, 
    pos: { top: '48%', right: '21.54%' },
    size: { w: '4.275180405%', h: '9.819554992734375%' }
  },
  // Rack 6: Rechts Außen (spiegelverkehrt zu ABOUT ME)
  { 
    title: "DATA SHEET", 
    slug: "career", 
    content: "Detaillierte chronologische Auflistung der beruflichen Laufbahn.", 
    direction: 'right' as const, 
    order: 6, 
    pos: { top: '45%', right: '11%' },
    size: { w: '6.48%', h: '13.5%' }
  },
];

export default function HubPage() {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showHint, setShowHint] = useState(true);
  
  // Initialisiere State direkt mit localStorage-Daten (nur im Browser)
  const [userData] = useState<{
    vorname?: string;
    nachname?: string;
    geschlecht?: 'm' | 'f' | 'd' | null;
  }>(() => {
    if (typeof window !== 'undefined') {
      const storedVorname = localStorage.getItem('vorname');
      const storedNachname = localStorage.getItem('nachname');
      const storedGeschlecht = localStorage.getItem('geschlecht') as 'm' | 'f' | 'd' | null;
      
      return {
        vorname: storedVorname || undefined,
        nachname: storedNachname || undefined,
        geschlecht: storedGeschlecht || null,
      };
    }
    return {};
  });

  // State für Overlay-Fenster
  const [openOverlay, setOpenOverlay] = useState<string | null>(null);

  // Auto-Center Scroll: Sofortiges Zentrieren beim Mounten
  useLayoutEffect(() => {
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      // Sofortiges Zentrieren ohne Animation
      scrollContainerRef.current.scrollLeft = (scrollWidth - clientWidth) / 2;
    }
  }, []);

  // Swipe Hint Timer: Blende nach 4 Sekunden aus
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Mapping von slug zu section name
  const slugToSection: Record<string, string> = {
    'about': 'About',
    'projects': 'Projects',
    'certs': 'Licenses',
    'hobbies': 'Hobbies',
    'contact': 'Contact',
    'career': 'Resume',
  };

  // Hole Inhalte für aktuelles Overlay
  const getOverlayContent = (slug: string): ContentDocument[] => {
    const section = slugToSection[slug];
    if (!section) return [];
    return websiteContent.filter(item => item.section === section);
  };

  // Hole Titel für Overlay
  const getOverlayTitle = (slug: string): string => {
    const titleMap: Record<string, string> = {
      'about': 'IDENTITY',
      'projects': 'DEPLOYMENTS',
      'certs': 'CREDENTIALS',
      'hobbies': 'SIDE QUESTS',
      'contact': 'COMM LINK',
      'career': 'DATA SHEET',
    };
    return titleMap[slug] || slug.toUpperCase();
  };

  return (
    // Scroll-Container: Ermöglicht horizontales Scrollen, wenn HubSceneWrapper breiter als Viewport ist
    <div 
      ref={scrollContainerRef}
      className="w-screen h-screen overflow-x-auto overflow-y-hidden scrollbar-hide"
      style={{ scrollBehavior: 'auto' }}
    >
      {/* Swipe Hint Overlay - Nur auf Mobile sichtbar */}
      <div 
        className={`fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center transition-opacity duration-1000 md:hidden ${
          showHint ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-center gap-4 animate-pulse">
          <MoveHorizontal className="w-8 h-8 text-white animate-bounce-x" />
          <MoveHorizontal className="w-8 h-8 text-white animate-bounce-x-reverse" />
        </div>
        <p className="mt-4 text-cyan-400 font-orbitron text-sm tracking-wider">
          SWIPE TO EXPLORE
        </p>
      </div>

      <HubSceneWrapper>
        {/* Button zurück zur Startseite */}
        <button
          onClick={() => {
            playNodeClickSound();
            router.push('/');
          }}
          className="absolute bottom-4 left-4 z-50 px-4 py-2 bg-black/80 backdrop-blur-sm border-2 border-cyan-400 text-cyan-400 font-orbitron text-sm hover:bg-cyan-400/20 hover:scale-105 transition-all neon-border-cyan rounded-lg flex items-center gap-2"
          aria-label="Zurück zur Startseite"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>Startseite</span>
        </button>

        {/* Video-Hintergrund - Füllt den Wrapper exakt aus */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            src="/HUBvideo.mp4" 
            className="absolute inset-0 w-full h-full object-cover"
          >
            Ihr Browser unterstützt das Video-Tag nicht.
          </video>
        </div>
        
        {/* ChatBot - Positioniert relativ zum Wrapper (56% top, 50% left) */}
        <ChatBot 
          vorname={userData.vorname}
          nachname={userData.nachname}
          geschlecht={userData.geschlecht}
          position={{ top: '56%', left: '50%' }}
        />
        
        {/* Cards Container: position: absolute für prozentuale Positionierung relativ zum Wrapper */}
        <div className="absolute inset-0 z-10 w-full h-full">
        {hubItems.map((item) => {
          // Explizite Positionierung: position: absolute mit top und left/right
          // Größen direkt aus hubItems als Prozentwerte
          const style: React.CSSProperties = {
            position: 'absolute',
            top: item.pos.top,
            width: item.size.w,
            height: item.size.h,
          };
          
          // Symmetrische Positionierung: Links von 'left', Rechts von 'right'
          if (item.direction === 'left' && item.pos.left) {
            style.left = item.pos.left;
          } else if (item.direction === 'right' && item.pos.right) {
            style.right = item.pos.right;
          }
          
          // Perspektivische Transformation für alle Buttons: Untere Linie parallel zur Server-Linie
          style.transform = 'perspective(1000px) rotateX(2deg)';
          style.transformOrigin = 'bottom center';
          
          // Custom clip-path für Buttons
          let customClipPath: string | undefined;
          if (item.order === 1 || item.order === 2 || item.order === 3) {
            // Links: Rechte Linie um 8px nach unten verlängert (5px + 3px)
            customClipPath = 'polygon(0% 0%, 90% 10%, 90% 95.2%, 0% 100%)';
          } else if (item.order === 4) {
            // HOBBYS Button: Linke Linie um 10px nach unten verlängert (8px + 2px)
            customClipPath = 'polygon(10% 10%, 100% 0%, 100% 100%, 10% 97.12%)';
          } else if (item.order === 5) {
            // KONTAKT Button: Linke Linie um 10px nach unten verlängert (8px + 2px)
            customClipPath = 'polygon(10% 10%, 100% 0%, 100% 100%, 10% 96.84%)';
          } else if (item.order === 6) {
            // WERDEGANG Button: Linke Linie um 10px nach unten verlängert (8px + 2px)
            customClipPath = 'polygon(10% 10%, 100% 0%, 100% 100%, 10% 96.404%)';
          } else {
            customClipPath = undefined;
          }
          
          return (
            <div 
              key={item.order} 
              style={style}
            > 
              <HubCard 
                {...item} 
                direction={item.direction} 
                customClipPath={customClipPath} 
                order={item.order}
                onClick={() => {
                  playNodeClickSound();
                  setOpenOverlay(item.slug);
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Overlay-Fenster */}
      {openOverlay && (
        <HubOverlay
          isOpen={true}
          onClose={() => setOpenOverlay(null)}
          title={getOverlayTitle(openOverlay)}
          color="cyan"
        >
          {openOverlay === 'career' ? (
            <WerdegangModal content={getOverlayContent(openOverlay)} />
          ) : openOverlay === 'contact' ? (
            <ContactModal content={getOverlayContent(openOverlay)} />
          ) : openOverlay === 'hobbies' ? (
            <SideQuestsModal />
          ) : openOverlay === 'about' ? (
            <IdentityModal />
          ) : openOverlay === 'projects' ? (
            <DeploymentsModal />
          ) : openOverlay === 'certs' ? (
            <CredentialsModal />
          ) : (
            <div className="space-y-6">
              {getOverlayContent(openOverlay).map((item, idx) => {
                // Emoji-Mapping basierend auf Titel und Kategorie
                const getEmoji = (title: string, category?: string): string => {
                  const titleLower = title.toLowerCase();
                  if (titleLower.includes('über') || titleLower.includes('björn')) return '👤';
                  if (titleLower.includes('beruf') || titleLower.includes('erfahrung')) return '💼';
                  if (titleLower.includes('spezialis') || titleLower.includes('ai') || titleLower.includes('ki')) return '🤖';
                  if (titleLower.includes('qualifikation') || titleLower.includes('ausbildung')) return '🎓';
                  if (titleLower.includes('technologie') || titleLower.includes('skills') || titleLower.includes('fokus')) return '💻';
                  if (titleLower.includes('projekt')) return '🚀';
                  if (titleLower.includes('sprache')) return '🌐';
                  if (titleLower.includes('kompetenz')) return '⭐';
                  if (titleLower.includes('sport') || titleLower.includes('fitness') || titleLower.includes('körper')) return '💪';
                  if (titleLower.includes('mentale') || titleLower.includes('weiterbildung')) return '🧠';
                  if (titleLower.includes('familie') || titleLower.includes('mensch') || titleLower.includes('verbindung')) return '👨‍👩‍👧‍👦';
                  if (titleLower.includes('natur') || titleLower.includes('reisen') || titleLower.includes('tauchen')) return '🌊';
                  if (titleLower.includes('lizenz') || titleLower.includes('zertifikat')) return '📜';
                  if (titleLower.includes('sicherheit')) return '🔒';
                  if (titleLower.includes('kontakt')) return '📧';
                  if (category === 'Sport') return '💪';
                  if (category === 'Technologie') return '💻';
                  if (category === 'Reisen') return '✈️';
                  if (category === 'Sozial') return '👥';
                  return '📌';
                };

                const emoji = getEmoji(item.title, item.metadata?.category);

                return (
                  <div key={item.id} className="border-b border-cyan-400/20 pb-6 last:border-b-0 last:pb-0">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-2xl flex-shrink-0">{emoji}</span>
                      <div className="flex-1">
                        <h3 className="text-cyan-300 font-semibold mb-2 font-orbitron text-lg">
                          {item.title}
                        </h3>
                        {item.metadata?.category && (
                          <span className="inline-block px-2 py-1 text-xs bg-cyan-400/20 border border-cyan-400/40 text-cyan-300 rounded mb-3">
                            {item.metadata.category}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-200 text-sm leading-relaxed ml-11">
                      {item.content}
                    </p>
                    {item.metadata?.tags && item.metadata.tags.length > 0 && (
                      <div className="mt-4 ml-11 flex flex-wrap gap-2">
                        {item.metadata.tags.map((tag, tagIdx) => (
                          <span 
                            key={tagIdx} 
                            className="px-2 py-1 text-xs bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 rounded hover:bg-cyan-400/20 transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </HubOverlay>
      )}
      </HubSceneWrapper>
    </div>
  );
}
