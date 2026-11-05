import { siteConfig } from "../../config/site.config";

export default function Footer() {
  return (
    <footer className="bg-ink text-cream px-6 py-7 text-center font-bold text-[17px]">
      {siteConfig.footerText}
    </footer>
  );
}
