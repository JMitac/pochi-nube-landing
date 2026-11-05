import Cloud from "../ui/Cloud";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import FlyingDuo from "../ducks/FlyingDuo";
import { heroConfig } from "../../config/hero.config";
import { siteConfig } from "../../config/site.config";

const PlayIcon = (
  <svg aria-hidden="true" width="26" height="26" viewBox="0 0 24 24">
    <path d="M7 4.5 L19 12 L7 19.5 Z" fill="#4A3424" stroke="#4A3424" strokeWidth="2.4" strokeLinejoin="round" />
  </svg>
);

export default function Hero() {
  return (
    <header className="relative flex flex-col items-center px-6 pt-7">
      <Cloud className="absolute left-[6%] top-[110px]" width={190} height={80} />
      <Cloud className="absolute right-[8%] top-[220px]" width={150} height={64} />

      <nav className="relative w-full max-w-[1180px] flex flex-wrap gap-3 justify-between items-center">
        <Badge bg="cream" padding="px-[18px] py-1.5" text="text-lg" tracking="tracking-[2px]">
          {siteConfig.dateBadge}
        </Badge>
        <Button href={siteConfig.gameUrl} size="nav" variant="white">
          {siteConfig.navCta}
        </Button>
      </nav>

      <p className="rise-in relative mt-12 border-4 border-ink bg-pink rounded-full px-[22px] py-1.5 font-extrabold text-xl">
        {heroConfig.eyebrow}
      </p>

      <h1 className="title-pop relative m-0 mt-[18px] text-center font-display font-extrabold leading-[0.95] text-[clamp(64px,11cqw,136px)] text-cream [-webkit-text-stroke:9px_#4A3424] [paint-order:stroke_fill] [text-shadow:0_8px_0_#4A3424]">
        {heroConfig.titlePrefix}
        <span className="text-coral">{heroConfig.titleNumber}</span>
        {heroConfig.titleSuffix}
      </h1>

      <p
        className="rise-in relative mt-[22px] max-w-[620px] text-center text-[clamp(19px,2cqw,23px)] font-bold leading-[1.45]"
        style={{ animationDelay: ".45s" }}
      >
        {heroConfig.subtitle}
      </p>

      <div
        className="rise-in relative mt-[30px] flex flex-wrap gap-4 justify-center"
        style={{ animationDelay: ".6s" }}
      >
        <Button href={siteConfig.gameUrl} breathe icon={PlayIcon}>
          {heroConfig.primaryCta}
        </Button>
        <Button href={heroConfig.secondaryCtaHref} variant="secondary">
          {heroConfig.secondaryCta}
        </Button>
      </div>

      <div className="mt-6 relative w-full flex flex-col items-center">
        <FlyingDuo ariaLabel={heroConfig.duoAriaLabel} />
        <div
          aria-hidden="true"
          className="w-[140%] h-[150px] bg-green border-t-[6px] border-ink"
          style={{ borderRadius: "50% 50% 0 0 / 100% 100% 0 0" }}
        />
      </div>
    </header>
  );
}
