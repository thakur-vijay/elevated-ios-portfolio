import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./features/homeSlice";
import footerReducer from "./features/footerSlice";
import userReducer from "./features/userSlice";
import aboutReducer from "./features/aboutSlice";
import experienceReducer from "./features/experienceSlice";
import experiencePageReducer from "./features/experiencePageSlice";
import homeExperienceReducer from "./features/homeExperienceSlice";
import projectReducer from "./features/projectSlice";
import homeProjectReducer from "./features/homeProjectSlice";
import contactPageReducer from "./features/contactPageSlice";
import projectPageReducer from "./features/projectPageSlice";
export const store = configureStore({
  reducer: {
    home: homeReducer,
    footer: footerReducer,
    user: userReducer,
    about: aboutReducer,
    experiencePage: experiencePageReducer,
    experience: experienceReducer,
    homeExperience: homeExperienceReducer,
    project: projectReducer,
    homeProject: homeProjectReducer,
    contactPage: contactPageReducer,
    projectPage: projectPageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
