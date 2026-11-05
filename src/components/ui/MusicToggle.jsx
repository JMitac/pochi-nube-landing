import { useMusic } from "../../audio/MusicContext";

export default function MusicToggle({ label = "Nuestra canción" }) {
  const { playing, toggle } = useMusic();

  return (
    <button
      type="button"
      onClick={toggle}
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
