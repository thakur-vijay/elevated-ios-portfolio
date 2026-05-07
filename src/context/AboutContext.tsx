// AboutContext.tsx
import { createContext, useContext } from "react";
import type { AboutResponse } from "../models/about.ts";

export const AboutContext = createContext<AboutResponse | null>(null);

export function useAbout() {
  return useContext(AboutContext);
}
