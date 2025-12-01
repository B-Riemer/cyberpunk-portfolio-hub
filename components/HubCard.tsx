// src/components/HubCard.tsx
'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface HubCardProps {
  title: string;
  slug: string;
  content: string;
  direction: 'left' | 'right'; // NEU: Steuert die Perspektiv-Form
  customClipPath?: string; // Optional: Überschreibt die Standard-Trapezoid-Form
  order?: number; // Button-Position für Zeichenbegrenzung pro Zeile
  onClick?: () => void; // Callback für Button-Klick
}

// Konvertiere Titel zu Code-Syntax
const convertToSyntax = (title: string): string[] => {
  const titleUpper = title.toUpperCase();
  
  // Mapping für alle Titel zu Code-Syntax
  const syntaxMap: Record<string, string[]> = {
    'ABOUT ME': ['const', 'about', '=me;'], // 3 Zeilen für ABOUT ME: const, about, =me;
    'PROJEKTE': ['const projekte', '= [];'],
    'LIZENZEN & ZERTIFIKATE': ['const lizenzen', '= certs;'],
    'HOBBYS': ['const', 'hobbys', '=[];'], // 3 Zeilen für HOBBYS: const, hobbys, =[];
    'KONTAKT': ['const kontakt', '= {};'],
    'WERDEGANG': ['const werdegang', '= [];'],
    'IDENTITY': ['const', 'identity', '={};'], // 3 Zeilen für IDENTITY: const, identity, ={};
    'SIDE QUESTS': ['const', 'sidequests', '={};'], // 3 Zeilen für SIDE QUESTS: const, sidequests, ={};
  };
  
  if (syntaxMap[titleUpper]) {
    return syntaxMap[titleUpper];
  }
  
  // Fallback: Generiere Syntax aus Titel
  const varName = title.toLowerCase().replace(/\s+/g, '').replace(/&/g, '').slice(0, 12);
  return [`const ${varName}`, '= {};'];
};

// Formatiere Titel in maximal 2 Zeilen mit Syntax-Highlighting
const formatTitleInTwoLines = (title: string, order?: number): { lines: string[], syntax: boolean } => {
  // Alle Titel werden als Code-Syntax formatiert
  return {
    lines: convertToSyntax(title),
    syntax: true
  };
};

// Rendere Syntax-formatierte Zeile
const renderSyntaxLine = (line: string, isFirstLine: boolean, visibleChars: number, lineIndex: number = 0): React.ReactNode => {
  const visible = line.slice(0, visibleChars);
  
  // Erste Zeile: nur "const" (Keyword)
  if (line.trim() === 'const') {
    return <span className="text-blue-400">{visible}</span>;
  }
  
  // Zweite Zeile: nur Variablenname (für ABOUT ME: "about")
  if (isFirstLine && line.startsWith('const ')) {
    // Standard: const variableName in einer Zeile
    const constKeyword = 'const ';
    const varName = line.slice(constKeyword.length);
    const visibleConst = visible.slice(0, constKeyword.length);
    const visibleVar = visible.slice(constKeyword.length);
    
    return (
      <>
        {visibleConst.length > 0 && (
          <span className="text-blue-400">{visibleConst}</span>
        )}
        {visibleVar.length > 0 && (
          <>
            <span className="text-gray-300"> </span>
            <span className="text-yellow-300">{visibleVar}</span>
          </>
        )}
      </>
    );
  } else if (!line.includes('=') && !line.includes(';')) {
    // Nur Variablenname (zweite Zeile für ABOUT ME)
    return <span className="text-yellow-300">{visible}</span>;
  } else if (line.includes('=') && line.includes(';')) {
    // Dritte Zeile: =value; (für ABOUT ME: "=me;") - als komplette Zeile rendern
    const parts = line.match(/^(=)([^;]+)(;)$/);
    if (parts) {
      const [, equals, value, semicolon] = parts;
      let currentPos = 0;
      const result: React.ReactNode[] = [];
      
      // Equals
      if (visibleChars > currentPos) {
        const equalsVisible = equals.slice(0, Math.min(equals.length, visibleChars - currentPos));
        if (equalsVisible.length > 0) {
          result.push(<span key="equals" className="text-gray-300">{equalsVisible}</span>);
          currentPos += equals.length;
        }
      }
      
      // Value
      if (visibleChars > currentPos) {
        const valueVisible = value.slice(0, Math.min(value.length, visibleChars - currentPos));
        if (valueVisible.length > 0) {
          result.push(<span key="value" className="text-green-400">{valueVisible}</span>);
          currentPos += value.length;
        }
      }
      
      // Semicolon
      if (visibleChars > currentPos && semicolon) {
        result.push(<span key="semicolon" className="text-gray-300">;</span>);
      }
      
      return <>{result}</>;
    }
    
    // Fallback: Einfache Darstellung für = value;
    return <span className="text-gray-300">{visible}</span>;
  } else {
    // Fallback: Einfache Darstellung
    return <span className="text-gray-300">{visible}</span>;
  }
};

