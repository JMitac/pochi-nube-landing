import { useState } from "react";
import Badge from "./Badge";
import Button from "./Button";
import HeartIcon from "./HeartIcon";
import { useMusic } from "../../audio/MusicContext";
import { entryGateConfig } from "../../config/entryGate.config";

/**
 * Pantalla de bienvenida que exige un toque explícito antes de mostrar el
 * resto del landing. No es decorativa: un scroll en el celular no siempre
 * cuenta como "gesto del usuario" para los navegadores, así que no se puede
 * confiar en él para desbloquear el audio — un toque directo sobre un botón
 * sí cuenta siempre. Al tocar, arrancamos la música aquí mismo (con un
 * gesto garantizado) y recién entonces se monta el resto de la página.
 */
export default function EntryGate({ onEnter }) {
  const { start } = useMusic();
  const [closing, setClosing] = useState(false);

  function handleEnter() {
    setClosing(true);
    start();
    window.setTimeout(onEnter, 350);
  }

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-sky px-6 transition-opacity duration-300 ${closing ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      <div className="rise-in flex max-w-[420px] w-full flex-col items-center gap-5 rounded-[40px] border-[5px] border-ink bg-cream px-8 py-10 text-center shadow-[0_10px_0_#4A3424]">
        <HeartIcon className="heart-beat" width={56} height={52} />
        <Badge bg="pink" padding="px-[22px] py-1.5" text="text-xl">
          {entryGateConfig.eyebrow}
        </Badge>
        <Button onClick={handleEnter} breathe>
          {entryGateConfig.cta}
        </Button>
        <p className="text-sm font-semibold text-ink/80">{entryGateConfig.hint}</p>
      </div>
    </div>
  );
}
