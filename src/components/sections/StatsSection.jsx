import Card from "../ui/Card";
import { statsConfig } from "../../config/stats.config";

const BG_CLASSES = {
  cream: "bg-cream",
  pink: "bg-pink",
};

export default function StatsSection() {
  return (
    <section aria-label={statsConfig.ariaLabel} className="bg-green px-6 pb-[72px] flex justify-center">
      <div className="w-full max-w-[1060px] flex flex-wrap gap-6 justify-center">
        {statsConfig.items.map((item) => (
          <Card
            key={item.label}
            bg={BG_CLASSES[item.bg] ?? BG_CLASSES.cream}
            padding="px-6 py-[26px]"
            className="flex-[1_1_260px] text-center"
          >
            <p className="m-0 font-display font-extrabold text-[72px] leading-none">{item.number}</p>
            <p className="mt-1.5 font-extrabold text-xl">{item.label}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
