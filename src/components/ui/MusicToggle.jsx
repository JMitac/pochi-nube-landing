import { useEffect, useRef, useState } from "react";
import { createMelody } from "../../audio/melody";

// Los navegadores bloquean el audio con sonido hasta que la persona
// interactúa con la página (política de autoplay) — intentar reproducir sin
// gesto deja la promesa de Tone.js colgada para siempre, así que ni lo
// intentamos. En cambio, arrancamos en su primer toque/clic/tecla en
// cualquier parte de la página, para que se sienta automático sin que tenga
// que encontrar el botón. ("scroll" no cuenta como gesto para los
// navegadores, así que no lo usamos como disparador.)
//
// En celulares, además, el sistema operativo suspende el audio al bloquear
// la pantalla o cambiar de app — sin avisarle a React — y eso cortaba la
// melodía después de la primera vuelta. Por eso dejamos los listeners
// activos para siempre (nunca se desconectan) y también reintentamos cuando
// la pestaña vuelve a estar visible.
const FIRST_INTERACTION_EVENTS = ["pointerdown", "keydown", "touchstart"];

export default function MusicToggle({ label = "Nuestra canción" }) {
  const [playing, setPlaying] = useState(false);
  const melodyRef = useRef(null);
  const startingRef = useRef(false);
  const userPausedRef = useRef(false);

  function ensureMelody() {
    if (!melodyRef.current) {
      const melody = createMelody();
      melody.onContextStateChange((state) => {
        if (state !== "running") setPlaying(false);
      });
      melodyRef.current = melody;
    }
    return melodyRef.current;
  }

  async function tryResume() {
    if (startingRef.current || userPausedRef.current) return;
    if (melodyRef.current?.isRunning()) return;
    startingRef.current = true;
    try {
      const melody = ensureMelody();
      await melody.play();
      setPlaying(true);
    } catch (err) {
      // El navegador todavía no lo permite (o la creación del audio falló);
      // lo dejamos en consola para poder diagnosticarlo y seguimos
      // esperando la próxima interacción.
      console.error("No se pudo iniciar la música automáticamente:", err);
    } finally {
      startingRef.current = false;
    }
  }

  useEffect(() => {
    function onFirstInteraction(event) {
      if (event.target.closest?.("[data-music-toggle]")) return;
      tryResume();
    }

    function onVisibilityChange() {
      if (document.visibilityState === "visible") tryResume();
    }

    FIRST_INTERACTION_EVENTS.forEach((type) =>
      window.addEventListener(type, onFirstInteraction, { passive: true })
    );
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      FIRST_INTERACTION_EVENTS.forEach((type) =>
        window.removeEventListener(type, onFirstInteraction)
      );
      document.removeEventListener("visibilitychange", onVisibilityChange);
      melodyRef.current?.dispose();
    };
  }, []);

  async function handleToggleClick() {
    if (startingRef.current) return;
    startingRef.current = true;
    try {
      const melody = ensureMelody();

      if (playing && melody.isRunning()) {
        userPausedRef.current = true;
        melody.pause();
        setPlaying(false);
        return;
      }

      userPausedRef.current = false;
      await melody.play();
      setPlaying(true);
    } catch (err) {
      console.error("No se pudo reproducir la música:", err);
    } finally {
      startingRef.current = false;
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
