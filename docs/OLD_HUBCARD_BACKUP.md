# HubCard Backup

Backup der Datei `components/hub/HubCard.tsx` (ursprünglich `src/components/HubCard.tsx`)

```tsx
// src/components/HubCard.tsx

// RADIKALE NEUIMPLEMENTIERUNG: Stellt die Trapezform sicher.

'use client';

import Link from 'next/link';

interface HubCardProps {
  title: string;
  description: string;
  href: string;
}

/**
 * HubCard Komponente mit Trapezform (via clip-path) und Neon-Glow.
 * Die Form ist inline definiert, um Konflikte zu vermeiden.
 */
const HubCard: React.FC<HubCardProps> = ({ title, description, href }) => {
  
  // Stärkere Verjüngung für maximale Sichtbarkeit und Debugging
  const trapezStyle: React.CSSProperties = {
    clipPath: 'polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)',
  };

  return (
    <Link href={href} className="block w-full h-full">
      <div 
        style={trapezStyle} // Trapezform inline angewendet
        className={`
          overflow-visible
          relative p-6 transition-all duration-300
          bg-gray-900/90 border-2 border-primary-500
          shadow-lg shadow-primary-500/30 
          cursor-pointer hover:shadow-xl hover:shadow-primary-500/50 hover:bg-gray-800/90
          after:content-[''] after:absolute after:inset-0 after:bg-white after:opacity-[0.02] after:pointer-events-none
        `}
      >
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </Link>
  );
};

export default HubCard;
```

