const BG_CLASSES = {
  cream: "bg-cream",
  sky: "bg-sky",
  pink: "bg-pink",
  yellow: "bg-yellow",
  white: "bg-white",
};

export default function Badge({
  children,
  bg = "cream",
  padding = "px-4 py-1.5",
  text = "text-[17px]",
  tracking = "",
  className = "",
}) {
  return (
    <span
      className={`inline-flex border-4 border-ink rounded-full font-extrabold ${padding} ${text} ${tracking} ${BG_CLASSES[bg] ?? BG_CLASSES.cream} ${className}`}
    >
      {children}
    </span>
  );
}
