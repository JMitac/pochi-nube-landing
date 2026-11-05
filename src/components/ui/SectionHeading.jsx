export default function SectionHeading({ id, title, subtitle }) {
  return (
    <>
      <h2
        id={id}
        className="m-0 text-center font-display font-extrabold leading-none text-[clamp(40px,5cqw,60px)]"
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-center font-bold text-xl">{subtitle}</p>
      ) : null}
    </>
  );
}
