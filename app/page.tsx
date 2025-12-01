"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { playNodeClickSound } from "@/components/utils/soundEffects";

const SYSTEM_ACCESS_TEXT = "SYSTEM ACCESS";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const transitionVideoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [geschlecht, setGeschlecht] = useState<"m" | "f" | "d" | null>(null);
  const [showTransition, setShowTransition] = useState(false);
  const [activeField, setActiveField] = useState<"first" | "last" | null>(null);
  const [accessGranted, setAccessGranted] = useState(false);
  
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

    tryPlay();

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
      
      transitionVideo.addEventListener("ended", () => {
        // Benutzerdaten in localStorage speichern (konsistent mit hub/page.tsx)
        if (typeof window !== "undefined") {
          localStorage.setItem("vorname", vorname.trim());
          localStorage.setItem("nachname", nachname.trim());
          localStorage.setItem("geschlecht", geschlecht || "");
        }
        router.push("/hub");
      });
    }
  }, [showTransition, router, vorname, nachname, geschlecht]);

  const isEnterEnabled = (vorname.trim() || nachname.trim()) && geschlecht !== null;

  const handleEnter = () => {
    if (isEnterEnabled) {
      const startVideo = videoRef.current;
      if (startVideo) {
        startVideo.pause();
        startVideo.currentTime = 0;
        startVideo.muted = true;
      }

      playNodeClickSound();
      setShowTransition(true);
    }
  };

  const handleVornameFocus = () => {
    setActiveField("first");
  };

  const handleNachnameFocus = () => {
    setActiveField("last");
  };

  const handleVornameChange = (value: string) => {
    setVorname(value);
    if (value.trim()) {
      setNachname("");
      setActiveField("first");
    }
  };

  const handleNachnameChange = (value: string) => {
    setNachname(value);
    if (value.trim()) {
      setVorname("");
      setActiveField("last");
    }
  };

  const isFormPhase = accessGranted && !showTransition;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black font-orbitron">
      {/* Video-Hintergrund */}
      {!showTransition && (
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover ${
              isFormPhase ? "opacity-30" : "opacity-100"
            }`}
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
          >
            <source src={videoSrc} type="video/mp4" />
            Ihr Browser unterstützt das Video-Tag nicht.
          </video>
          
          {/* Subtiles Grid-Overlay nur, wenn das Formular sichtbar ist */}
          {isFormPhase && (
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}
            />
          )}
        </div>
      )}

      {/* Übergangs-Video */}
      {showTransition && (
        <video
          ref={transitionVideoRef}
          className="absolute inset-0 z-30 w-full h-full object-cover"
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

      {/* Zweistufige Interaktion - Nur wenn kein Übergang */}
      {!showTransition && (
        <AnimatePresence mode="wait">
          {/* Stufe 1: Access-Trigger */}
          {!accessGranted && (
            <motion.div
              key="access-trigger"
              className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 translate-y-[5.5vh]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.div
                className="flex flex-col items-center gap-8"
                initial="initial"
                whileHover="hovered"
              >
                {/* Neon-Trigger-Button */}
                <motion.button
                  type="button"
                  onClick={() => {
                    playNodeClickSound();
                    setAccessGranted(true);
                  }}
                  className="relative flex items-center justify-center bg-black/50 border-2 border-cyan-400 rounded-full p-4 md:p-5 shadow-[0_0_30px_rgba(0,255,255,0.3)] transition-transform duration-300 hover:scale-110"
                  variants={{
                    initial: { boxShadow: "0 0 30px rgba(0,255,255,0.2)" },
                    hovered: { boxShadow: "0 0 45px rgba(0,255,255,0.5)" },
                  }}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                >
                  {/* Power-Symbol */}
                  <div className="relative flex items-center justify-center w-11 h-11 md:w-13 md:h-13">
                    <div className="absolute inset-0 rounded-full border border-cyan-400/40" />
                    <div className="absolute inset-3 rounded-full border border-cyan-400/60" />
                    <span className="text-xl md:text-2xl text-pink-300">⏻</span>
                  </div>
                </motion.button>

                {/* Linie + Terminal-Text */}
                <motion.div
                  className="flex items-center gap-4"
                  variants={{
                    initial: {},
                    hovered: {},
                  }}
                >
                  <svg
                    width="260"
                    height="48"
                    viewBox="0 0 260 48"
                    className="overflow-visible"
                  >
                    <defs>
                      <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow
                          dx="0"
                          dy="0"
                          stdDeviation="3"
                          floodColor="#22d3ee"
                          floodOpacity="0.9"
                        />
                      </filter>
                    </defs>
                    <motion.path
                      d="M0 24 H260"
                      strokeWidth="2"
                      strokeLinecap="round"
                      stroke="rgba(34,211,238,0.8)"
                      filter="url(#neon-glow)"
                      variants={{
                        initial: { pathLength: 0, opacity: 0 },
                        hovered: {
                          pathLength: 1,
                          opacity: 1,
                          transition: {
                            duration: 0.8,
                            ease: "easeInOut",
                          },
                        },
                      }}
                    />
                  </svg>

                  {/* Typewriter "SYSTEM ACCESS_" mit Rahmen & dunklem Filter */}
                  <motion.div
                    className="font-orbitron text-cyan-400 text-xs md:text-sm tracking-[0.3em] uppercase bg-black/70 border border-cyan-400/50 rounded-md px-4 py-2 shadow-[0_0_20px_rgba(0,0,0,0.8)]"
                    variants={{
                      initial: {
                        opacity: 0,
                      },
                      hovered: {
                        opacity: 1,
                        transition: {
                          delay: 0.8,
                          staggerChildren: 0.06,
                          delayChildren: 0.85,
                        },
                      },
                    }}
                  >
                    {SYSTEM_ACCESS_TEXT.split("").map((char, index) => (
                      <motion.span
                        key={`${char}-${index}`}
                        variants={{
                          initial: { opacity: 0, y: 4 },
                          hovered: { opacity: 1, y: 0 },
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                    {/* Leerzeichen vor dem Underscore */}
                    <span>&nbsp;</span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.4,
                      }}
                    >
                      _
                    </motion.span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* Stufe 2: Formular */}
          {accessGranted && (
            <motion.div
              key="access-form"
              className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-cyan-400 tracking-widest mb-4 font-bold">
                SYSTEM ACCESS
              </h1>
              
              {/* Subline */}
              <p className="text-xs text-gray-400 mb-8 tracking-wider">
                Identify yourself to initialize the neural link.
              </p>
            
              {/* Input Container */}
              <div className="w-full max-w-md space-y-6">
                {/* FIRST NAME Input */}
                <div className="space-y-2">
                  <label className="block text-xs text-cyan-400 tracking-widest uppercase">
                    FIRST NAME
                  </label>
                  <p className="text-xs text-gray-500 mb-2">Casual Mode</p>
                  <input
                    type="text"
                    value={vorname}
                    onChange={(e) => handleVornameChange(e.target.value)}
                    onFocus={handleVornameFocus}
                    placeholder="Enter first name"
                    className={`w-full bg-black/50 border-2 px-4 py-3 text-cyan-200 placeholder:text-cyan-400/50 focus:outline-none transition-all ${
                      nachname.trim() || activeField === "last"
                        ? "opacity-50 border-cyan-500/30" 
                        : "border-cyan-500/50 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,255,255,0.5)]"
                    }`}
                  />
                </div>
            
                {/* OR Trenner */}
                <div className="flex items-center justify-center gap-4">
                  <div className="h-px bg-cyan-500/30 flex-1"></div>
                  <span className="text-sm text-gray-400 uppercase tracking-wider">- OR -</span>
                  <div className="h-px bg-cyan-500/30 flex-1"></div>
                </div>
            
                {/* LAST NAME Input */}
                <div className="space-y-2">
                  <label className="block text-xs text-cyan-400 tracking-widest uppercase">
                    LAST NAME
                  </label>
                  <p className="text-xs text-gray-500 mb-2">Professional Mode</p>
                  <input
                    type="text"
                    value={nachname}
                    onChange={(e) => handleNachnameChange(e.target.value)}
                    onFocus={handleNachnameFocus}
                    placeholder="Enter last name"
                    className={`w-full bg-black/50 border-2 px-4 py-3 text-cyan-200 placeholder:text-cyan-400/50 focus:outline-none transition-all ${
                      vorname.trim() || activeField === "first"
                        ? "opacity-50 border-cyan-500/30" 
                        : "border-cyan-500/50 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,255,255,0.5)]"
                    }`}
                  />
                </div>
            
                {/* Voice Synthesis Protocol */}
                <div className="space-y-3 mt-8">
                  <label className="block text-xs text-cyan-400 tracking-widest uppercase mb-3">
                    VOICE SYNTHESIS PROTOCOL
                  </label>
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => {
                        playNodeClickSound();
                        setGeschlecht("m");
                      }}
                      className={`px-6 py-3 border-2 transition-all flex items-center gap-2 ${
                        geschlecht === "m"
                          ? "bg-cyan-900 text-cyan-400 border-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.5)]"
                          : "bg-transparent text-gray-400 border-cyan-500/30 hover:border-cyan-500/50"
                      }`}
                    >
                      <span className="text-2xl">👨</span>
                      <span className="text-sm uppercase tracking-wider">Male</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        playNodeClickSound();
                        setGeschlecht("f");
                      }}
                      className={`px-6 py-3 border-2 transition-all flex items-center gap-2 ${
                        geschlecht === "f"
                          ? "bg-cyan-900 text-cyan-400 border-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.5)]"
                          : "bg-transparent text-gray-400 border-cyan-500/30 hover:border-cyan-500/50"
                      }`}
                    >
                      <span className="text-2xl">👩</span>
                      <span className="text-sm uppercase tracking-wider">Female</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        playNodeClickSound();
                        setGeschlecht("d");
                      }}
                      className={`px-6 py-3 border-2 transition-all flex items-center gap-2 ${
                        geschlecht === "d"
                          ? "bg-cyan-900 text-cyan-400 border-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.5)]"
                          : "bg-transparent text-gray-400 border-cyan-500/30 hover:border-cyan-500/50"
                      }`}
                    >
                      <span className="text-2xl">🤖</span>
                      <span className="text-sm uppercase tracking-wider">Diverse</span>
                    </button>
                  </div>
                </div>
            
                {/* Submit Button */}
                <button
                  onClick={handleEnter}
                  disabled={!isEnterEnabled}
                  className={`w-full py-4 mt-6 border-2 uppercase tracking-widest font-bold transition-all ${
                    isEnterEnabled
                      ? "border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black cursor-pointer animate-pulse-glow"
                      : "border-cyan-500/30 text-gray-500 cursor-not-allowed opacity-50"
                  }`}
                >
                  INITIALIZE UPLINK
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
