const ICONS = {
  berry: (
    <svg aria-hidden="true" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#4A3424" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 7.5 C8 4.5 4.5 7 5 11.5 C5.5 16 9 20 12 21 C15 20 18.5 16 19 11.5 C19.5 7 16 4.5 12 7.5 Z" fill="#E2504C" />
      <path d="M12 7.5 C11 5 9.5 3.5 8 3 M12 7.5 C13.5 5.5 15 4.5 17 4.5" />
    </svg>
  ),
  music: (
    <svg aria-hidden="true" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#4A3424" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18 V5 L20 3 V16" />
      <circle className="twinkle" style={{ animationDelay: "0.93s" }} cx="6.5" cy="18" r="2.6" fill="#4A3424" />
      <circle className="twinkle" style={{ animationDelay: "1.30s" }} cx="17.5" cy="16" r="2.6" fill="#4A3424" />
    </svg>
  ),
  kart: (
    <svg aria-hidden="true" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#4A3424" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 15 L4.5 10.5 C5 9 6 8.5 7.5 8.5 H15 L18 11.5 H20 C20.6 11.5 21 11.9 21 12.5 V15 Z" fill="#FFFFFF" />
      <circle className="twinkle" style={{ animationDelay: "1.67s" }} cx="7" cy="16" r="2.4" fill="#4A3424" />
      <circle className="twinkle" style={{ animationDelay: "2.04s" }} cx="17" cy="16" r="2.4" fill="#4A3424" />
    </svg>
  ),
};

export default function ThingIcon({ name }) {
  return ICONS[name] ?? null;
}
