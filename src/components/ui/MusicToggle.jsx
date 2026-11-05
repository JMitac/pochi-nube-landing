import { useEffect, useRef, useState } from "react";

// Los navegadores bloquean el audio con sonido hasta que la persona
// interactúa con la página (política de autoplay) — intentar reproducir sin
// gesto deja la promesa de Tone.js colgada para siempre, así que ni lo
// intentamos. En cambio, arrancamos en su primer toque/clic/tecla en
// cualquier parte de la página, para que se sienta automático sin que tenga
// que encontrar el botón. ("scroll" no cuenta como gesto para los
// navegadores, así que no lo usamos como disparador.)
const FIRST_INTERACTION_EVENTS = ["pointerdown", "keydown", "touchstart"];

export default function MusicToggle({ label = "Nuestra canción" }) {
  const [playing, setPlaying] = useState(false);
  const melodyRef = useRef(null);
  const startingRef = useRef(false);
  const startedRef = useRef(false);

  async function ensureMelody() {
    if (!melodyRef.current) {
      const { createMelody } = await import("../../audio/melody");
      melodyRef.current = createMelody();
    }
    return melodyRef.current;
  }

  async function startMelody() {
    if (startedRef.current || startingRef.current) return;
    startingRef.current = true;
    try {
      const melody = await ensureMelody();
      await melody.play();
      startedRef.current = true;
      setPlaying(true);
    } catch {
      // El gesto no alcanzó para desbloquear el audio; los listeners
      // siguen activos para reintentar en la próxima interacción.
    } finally {
      startingRef.current = false;
    }
  }

  useEffect(() => {
    function onFirstInteraction(event) {
      if (startedRef.current) return;
      if (event.target.closest?.("[data-music-toggle]")) return;
      startMelody();
    }

    FIRST_INTERACTION_EVENTS.forEach((type) =>
      window.addEventListener(type, onFirstInteraction, { passive: true })
    );

    return () => {
      FIRST_INTERACTION_EVENTS.forEach((type) =>
        window.removeEventListener(type, onFirstInteraction)
      );
      melodyRef.current?.dispose();
    };
  }, []);

  async function handleToggleClick() {
    if (startingRef.current) return;

    if (!startedRef.current) {
      await startMelody();
      return;
    }

    const melody = await ensureMelody();
    if (playing) {
      melody.pause();
      setPlaying(false);
    } else {
      await melody.play();
      setPlaying(true);
    }
  }

  return (
    <button
      type="button"
      data-music-toggle
      onClick={handleToggleClick}
      aria-pressed={playing}
      aria-label={playing ? `Pausar ${label}` : `Reproducir ${label}`}
      title={label}
      className="press fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full border-[4px] border-ink bg-yellow shadow-[0_5px_0_#4A3424] flex items-center justify-center"
    >
      <svg
        aria-hidden="true"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#4A3424"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={playing ? "duck-bob" : ""}
      >
        {playing ? (
          <>
            <rect x="6" y="5" width="4" height="14" rx="1" fill="#4A3424" />
            <rect x="14" y="5" width="4" height="14" rx="1" fill="#4A3424" />
          </>
        ) : (
          <path d="M9 18 V5 L20 3 V16 M9 10 L20 8" fill="none" />
        )}
        {!playing && (
          <>
            <circle cx="6.5" cy="18" r="2.6" fill="#4A3424" />
            <circle cx="17.5" cy="16" r="2.6" fill="#4A3424" />
          </>
        )}
      </svg>
    </button>
  );
}
