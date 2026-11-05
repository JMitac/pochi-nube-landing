import Card from "../ui/Card";
import HeartIcon from "../ui/HeartIcon";
import TwinkleStars from "../ui/TwinkleStars";
import { letterConfig } from "../../config/letter.config";

export default function LetterSection() {
  return (
    <section
      id={letterConfig.sectionId}
      aria-labelledby="carta-title"
      className="relative bg-navy border-t-[6px] border-ink px-6 py-[90px] flex justify-center"
    >
      <TwinkleStars />

      <Card
        as="article"
        bg="bg-cream"
        rounded="rounded-[40px]"
        shadow="shadow-[0_10px_0_#1C1F40]"
        padding="p-7 sm:p-10 lg:p-14"
        className="relative w-full max-w-[760px]"
      >
        <HeartIcon className="heart-beat absolute -top-[30px] right-10" />
        <h2 id="carta-title" className="m-0 font-display font-extrabold text-[clamp(36px,4.4cqw,52px)] leading-none">
          {letterConfig.heading}
        </h2>
        <div className="mt-[22px] flex flex-col gap-4 text-[clamp(18px,1.8cqw,21px)] font-semibold leading-[1.65]">
          {letterConfig.paragraphs.map((p, i) => (
            <p key={i} className="m-0">
              {p}
            </p>
          ))}
        </div>
        <p className="mt-[30px] font-display font-extrabold text-[30px] leading-[1.1]">
          {letterConfig.signoff}
          <br />
          {letterConfig.signature}
        </p>
      </Card>
    </section>
  );
}
