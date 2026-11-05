import pochiGround from "../../assets/ducks/pochi-ground.svg";
import nubeGround from "../../assets/ducks/nube-ground.svg";
import { POCHI_AIR_SVG, NUBE_AIR_SVG } from "./duckArt";

const GROUND_SRC = {
  pochi: pochiGround,
  nube: nubeGround,
};

const AIR_SVG = {
  pochi: POCHI_AIR_SVG,
  nube: NUBE_AIR_SVG,
};

/**
 * Un patito con dos poses: quieto en el suelo (imagen) y en vuelo con aleteo
 * y parpadeo (SVG animado por CSS). Ambas poses conviven superpuestas y se
 * alternan con las clases `pose-ground`/`pose-air` (ver index.css).
 */
export default function DuckMascot({ variant, className = "relative", groundOnly = false }) {
  if (groundOnly) {
    return (
      <img
        src={GROUND_SRC[variant]}
        alt=""
        className={`block w-full h-full ${className}`}
      />
    );
  }

  return (
    <div className={className}>
      <img src={GROUND_SRC[variant]} alt="" className="pose-ground absolute inset-0 w-full h-full block" />
      <div
        className="pose-air absolute inset-0"
        dangerouslySetInnerHTML={{ __html: AIR_SVG[variant] }}
      />
    </div>
  );
}
