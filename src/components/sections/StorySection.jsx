import Card from "../ui/Card";
import Badge from "../ui/Badge";
import SectionHeading from "../ui/SectionHeading";
import { storyConfig } from "../../config/story.config";

const CARD_BG = {
  white: "bg-white",
  yellow: "bg-yellow",
};

export default function StorySection() {
  return (
    <section
      aria-labelledby="historia-title"
      className="bg-cream border-t-[6px] border-ink px-6 py-20 flex flex-col items-center"
    >
      <SectionHeading id="historia-title" title={storyConfig.title} subtitle={storyConfig.subtitle} />

      <ol className="list-none m-0 mt-12 p-0 w-full max-w-[1100px] flex flex-wrap gap-7">
        {storyConfig.items.map((item) => (
          <Card
            key={item.date}
            as="li"
            bg={CARD_BG[item.cardBg] ?? CARD_BG.white}
            className="flex-[1_1_290px] flex flex-col gap-2.5"
          >
            <Badge bg={item.badgeBg} className="self-start" padding="px-4 py-1" text="text-[17px]">
              {item.date}
            </Badge>
            <h3 className="mt-1 font-display font-extrabold text-[32px] leading-[1.05]">{item.title}</h3>
            <p className="m-0 text-lg font-semibold leading-[1.5]">{item.text}</p>
          </Card>
        ))}
      </ol>
    </section>
  );
}
