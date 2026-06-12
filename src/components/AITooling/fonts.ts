import { loadFont as loadSans } from "@remotion/google-fonts/HostGrotesk";
import { loadFont as loadSerif } from "@remotion/google-fonts/InstrumentSerif";
import { loadFont as loadMono } from "@remotion/google-fonts/GeistMono";

export const { fontFamily: sansFontFamily } = loadSans("normal", {
  weights: ["400", "800"],
  subsets: ["latin"],
});

export const { fontFamily: serifFontFamily } = loadSerif("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

loadSerif("italic", { weights: ["400"], subsets: ["latin"] });

export const { fontFamily: monoFontFamily } = loadMono("normal", {
  weights: ["400", "600"],
  subsets: ["latin"],
});
