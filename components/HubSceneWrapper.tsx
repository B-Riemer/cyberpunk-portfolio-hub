'use client';

import React from 'react';

interface HubSceneWrapperProps {
  children: React.ReactNode;
}

/**
 * HubSceneWrapper - Aspect Ratio Lock für 3D-HUB-Szene
 * 
 * Stabilisiert das Layout mit einem festen 16:9 Seitenverhältnis basierend auf der Bildschirmhöhe.
 * Verhindert das "Schwimmen" der Buttons durch einen fixen Ankerpunkt.
 * 
 * Features:
 * - h-screen: Volle Bildschirmhöhe als Basis
 * - aspect-video (16:9): Breite wird automatisch basierend auf Höhe berechnet
 * - Position: relative für absolute Positionierung der Children
 * - Overflow: hidden für saubere Begrenzung innerhalb des Wrappers
 * 
 * Scroll-Verhalten:
 * - Wenn die berechnete Breite größer als der Viewport ist,
 *   aktiviert der übergeordnete Container (overflow-x-auto) horizontales Scrollen
 */
export default function HubSceneWrapper({ children }: HubSceneWrapperProps) {
  return (
    <div className="relative h-screen aspect-video overflow-hidden">
      {children}
    </div>
  );
}

