import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { createMelody } from "./melody";

const MusicContext = createContext(null);

/**
 * Dueño único de la melodía: la crea y la controla, y comparte el estado
 * entre quien la arranca (el gate de entrada, con un toque garantizado) y
 * el botón flotante (que solo pausa/reanuda después).
 */
export function MusicProvider({ children }) {
  const [playing, setPlaying] = useState(false);
  const melodyRef = useRef(null);
  const startingRef = useRef(false);
  const userPausedRef = useRef(false);

  const ensureMelody = useCallback(() => {
    if (!melodyRef.current) {
      const melody = createMelody();
      melody.onContextStateChange((state) => {
        if (state !== "running") setPlaying(false);
      });
      melodyRef.current = melody;
    }
    return melodyRef.current;
  }, []);

  const start = useCallback(async () => {
    if (startingRef.current) return;
    if (melodyRef.current?.isRunning()) return;
    startingRef.current = true;
    try {
      const melody = ensureMelody();
      userPausedRef.current = false;
      await melody.play();
      setPlaying(true);
    } catch (err) {
      console.error("No se pudo iniciar la música:", err);
    } finally {
      startingRef.current = false;
    }
  }, [ensureMelody]);

  const toggle = useCallback(async () => {
    if (startingRef.current) return;
    const melody = ensureMelody();
    if (playing && melody.isRunning()) {
      userPausedRef.current = true;
      melody.pause();
      setPlaying(false);
      return;
    }
    await start();
  }, [ensureMelody, playing, start]);

  useEffect(() => {
    // El sistema operativo (sobre todo en celulares) puede suspender el
    // audio al bloquear la pantalla o cambiar de app sin avisarle a React;
    // al volver a la pestaña, reanudamos salvo que la persona lo haya
    // pausado ella misma.
    function onVisibilityChange() {
      if (document.visibilityState === "visible" && !userPausedRef.current) start();
    }
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      melodyRef.current?.dispose();
    };
  }, [start]);

  return <MusicContext.Provider value={{ playing, start, toggle }}>{children}</MusicContext.Provider>;
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic debe usarse dentro de <MusicProvider>");
  return ctx;
}
