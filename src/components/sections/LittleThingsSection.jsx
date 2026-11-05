import Card from "../ui/Card";
import SectionHeading from "../ui/SectionHeading";
import ThingIcon from "../ui/ThingIcon";
import { littleThingsConfig } from "../../config/littleThings.config";

const ICON_BG = {
  pink: "bg-pink",
  yellow: "bg-yellow",
  green: "bg-green",
};

export default function LittleThingsSection() {
  return (
    <section
      aria-labelledby="cosas-title"
      className="bg-sky border-t-[6px] border-ink px-6 py-20 flex flex-col items-center"
    >
      <SectionHeading id="cosas-title" title={littleThingsConfig.title} subtitle={littleThingsConfig.subtitle} />

      <ul className="list-none m-0 mt-12 p-0 w-full max-w-[1100px] flex flex-wrap gap-7">
        {littleThingsConfig.items.map((item) => (
          <Card key={item.title} as="li" bg="bg-cream" className="flex-[1_1_290px] flex flex-col gap-3">
            <span
              className={`w-[68px] h-[68px] border-4 border-ink rounded-full flex items-center justify-center ${ICON_BG[item.iconBg] ?? ICON_BG.pink}`}
            >
              <ThingIcon name={item.icon} />
            </span>
            <h3 className="m-0 font-display font-extrabold text-[30px] leading-[1.05]">{item.title}</h3>
            <p className="m-0 text-lg font-semibold leading-[1.5]">{item.text}</p>
          </Card>
        ))}
      </ul>
    </section>
  );
}
