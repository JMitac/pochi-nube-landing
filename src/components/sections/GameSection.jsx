import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import DuckMascot from "../ducks/DuckMascot";
import { gameConfig } from "../../config/game.config";
import { siteConfig } from "../../config/site.config";

const PlayIcon = (
  <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24">
    <path d="M7 4.5 L19 12 L7 19.5 Z" fill="#4A3424" stroke="#4A3424" strokeWidth="2.4" strokeLinejoin="round" />
  </svg>
);

export default function GameSection() {
  return (
    <section className="bg-green border-t-[6px] border-ink px-6 pt-20 pb-24 flex justify-center">
      <Card
        rounded="rounded-[44px]"
        shadow="shadow-[0_10px_0_#4A3424]"
        padding="p-7 sm:p-10 lg:p-13"
        className="w-full max-w-[1100px] flex flex-wrap gap-9 items-center"
      >
        <div className="flex-[1_1_300px] flex justify-center items-end gap-1 bg-sky border-[5px] border-ink rounded-[32px] px-5 pt-[34px] pb-6">
          <DuckMascot variant="pochi" groundOnly className="duck-bob w-[44%] max-w-[170px] h-auto" />
          <DuckMascot variant="nube" groundOnly className="duck-bob-late w-[44%] max-w-[170px] h-auto" />
        </div>

        <div className="flex-[999_1_380px] min-w-0 flex flex-col gap-4">
          <Badge bg="pink" className="self-start" padding="px-4 py-1" text="text-[17px]">
            {gameConfig.badge}
          </Badge>
          <h2 className="m-0 font-display font-extrabold text-[clamp(40px,5cqw,60px)] leading-none">
            {gameConfig.title}
          </h2>
          <p className="m-0 text-xl font-semibold leading-[1.55]">{gameConfig.text}</p>
          <div className="flex flex-wrap gap-3.5 items-center mt-1.5">
            <Button href={siteConfig.gameUrl} breathe icon={PlayIcon}>
              {gameConfig.cta}
            </Button>
            <span className="text-base font-bold">{gameConfig.mobileHint}</span>
          </div>
        </div>
      </Card>
    </section>
  );
}