// Generiere Code-Befehle für den Bildschirm
const generateCodeLines = (seed: number, title: string, order?: number): string[] => {
  const codeTemplates = [
    'const {title} = require("./module");',
    'function load{title}() {',
    'export default class {title} {',
    'import {title} from "./lib";',
    'const {title} = new Component();',
    'async function fetch{title}() {',
    'const {title} = useState(null);',
    'router.get("/{title}", handler);',
    'const {title} = useMemo(() => {}, []);',
    'export const {title} = () => {};',
    'class {title} extends Component {}',
    'const {title} = createContext();',
  ];
  
  const lines: string[] = [];
  const titleVar = title.replace(/\s+/g, '');
  
  // Spezielle Behandlung für IDENTITY (order 3) und SIDE QUESTS (order 4): nur 3 Zeilen, 3. Zeile = {};
  if (order === 3 || order === 4) {
    const template1 = codeTemplates[seed % codeTemplates.length];
    const template2 = codeTemplates[(seed + 1) % codeTemplates.length];
    lines.push(template1.replace(/{title}/g, titleVar));
    lines.push(template2.replace(/{title}/g, titleVar));
    lines.push('={};'); // 3. Zeile ist immer ={};
    return lines;
  }
  
  // Generiere mehr Zeilen für größere Buttons (Order 1 und 6)
  const numLines = (order === 1 || order === 6) ? 8 : 6;
  
  for (let i = 0; i < numLines; i++) {
    const template = codeTemplates[(seed + i) % codeTemplates.length];
    const codeLine = template.replace(/{title}/g, titleVar);
    lines.push(codeLine);
  }
  
  return lines;
};

