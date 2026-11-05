import DuckMascot from "./DuckMascot";

/**
 * La animación completa de la portada: Pochi y Nube despegan, dibujan un
 * corazón en el aire y vuelven a aterrizar. Ciclo de 5 s controlado por CSS
 * (ver .fly-pochi/.fly-nube, .trail-draw, .love-trail y .love-heart en index.css).
 */
export default function FlyingDuo({ ariaLabel }) {
  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className="relative z-10 w-[min(760px,94%)] aspect-[760/440] -mb-[34px]"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 760 440"
        className="absolute inset-0 w-full h-full overflow-visible"
      >
        <defs>
          <mask id="trail-reveal" maskUnits="userSpaceOnUse" x="-40" y="-40" width="840" height="520">
            <path
              className="trail-draw"
              pathLength="100"
              d="M380 290 C274 255 152 202 160 132 C167 53 304 26 380 88"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="26"
              strokeLinecap="round"
            />
            <path
              className="trail-draw"
              pathLength="100"
              d="M380 290 C486 255 608 202 600 132 C593 53 456 26 380 88"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="26"
              strokeLinecap="round"
            />
          </mask>
        </defs>
        <g className="love-trail" mask="url(#trail-reveal)">
          <path
            d="M380 290 C274 255 152 202 160 132 C167 53 304 26 380 88"
            fill="none"
            stroke="#F08A8A"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="0 18"
          />
          <path
            d="M380 290 C486 255 608 202 600 132 C593 53 456 26 380 88"
            fill="none"
            stroke="#F08A8A"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="0 18"
          />
        </g>
      </svg>

      <svg
        className="love-heart absolute left-1/2 top-[18%] w-1/5 h-auto"
        aria-hidden="true"
        viewBox="0 0 70 64"
      >
        <path
          d="M35 58 C10 40 4 28 4 18 C4 8 12 3 20 3 C27 3 32 7 35 12 C38 7 43 3 50 3 C58 3 66 8 66 18 C66 28 60 40 35 58 Z"
          fill="#F08A8A"
          stroke="#4A3424"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </svg>

      <DuckMascot
        variant="pochi"
        className="fly-pochi absolute left-[28%] top-full w-[26%] aspect-[200/220]"
      />
      <DuckMascot
        variant="nube"
        className="fly-nube absolute left-[72%] top-full w-[26%] aspect-[200/220]"
      />
    </div>
  );
}
