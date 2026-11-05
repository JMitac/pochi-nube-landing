export default function HeartIcon({ className = "", width = 56, height = 52 }) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      width={width}
      height={height}
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
  );
}
