import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./features/homeSlice";
import footerReducer from "./features/footerSlice";
import aboutReducer from "./features/aboutSlice";
export const store = configureStore({
  reducer: {
    home: homeReducer,
    footer: footerReducer,
    about: aboutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
