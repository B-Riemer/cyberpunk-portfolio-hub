"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { playRobotActivationSound } from "@/components/utils/soundEffects";
import "./styles/ChatBot.styles.css";

interface SourceReference {
  documentId: string;
  title: string;
  section: string;
  category?: string;
  excerpt?: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: SourceReference[];
}

interface ChatBotProps {
  vorname?: string;
  nachname?: string;
  geschlecht?: "m" | "f" | "d" | null;
  position?: { top: string; left: string };
}

export default function ChatBot({ vorname, nachname, geschlecht, position }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasPlayedSoundRef = useRef(false);

  // Roboter-Sound beim Öffnen des Chatbots (nur einmal)
  useEffect(() => {
    if (isOpen && !hasPlayedSoundRef.current) {
      playRobotActivationSound();
      hasPlayedSoundRef.current = true;
    }
    // Reset beim Schließen, damit Sound beim nächsten Öffnen wieder abgespielt wird
    if (!isOpen) {
      hasPlayedSoundRef.current = false;
    }
  }, [isOpen]);

  // Initial greeting based on user data
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      let greeting = "";
      if (nachname && geschlecht === "f") {
        greeting = `Guten Tag, Frau ${nachname}! 👋 Ich bin Ihr persönlicher Assistent und helfe Ihnen gerne bei Fragen zu dieser Seite oder bei der Navigation.`;
      } else if (vorname) {
        greeting = `Hallo ${vorname}! 👋 Ich bin dein persönlicher Assistent und helfe dir gerne bei Fragen zu dieser Seite oder bei der Navigation.`;
      } else {
        greeting = "Hallo! 👋 Ich bin dein persönlicher Assistent und helfe dir gerne bei Fragen zu dieser Seite oder bei der Navigation.";
      }
      
      setMessages([{ role: "assistant", content: greeting }]);
    }
  }, [isOpen, vorname, nachname, geschlecht]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          vorname,
          nachname,
          geschlecht,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.message,
          sources: data.sources || [],
        },
      ]);
    } catch (error) {
      console.error("Chat Error:", error);
      let errorMessage = "Entschuldigung, es gab einen Fehler. ";
      
      if (error instanceof Error) {
        if (error.message.includes("quota") || error.message.includes("Guthaben") || error.message.includes("billing")) {
          errorMessage += "Das OpenAI-Konto hat kein Guthaben mehr. Bitte überprüfe dein Billing und füge Guthaben hinzu: https://platform.openai.com/account/billing";
        } else if (error.message.includes("OPENAI_API_KEY") || error.message.includes("API key") || error.message.includes("AUTH_ERROR")) {
          errorMessage += "Der API-Schlüssel ist nicht konfiguriert oder ungültig. Bitte kontaktiere den Administrator.";
        } else if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
          errorMessage += "Netzwerkfehler. Bitte überprüfe deine Internetverbindung.";
        } else if (error.message.includes("RATE_LIMIT")) {
          errorMessage += "Zu viele Anfragen. Bitte warte einen Moment und versuche es erneut.";
        } else {
          errorMessage += error.message;
        }
      }
      
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorMessage,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chatbot Button - Direkt wie NodeButton positioniert, mittig im Portal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chatbot-toggle absolute z-50 border-cyan-400 transition-all duration-300 opacity-90 hover:opacity-100"
        style={{
          top: position?.top || '56%',
          left: position?.left || '50%',
          transform: 'translate(-50%, -50%)',
        }}
        aria-label="Chatbot öffnen"
      >
        {/* Innerer pulsierender Ring - zentriert */}
        <div
          className="chatbot-pulse absolute rounded-full border-2 border-cyan-400 bg-white/30 backdrop-blur-sm"
          style={{
            width: '40px',
            height: '40px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 15px rgba(0,255,255,0.8), 0 0 30px rgba(0,255,255,0.6), 0 0 45px rgba(0,255,255,0.4), 0 0 60px rgba(0,255,255,0.2)`,
          }}
        />
        
        {/* Äußerer pulsierender Ring - zentriert */}
        <div
          className="chatbot-pulse-outer absolute rounded-full border border-cyan-400"
          style={{
            width: '80px',
            height: '80px',
            transform: 'translate(-50%, -50%)',
            top: '50%',
            left: '50%',
            borderWidth: '1px',
            boxShadow: `0 0 20px rgba(0,255,255,0.6), 0 0 40px rgba(0,255,255,0.4)`,
          }}
        />
        
        {/* Icon - zentriert im Portal */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl transition-transform duration-300 z-10">
          🤖
        </div>
        
        {/* Notification Dot - unter dem Emoji wie bei den Kategorien */}
        {!isOpen && (
          <span className="absolute top-[calc(50%+20px)] left-1/2 -translate-x-1/2 w-4 h-4 bg-pink-400 rounded-full border-2 border-cyan-400 animate-pulse z-20" />
        )}
      </button>

      {/* Chat Window - Zentriert im Portal, relativ zum Video-Container */}
      {isOpen && (
        <div 
          className="chatbot-window absolute z-50 w-96 h-[500px] bg-white/10 backdrop-blur-md border-2 border-cyan-400 rounded-xl shadow-[0_0_30px_rgba(0,255,255,0.3)] flex flex-col"
          style={{
            top: '56%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Header */}
          <div className="chatbot-header px-4 py-3 border-b-2 border-cyan-400/30 bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              <h3 className="text-cyan-300 font-orbitron font-semibold">AI ASSISTANT</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-cyan-400 text-cyan-300 hover:bg-white/10 transition-colors text-xl font-bold"
              aria-label="Chatbot schließen"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {messages.map((msg, index) => (
              <div key={index} className="space-y-2">
                <div
                  className={`message ${msg.role === "user" ? "message-user" : "message-assistant"}`}
                >
                  <div className="message-content">{msg.content}</div>
                </div>
                {/* Quellen anzeigen */}
                {msg.role === "assistant" && msg.sources && msg.sources.length > 0 && (
                  <div className="message-sources ml-4 mt-2 space-y-1">
                    <div className="text-xs text-cyan-400/70 font-semibold mb-1">
                      Quellen:
                    </div>
                    {msg.sources.map((source, sourceIndex) => (
                      <div
                        key={sourceIndex}
                        className="text-xs text-cyan-300/60 bg-white/5 border border-cyan-400/20 rounded px-2 py-1"
                      >
                        <span className="font-semibold text-cyan-300/80">
                          {source.title}
                        </span>
                        {source.section && (
                          <span className="text-cyan-400/60 ml-1">
                            ({source.section}
                            {source.category && ` • ${source.category}`})
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="message message-assistant">
                <div className="message-content">
                  <span className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chatbot-input px-4 py-3 border-t-2 border-cyan-400/30 bg-white/5">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Frage stellen..."
                className="flex-1 px-3 py-2 bg-white/5 border border-cyan-400/30 rounded-lg text-cyan-200 placeholder-cyan-400/50 focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-colors"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="px-4 py-2 bg-cyan-400/20 border border-cyan-400/50 rounded-lg text-cyan-300 hover:bg-cyan-400/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Senden
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

