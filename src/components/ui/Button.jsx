const VARIANT_BG = {
  primary: "bg-yellow",
  secondary: "bg-cream",
  white: "bg-white",
};

const SIZE_CLASSES = {
  nav: "border-4 rounded-full px-5 py-2 text-xl shadow-[0_4px_0_#4A3424]",
  lg: "border-[5px] rounded-full px-7 sm:px-8 py-3 text-2xl sm:text-[28px] shadow-[0_7px_0_#4A3424]",
};

export default function Button({
  href,
  children,
  icon,
  variant = "primary",
  size = "lg",
  breathe = false,
  className = "",
}) {
  return (
    <a
      href={href}
      className={`press ${breathe ? "breathe" : ""} inline-flex items-center gap-3 border-ink font-display font-extrabold leading-none no-underline text-ink ${VARIANT_BG[variant] ?? VARIANT_BG.primary} ${SIZE_CLASSES[size] ?? SIZE_CLASSES.lg} ${className}`}
    >
      {icon}
      {children}
    </a>
  );
}
