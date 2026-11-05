export default function Cloud({ className = "", width = 190, height = 80 }) {
  return (
    <svg
      className={`cloud-drift ${className}`}
      aria-hidden="true"
      width={width}
      height={height}
      viewBox="0 0 190 80"
    >
      <path
        d="M30 72 C8 72 4 46 26 42 C26 18 60 12 70 30 C80 6 124 8 128 36 C152 30 172 46 162 64 C160 70 154 72 148 72 Z"
        fill="#FFFFFF"
        stroke="#4A3424"
        strokeWidth="5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
