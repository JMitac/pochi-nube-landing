const STARS = [
  { cx: "8%", cy: "14%", r: 3, delay: "0.37s" },
  { cx: "22%", cy: "70%", r: 2.5, delay: "0.74s" },
  { cx: "35%", cy: "8%", r: 2, delay: "1.11s" },
  { cx: "64%", cy: "12%", r: 3, delay: "1.48s" },
  { cx: "82%", cy: "30%", r: 2.5, delay: "1.85s" },
  { cx: "92%", cy: "78%", r: 3, delay: "2.22s" },
  { cx: "74%", cy: "90%", r: 2, delay: "0.19s" },
  { cx: "12%", cy: "88%", r: 2, delay: "0.56s" },
];

export default function TwinkleStars() {
  return (
    <svg aria-hidden="true" width="100%" height="100%" className="absolute inset-0">
      {STARS.map((star, i) => (
        <circle
          key={i}
          className="twinkle"
          style={{ animationDelay: star.delay }}
          cx={star.cx}
          cy={star.cy}
          r={star.r}
          fill="#FFF8EC"
        />
      ))}
    </svg>
  );
}
