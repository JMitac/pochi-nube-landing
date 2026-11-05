export default function Card({
  as: Tag = "div",
  bg = "bg-cream",
  rounded = "rounded-[32px]",
  shadow = "shadow-[0_8px_0_#4A3424]",
  padding = "p-6",
  className = "",
  children,
  ...rest
}) {
  return (
    <Tag
      className={`reveal border-[5px] border-ink ${bg} ${rounded} ${shadow} ${padding} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
