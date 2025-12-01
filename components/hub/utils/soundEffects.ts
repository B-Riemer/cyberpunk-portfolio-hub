/**
 * Generates a light, pleasant chime sound effect using Web Audio API
 * Like a gentle digital chime or bell
 */
export function playNodeClickSound() {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const now = audioContext.currentTime;
    
    // Create a light chime with two quick tones
    // First tone - higher pitch
    const osc1 = audioContext.createOscillator();
    const gain1 = audioContext.createGain();
    osc1.connect(gain1);
    gain1.connect(audioContext.destination);
    
    osc1.frequency.setValueAtTime(1200, now); // Higher, pleasant tone
    osc1.type = 'sine'; // Soft sine wave
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.08, now + 0.001); // Very quick attack
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.08); // Quick fade
    
    // Second tone - slightly lower, creates harmony
    const osc2 = audioContext.createOscillator();
    const gain2 = audioContext.createGain();
    osc2.connect(gain2);
    gain2.connect(audioContext.destination);
    
    osc2.frequency.setValueAtTime(1500, now + 0.02); // Slightly delayed, higher harmony
    osc2.type = 'sine';
    gain2.gain.setValueAtTime(0, now + 0.02);
    gain2.gain.linearRampToValueAtTime(0.06, now + 0.021);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    
    // Play both tones
    osc1.start(now);
    osc1.stop(now + 0.08);
    osc2.start(now + 0.02);
    osc2.stop(now + 0.1);
    
    // Cleanup: schließe den AudioContext, nachdem beide Töne sicher abgespielt wurden
    // Gesamtdauer des Sounds ab "now" bis zum Ende des zweiten Tons
    const totalDurationSeconds = 0.1; // letzter stop-Zeitpunkt (now + 0.1)
    const bufferMs = 100; // kleiner Puffer in Millisekunden

    setTimeout(() => {
      if (audioContext.state !== 'closed') {
        audioContext.close();
      }
    }, totalDurationSeconds * 1000 + bufferMs);
  } catch (error) {
    console.debug('Audio context not available:', error);
  }
}

/**
 * Sound effect for closing a panel - softer, descending chime
 */
export function playPanelCloseSound() {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    const now = audioContext.currentTime;
    
    // Soft, gentle descending tone
    oscillator.frequency.setValueAtTime(1000, now);
    oscillator.frequency.exponentialRampToValueAtTime(700, now + 0.08);
    oscillator.type = 'sine'; // Soft sine wave
    
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.06, now + 0.001); // Softer volume
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    
    oscillator.start(now);
    oscillator.stop(now + 0.08);
    
    oscillator.onended = () => {
      audioContext.close();
    };
  } catch (error) {
    console.debug('Audio context not available:', error);
  }
}

