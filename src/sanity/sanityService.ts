import client from "./sanityClient.ts";
import { getUserQuery, getFooterQuery, getHomeQuery, getAboutQuery } from "@/sanity/queries.ts";
export const fetchHomeData = async () => {
  try {
    console.log("Fetching home data...");
    return await client.fetch(getHomeQuery);
  } catch (err) {
    console.error("Error fetching home:", err);
    return [];
  }
};

export const fetchFooterData = async () => {
  try {
    console.log("Fetching home data...");
    return await client.fetch(getFooterQuery);
  } catch (err) {
    console.error("Error fetching home:", err);
    return [];
  }
};
export const fetchUserData = async () => {
  try {
    console.log("Fetching home data...");
    return await client.fetch(getUserQuery);
  } catch (err) {
    console.error("Error fetching home:", err);
    return [];
  }
};
export const fetchAboutData = async () => {
  try {
    console.log("Fetching home data...");
    return await client.fetch(getAboutQuery);
  } catch (err) {
    console.error("Error fetching home:", err);
    return [];
  }
};
