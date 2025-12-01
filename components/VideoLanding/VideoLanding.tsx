"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { playNodeClickSound } from "@/components/utils/soundEffects";
import "./styles/VideoLanding.styles.css";

export default function VideoLanding() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const transitionVideoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [geschlecht, setGeschlecht] = useState<"m" | "f" | null>(null);
  const [showTransition, setShowTransition] = useState(false);
  // Cache-Busting für Video - nur auf Client generieren um Hydration-Fehler zu vermeiden
  const [videoSrc, setVideoSrc] = useState('/StartingPortal.mp4');
  
  useEffect(() => {
    // Timestamp nur auf Client nach Mounting hinzufügen
    setVideoSrc(`/StartingPortal.mp4?t=${Date.now()}`);
  }, []);

  // Start-Video initialisieren
  useEffect(() => {
    const video = videoRef.current;
    if (!video || showTransition) return;

    // Video-Element zum Neuladen zwingen (Cache umgehen)
    video.load();

    const tryPlay = () => {
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            video.muted = false;
          })
          .catch((error) => {
            console.log("Autoplay blocked, trying muted:", error);
            video.muted = true;
            video.play().then(() => {
              setTimeout(() => {
                video.muted = false;
              }, 500);
            });
          });
      }
    };

    // Versuche sofort abzuspielen
    tryPlay();

    // Fallback: Warte auf canplay Event
    const handleCanPlay = () => {
      tryPlay();
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("loadeddata", handleCanPlay);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("loadeddata", handleCanPlay);
    };
  }, [showTransition]);

  useEffect(() => {
    const transitionVideo = transitionVideoRef.current;
    if (transitionVideo && showTransition) {
      transitionVideo.play();
      
      // Nach dem Video zur Hub-Seite navigieren
      transitionVideo.addEventListener("ended", () => {
        // Benutzerdaten in localStorage speichern
        if (typeof window !== "undefined") {
          localStorage.setItem("userVorname", vorname.trim());
          localStorage.setItem("userNachname", nachname.trim());
          localStorage.setItem("userGeschlecht", geschlecht || "");
        }
        router.push("/hub");
      });
    }
  }, [showTransition, router, vorname, nachname, geschlecht]);

  const isEnterEnabled = (vorname.trim() || nachname.trim()) && geschlecht !== null;

  const handleEnter = () => {
    if (isEnterEnabled) {
      // Start-Video sofort stoppen, damit der Sound nicht weiterläuft
      const startVideo = videoRef.current;
      if (startVideo) {
        startVideo.pause();
        startVideo.currentTime = 0;
        startVideo.muted = true;
      }

      // Sound-Effekt abspielen
      playNodeClickSound();
      // Übergangs-Video starten
      setShowTransition(true);
    }
  };

  const handleVornameFocus = () => {
    if (nachname.trim()) {
      setNachname("");
    }
  };

  const handleNachnameFocus = () => {
    if (vorname.trim()) {
      setVorname("");
    }
  };

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (video && video.paused && !showTransition) {
      video.play().catch(() => {
        video.muted = true;
        video.play();
      });
    }
  };

  return (
    <div 
      className="relative min-h-screen w-full overflow-hidden font-orbitron"
      onClick={handleVideoClick}
    >
      {/* Video-Container mit relativer Positionierung */}
      <div className="relative w-full h-screen">
        {/* Video-Hintergrund - immer gerendert für ref */}
        <video
          ref={videoRef}
          className={`absolute inset-0 video-landing-background z-0 ${showTransition ? "hidden" : ""}`}
          autoPlay
          controls={false}
          muted={false}
          playsInline
          loop
          preload="auto"
          onLoadedData={(e) => {
            const video = e.currentTarget;
            if (!showTransition) {
              const playPromise = video.play();
              if (playPromise !== undefined) {
                playPromise.catch((error) => {
                  console.log("Play failed, trying muted:", error);
                  video.muted = true;
                  video.play().then(() => {
                    setTimeout(() => {
                      video.muted = false;
                    }, 500);
                  });
                });
              }
            }
          }}
          onCanPlay={(e) => {
            const video = e.currentTarget;
            if (!showTransition && video.paused) {
              const playPromise = video.play();
              if (playPromise !== undefined) {
                playPromise.catch(() => {
                  video.muted = true;
                  video.play();
                });
              }
            }
          }}
          onError={(e) => {
            console.error("Video loading error:", e);
            const video = e.currentTarget;
            console.log("Video error details:", {
              error: video.error,
              networkState: video.networkState,
              readyState: video.readyState,
              src: video.currentSrc
            });
          }}
        >
          <source src={videoSrc} type="video/mp4" />
          Ihr Browser unterstützt das Video-Tag nicht.
        </video>

        {/* Übergangs-Video (wird angezeigt wenn showTransition true ist) */}
        {showTransition && (
          <video
            ref={transitionVideoRef}
            className="absolute inset-0 video-landing-transition z-30"
            autoPlay
            controls={false}
            muted={false}
            playsInline
            preload="auto"
          >
            <source src="/uebergang.mp4" type="video/mp4" />
            Ihr Browser unterstützt das Video-Tag nicht.
          </video>
        )}

        {/* UI-Elemente */}
        {!showTransition && (
          <>
            {/* Name-Inputs und Geschlechts-Buttons - Mittig im Portal */}
            <div className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-6 text-center">
          {/* Obere Reihe: Vorname | ⊻ | Nachname */}
          <div className="flex items-center gap-4">
            {/* Vorname Input */}
            <input
              type="text"
              placeholder="Vorname"
              value={vorname}
              onChange={(e) => setVorname(e.target.value)}
              onFocus={handleVornameFocus}
              className="w-44 bg-black/20 backdrop-blur-sm px-4 py-3 text-center text-xl neon-cyan neon-border-cyan rounded-lg focus:outline-none placeholder:text-cyan-300 placeholder:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] focus:scale-105 transition-transform text-cyan-200"
              style={{
                textShadow: "0 0 5px #00ffff, 0 0 10px #00ffff",
              }}
            />
            
            {/* Trenner */}
            <span className="text-4xl neon-cyan" style={{ filter: 'drop-shadow(0 0 8px #00ffff)' }}>⊻</span>
            
            {/* Nachname Input */}
            <input
              type="text"
              placeholder="Nachname"
              value={nachname}
              onChange={(e) => setNachname(e.target.value)}
              onFocus={handleNachnameFocus}
              className="w-44 bg-black/20 backdrop-blur-sm px-4 py-3 text-center text-xl neon-cyan neon-border-cyan rounded-lg focus:outline-none placeholder:text-cyan-300 placeholder:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] focus:scale-105 transition-transform text-cyan-200"
              style={{
                textShadow: "0 0 5px #00ffff, 0 0 10px #00ffff",
              }}
            />
          </div>

          {/* Geschlecht Buttons */}
          <div className="flex items-center gap-4">
            {/* Männlich Button */}
            <button
              onClick={() => {
                playNodeClickSound();
                setGeschlecht("m");
              }}
              className={`w-24 h-24 bg-transparent rounded-lg text-5xl transition-all flex items-center justify-center z-20 ${
                geschlecht === "m"
                  ? "neon-blue neon-border-blue scale-110"
                  : "neon-cyan neon-border-cyan opacity-60 hover:opacity-100 hover:scale-105"
              }`}
            >
              ♂
            </button>
            
            {/* Weiblich Button */}
            <button
              onClick={() => {
                playNodeClickSound();
                setGeschlecht("f");
              }}
              className={`w-24 h-24 bg-transparent rounded-lg text-5xl transition-all flex items-center justify-center z-20 ${
                geschlecht === "f"
                  ? "neon-pink neon-border-pink scale-110"
                  : "neon-cyan neon-border-cyan opacity-60 hover:opacity-100 hover:scale-105"
              }`}
            >
              ♀
            </button>
          </div>
            </div>

            {/* Enter Button - Statisch mit Raute und Ringen */}
            <div className="absolute left-1/2 top-[80%] -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
          <button
            onClick={handleEnter}
            disabled={!isEnterEnabled}
            className={`enter-button ${!isEnterEnabled ? "disabled" : ""}`}
          >
            {/* Äußerer Ring */}
            <div className={`enter-button-outer-ring ${!isEnterEnabled ? "disabled" : ""}`} />
            
            {/* Innerer Ring */}
            <div className={`enter-button-inner-ring ${!isEnterEnabled ? "disabled" : ""}`} />
            
            {/* Raute in der Mitte */}
            <div className={`enter-button-diamond ${!isEnterEnabled ? "disabled" : ""}`} />
          </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
