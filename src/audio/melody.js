import * as Tone from "tone";

// Balada de piano original, de 8 compases, en Mi mayor — pensada para sonar
// cálida y soulful (inspirada en el ánimo de una balada de piano romántica),
// sin reproducir la melodía de ninguna canción existente con derechos de autor.

const CHORDS = [
  ["E3", "G#3", "B3", "D#4"], // Emaj7
  ["C#3", "E3", "G#3", "B3"], // C#m7
  ["A2", "C#3", "E3", "F#3"], // A6
  ["B2", "E3", "F#3", "A3"], // B7sus4
  ["E3", "G#3", "B3", "D#4"], // Emaj7
  ["A2", "C#3", "E3", "G#3"], // Amaj7
  ["F#2", "A2", "C#3", "E3"], // F#m7
  ["B2", "D#3", "F#3", "A3"], // B7
];

// Grilla de negras (4 por compás x 8 compases = 32 pasos). `null` = silencio;
// las notas se dejan sonar más largo que el paso para ligarlas entre sí.
const MELODY = [
  "G#4", "F#4", "E4", null,
  "B4", null, "A4", "G#4",
  "F#4", "E4", "C#4", null,
  "B3", "D#4", "F#4", null,
  "G#4", "A4", "G#4", "F#4",
  "E4", null, "C#5", "B4",
  "A4", "G#4", "F#4", null,
  "E4", null, null, null,
];

/**
 * Crea la melodía (acordes de piano + línea melódica) sintetizada con Tone.js.
 * No reproduce nada hasta llamar a `play()` (requiere un gesto del usuario).
 */
export function createMelody() {
  const volume = new Tone.Volume(-Infinity).toDestination();
  // Freeverb es un reverb algorítmico (filtros comb/allpass) en vez de uno
  // por convolución: no depende de renderizar un OfflineAudioContext al
  // crearse, que es un punto conocido de fallas/incompatibilidad en Safari/iOS.
  const reverb = new Tone.Freeverb({ roomSize: 0.8, dampening: 3000, wet: 0.35 }).connect(volume);
  const chorus = new Tone.Chorus({ frequency: 0.6, delayTime: 3.5, depth: 0.4, wet: 0.25 })
    .connect(reverb)
    .start();

  const piano = new Tone.PolySynth(Tone.FMSynth, {
    harmonicity: 1.5,
    modulationIndex: 3,
    oscillator: { type: "sine" },
    modulation: { type: "triangle" },
    envelope: { attack: 0.02, decay: 0.6, sustain: 0.5, release: 2.5 },
    modulationEnvelope: { attack: 0.02, decay: 0.3, sustain: 0.2, release: 1.5 },
  }).connect(chorus);
  piano.volume.value = -6;

  const lead = new Tone.FMSynth({
    harmonicity: 2,
    modulationIndex: 2,
    oscillator: { type: "sine" },
    modulation: { type: "sine" },
    envelope: { attack: 0.015, decay: 0.3, sustain: 0.4, release: 1.4 },
  }).connect(reverb);
  lead.volume.value = -3;

  Tone.getTransport().bpm.value = 72;
  Tone.getTransport().timeSignature = [4, 4];

  const chordSeq = new Tone.Sequence(
    (time, chord) => {
      piano.triggerAttackRelease(chord, "1m", time, 0.32);
    },
    CHORDS,
    "1m"
  ).start(0);

  const melodySeq = new Tone.Sequence(
    (time, note) => {
      if (note) lead.triggerAttackRelease(note, "2n", time, 0.55);
    },
    MELODY,
    "4n"
  ).start(0);

  let disposed = false;

  return {
    async play() {
      // Idempotente: si ya está sonando (p. ej. el sistema operativo suspendió
      // y reanudó el audio al volver de segundo plano) no reinicia el compás,
      // solo nos aseguramos de que el volumen esté audible.
      await Tone.start();
      const now = Tone.now();
      volume.volume.cancelScheduledValues(now);
      volume.volume.setValueAtTime(volume.volume.value, now);
      volume.volume.linearRampToValueAtTime(-8, now + 0.8);
      if (Tone.getTransport().state !== "started") {
        Tone.getTransport().start();
      }
    },
    pause() {
      const now = Tone.now();
      volume.volume.cancelScheduledValues(now);
      volume.volume.setValueAtTime(volume.volume.value, now);
      volume.volume.linearRampToValueAtTime(-Infinity, now + 0.4);
      window.setTimeout(() => Tone.getTransport().pause(), 420);
    },
    // El sistema operativo (sobre todo en celulares) puede suspender el
    // audio al bloquear la pantalla o cambiar de app sin avisarle a React;
    // esto deja que quien use el módulo verifique/reaccione a eso.
    isRunning() {
      return Tone.getContext().state === "running" && Tone.getTransport().state === "started";
    },
    isClosed() {
      return Tone.getContext().state === "closed";
    },
    onContextStateChange(callback) {
      const context = Tone.getContext();
      context.on("statechange", callback);
      return () => context.off("statechange", callback);
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      chordSeq.dispose();
      melodySeq.dispose();
      piano.dispose();
      lead.dispose();
      chorus.dispose();
      reverb.dispose();
      volume.dispose();
      Tone.getTransport().stop();
      Tone.getTransport().cancel();
    },
  };
}
