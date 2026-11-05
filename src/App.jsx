import { useState } from "react";
import Hero from "./components/sections/Hero";
import StatsSection from "./components/sections/StatsSection";
import StorySection from "./components/sections/StorySection";
import LetterSection from "./components/sections/LetterSection";
import LittleThingsSection from "./components/sections/LittleThingsSection";
import GameSection from "./components/sections/GameSection";
import Footer from "./components/sections/Footer";
import MusicToggle from "./components/ui/MusicToggle";
import EntryGate from "./components/ui/EntryGate";
import { MusicProvider } from "./audio/MusicContext";

function App() {
  const [entered, setEntered] = useState(false);

  return (
    <MusicProvider>
      {!entered && <EntryGate onEnter={() => setEntered(true)} />}
      {entered && (
        <div className="w-full bg-sky font-body text-ink overflow-hidden [container-type:inline-size]">
          <Hero />
          <StatsSection />
          <StorySection />
          <LetterSection />
          <LittleThingsSection />
          <GameSection />
          <Footer />
          <MusicToggle />
        </div>
      )}
    </MusicProvider>
  );
}

export default App;
