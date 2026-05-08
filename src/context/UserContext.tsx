// UserContext.tsx
import { createContext, useContext } from "react";
import type { UserResponse } from "../models/user.ts";

export const UserContext = createContext<UserResponse | null>(null);

export function useUser() {
  return useContext(UserContext);
}
