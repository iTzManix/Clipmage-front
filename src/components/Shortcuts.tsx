"use client";
import { HelpCircle, Info, Monitor, Pause, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";

type Media = { type: "video"; src: string } | { type: "image"; src: string };

type Shortcut = {
  id: string;
  keys: string;
  description: string;
  icon: React.ReactNode;
  media?: Media;
};

const ASSETS_VERSION = process.env.NEXT_PUBLIC_ASSETS_VERSION ?? "v1";
const v = (p: string) => `${p}?v=${ASSETS_VERSION}`;

const SHORTCUTS: Shortcut[] = [
  {
    id: "capture",
    keys: "Ctrl+Alt+S",
    description: "Capturar pantalla",
    icon: <Monitor className="w-5 h-5" />,
    media: { type: "video", src: v("/assets/clip.mp4") },
  },
  {
    id: "pause",
    keys: "Ctrl+Alt+P",
    description: "Pausar / Reanudar",
    icon: <Pause className="w-5 h-5" />,
    media: { type: "image", src: v("/assets/pause-resume.webp") },
  },
  {
    id: "info",
    keys: "Ctrl+Alt+I",
    description: "Mostrar info",
    icon: <Info className="w-5 h-5" />,
    media: { type: "image", src: v("/assets/information.webp") },
  },
  {
    id: "theme",
    keys: "Ctrl+Alt+T",
    description: "Cambiar tema",
    icon: <Sun className="w-5 h-5" />,
    media: { type: "image", src: v("/assets/themes.webp") },
  },
  {
    id: "help",
    keys: "Ctrl+Alt+H",
    description: "Mostrar ayuda",
    icon: <HelpCircle className="w-5 h-5" />,
    media: { type: "image", src: v("/assets/help.webp") },
  },
  {
    id: "quit",
    keys: "Ctrl+Alt+W",
    description: "Cerrar app",
    icon: <X className="w-5 h-5" />,
    media: { type: "image", src: v("/assets/quit.webp") },
  },
];

export default function Shortcuts({ initialId }: { initialId?: string }) {
  const [selectedId, setSelectedId] = useState<string>(
    initialId ?? SHORTCUTS[0].id
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const selected = SHORTCUTS.find((s) => s.id === selectedId) ?? SHORTCUTS[0];

  useEffect(() => {
    if (initialId) setSelectedId(initialId);
  }, [initialId]);

  useEffect(() => {
    if (selected.media?.type === "video") {
      const timer = setTimeout(() => setIsPlaying(true), 200);
      return () => clearTimeout(timer);
    } else {
      setIsPlaying(false);
    }
  }, [selected.media]);

  return (
    <div className="w-full space-y-4">
      <div className="relative w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden ring-1 ring-black/5">
        <div className="aspect-video relative bg-slate-900">
          {SHORTCUTS.map((s) =>
            s.media?.type === "image" ? (
              <img
                key={`preload-${s.id}`}
                src={s.media.src}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
                loading="eager"
              />
            ) : null
          )}
          {selected.media?.type === "video" && (
            <>
              <img
                src={v("/assets/clip-poster.webp")}
                alt="Preview"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  isPlaying ? "opacity-0" : "opacity-100"
                }`}
              />
              <video
                src={selected.media.src}
                loop
                muted
                autoPlay
                playsInline
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  isPlaying ? "opacity-100" : "opacity-0"
                }`}
              />
            </>
          )}
          {SHORTCUTS.map((s) =>
            s.media?.type === "image" ? (
              <img
                key={s.id}
                src={s.media.src}
                alt={s.description}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  s.id === selectedId ? "opacity-100" : "opacity-0"
                }`}
              />
            ) : null
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
      <div className="max-w-xl mx-auto">
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl ring-1 ring-black/5 p-6">
          <ul className="space-y-2">
            {SHORTCUTS.map((shortcut) => {
              const isSelected = shortcut.id === selectedId;
              return (
                <li
                  key={shortcut.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedId(shortcut.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedId(shortcut.id);
                    }
                  }}
                  className={`
                    group flex items-center justify-between p-4 rounded-xl transition-all duration-300 cursor-pointer
                    ${
                      isSelected
                        ? "bg-linear-to-r from-blue-600 to-amber-500 text-white shadow-lg scale-[1.02]"
                        : "bg-white/60 hover:bg-linear-to-r hover:from-blue-500 hover:to-amber-400 hover:text-white hover:shadow-md"
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2 rounded-lg transition-colors ${
                        isSelected
                          ? "bg-white/20"
                          : "bg-slate-100 group-hover:bg-white/30"
                      }`}
                    >
                      {shortcut.icon}
                    </div>
                    <div>
                      <p className="font-mono text-sm font-semibold">
                        {shortcut.keys}
                      </p>
                      <p
                        className={`text-sm ${
                          isSelected
                            ? "text-white/90"
                            : "text-slate-600 group-hover:text-white/90"
                        }`}
                      >
                        {shortcut.description}
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