const HubCard: React.FC<HubCardProps> = ({ title, slug, content, direction, customClipPath, order, onClick }) => {
  const trapezoidClass = direction === 'left' ? 'trapezoid-left' : 'trapezoid-right';
  const titleData = React.useMemo(() => formatTitleInTwoLines(title, order), [title, order]);
  const titleLines = titleData.lines;
  const isSyntax = titleData.syntax;
  const codeLines = React.useMemo(() => generateCodeLines(order || 0, title, order), [order, title]);
  const [typingIndex, setTypingIndex] = React.useState(0);
  const [codeTypingIndex, setCodeTypingIndex] = React.useState(0);
  const [currentCodeLineIndex, setCurrentCodeLineIndex] = React.useState(0);

  // Simuliere Tipp-Effekt für die Bezeichnung
  React.useEffect(() => {
    const totalChars = titleLines.join('').length;
    if (typingIndex < totalChars) {
      const timer = setTimeout(() => {
        setTypingIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [typingIndex, titleLines]);

  // Simuliere kontinuierlichen Tipp-Effekt für Code-Zeilen
  React.useEffect(() => {
    const currentLine = codeLines[currentCodeLineIndex];
    if (!currentLine) return;

    const totalChars = currentLine.length;
    
    if (codeTypingIndex < totalChars) {
      // Tippe weiter
      const timer = setTimeout(() => {
        setCodeTypingIndex(prev => prev + 1);
      }, 50); // Schnelleres Tippen für Code
      return () => clearTimeout(timer);
    } else {
      // Zeile fertig, warte kurz und starte nächste Zeile
      const waitTimer = setTimeout(() => {
        setCurrentCodeLineIndex(prev => (prev + 1) % codeLines.length);
        setCodeTypingIndex(0);
      }, 800); // Kurze Pause zwischen Zeilen
      return () => clearTimeout(waitTimer);
    }
  }, [codeTypingIndex, currentCodeLineIndex, codeLines]);

  // Berechne welche Zeichen bereits getippt wurden
  const getVisibleTitle = () => {
    let charCount = 0;
    return titleLines.map((line, lineIdx) => {
      const lineLength = line.length;
      const visibleLength = Math.min(lineLength, Math.max(0, typingIndex - charCount));
      charCount += lineLength;
      return { text: line, visible: visibleLength };
    });
  };

  const visibleTitle = getVisibleTitle();
  const showCursor = typingIndex < titleLines.join('').length;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <motion.div 
      onClick={handleClick}
      whileHover={{ 
        scale: 1.05, 
        boxShadow: '0 0 20px rgba(255, 0, 255, 1), 0 0 40px rgba(0, 255, 255, 1)' 
      }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative p-3 h-full w-full 
        bg-black/95 cursor-pointer overflow-hidden font-mono text-xs
        ${customClipPath ? '' : trapezoidClass}
        neon-double-glow neon-border-card
        transition-all duration-300 transform-gpu
        flex flex-col
      `}
      style={customClipPath ? { clipPath: customClipPath } : undefined}
    >
        {/* Code-Befehle im Hintergrund - füllt den gesamten Button mit Tipp-Effekt */}
        <div className="absolute inset-0 p-2 opacity-40 flex flex-col justify-start" style={{ gap: '2px' }}>
          {codeLines.map((line, idx) => {
            // Zeige vollständige Zeilen, die bereits fertig getippt wurden
            const isBeforeCurrent = idx < currentCodeLineIndex;
            const isCurrent = idx === currentCodeLineIndex;
            const isAfterCurrent = idx > currentCodeLineIndex;
            
            if (isBeforeCurrent) {
              // Zeige vollständige Zeile
              return (
                <div key={idx} className="text-gray-500 whitespace-nowrap text-[10px] leading-tight">
                  {line}
                </div>
              );
            } else if (isCurrent) {
              // Zeige aktuell getippte Zeile
              const visiblePart = line.slice(0, codeTypingIndex);
              return (
                <div key={idx} className="text-gray-500 whitespace-nowrap text-[10px] leading-tight">
                  {visiblePart}
                  {codeTypingIndex < line.length && <span className="terminal-cursor-inline"></span>}
                </div>
              );
            } else {
              // Zeige leere Zeile für noch nicht getippte Zeilen
              return (
                <div key={idx} className="text-gray-500 whitespace-nowrap text-[10px] leading-tight opacity-20">
                  {'_'.repeat(Math.min(line.length, 20))}
                </div>
              );
            }
          })}
          {/* Wiederhole Code-Zeilen für vollständige Abdeckung */}
          {codeLines.slice(0, Math.ceil(codeLines.length / 2)).map((line, idx) => {
            const adjustedIdx = idx + codeLines.length;
            const isBeforeCurrent = adjustedIdx < currentCodeLineIndex + codeLines.length;
            const isCurrent = adjustedIdx === currentCodeLineIndex + codeLines.length;
            
            if (isBeforeCurrent) {
              return (
                <div key={`repeat-${idx}`} className="text-gray-500 whitespace-nowrap text-[10px] leading-tight opacity-30">
                  {line}
                </div>
              );
            } else if (isCurrent) {
              const visiblePart = line.slice(0, codeTypingIndex);
              return (
                <div key={`repeat-${idx}`} className="text-gray-500 whitespace-nowrap text-[10px] leading-tight opacity-30">
                  {visiblePart}
                  {codeTypingIndex < line.length && <span className="terminal-cursor-inline"></span>}
                </div>
              );
            } else {
              return (
                <div key={`repeat-${idx}`} className="text-gray-500 whitespace-nowrap text-[10px] leading-tight opacity-20">
                  {'_'.repeat(Math.min(line.length, 20))}
                </div>
              );
            }
          })}
        </div>

        {/* Bezeichnung hervorgehoben - maximal 2 Zeilen */}
        <div className={`relative z-10 flex-1 flex flex-col justify-center ${
          order === 1 ? 'pl-1 pr-3 py-2 items-start' : // LIZENZEN: Linksbündig mit kleinem Abstand, const und =certs; am l von lizenzen ausgerichtet
          order === 5 ? 'pl-0 pr-2 py-1.5 items-start' : // KONTAKT: Linksbündig wie Terminal
          order === 6 ? 'pl-2 pr-3 py-2 items-start' : // WERDEGANG: Linksbündig mit mehr Abstand zum linken Rand
          order === 2 ? 'pl-0 pr-2 py-1.5 items-start' : // PROJEKTE: Linksbündig
          order === 3 || order === 4 ? 'pl-0 pr-2 py-1 items-start' : // LIZENZEN & HOBBYS: Linksbündig
          'pl-0 pr-2 py-1 items-start'
        }`}>
          <div className={`space-y-0.5 w-full text-left`}>
            {titleLines.map((line, idx) => {
              const isLastLine = idx === titleLines.length - 1;
              const visibleData = visibleTitle[idx];
              const showCursorOnThisLine = showCursor && isLastLine && visibleData.visible < line.length;
              
              return (
                <div key={idx} className={`flex items-center leading-tight w-full justify-start`}>
                  {isSyntax ? (
                    <span className={`font-mono font-semibold text-left ${
                      order === 1 ? 'text-sm' : 
                      order === 6 ? 'text-xs' : 
                      order === 2 || order === 5 ? 'text-[10px]' : 
                      'text-[9px]'
                    }`}>
                      {renderSyntaxLine(line, idx === 0, visibleData.visible, idx)}
                      {showCursorOnThisLine && <span className="terminal-cursor-inline"></span>}
                    </span>
                  ) : (
                    <span className={`text-cyan-400 font-semibold text-left ${
                      order === 1 ? 'text-sm' : 
                      order === 6 ? 'text-xs' : 
                      order === 2 || order === 5 ? 'text-[10px]' : 
                      'text-[9px]'
                    }`}>
                      {visibleData.text.slice(0, visibleData.visible)}
                      {showCursorOnThisLine && <span className="terminal-cursor-inline"></span>}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
  );
};

export default HubCard;

