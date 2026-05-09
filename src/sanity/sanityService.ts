import client from "./sanityClient.ts";
import imageUrlBuilder from "@sanity/image-url";
import {
  getUserQuery,
  getFooterQuery,
  getHomeQuery,
  getAboutQuery,
  getExperiencePageQuery,
  getExperienceQuery,
  getHomeExperienceQuery,
  getHomeProjectsQuery,
  getProjectsQuery,
  getContactPageQuery,
} from "@/sanity/queries.ts";
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

export const fetchExperiencePageData = async () => {
  try {
    console.log("Fetching home data...");
    return await client.fetch(getExperiencePageQuery);
  } catch (err) {
    console.error("Error fetching home:", err);
    return [];
  }
};

export const fetchExperienceData = async () => {
  try {
    console.log("Fetching home data...");
    return await client.fetch(getExperienceQuery);
  } catch (err) {
    console.error("Error fetching home:", err);
    return [];
  }
};

export const fetchHomeExperienceData = async () => {
  try {
    console.log("Fetching home data...");
    return await client.fetch(getHomeExperienceQuery);
  } catch (err) {
    console.error("Error fetching home:", err);
    return [];
  }
};

export const fetchHomeProjectData = async () => {
  try {
    console.log("Fetching home data...");
    return await client.fetch(getHomeProjectsQuery);
  } catch (err) {
    console.error("Error fetching home:", err);
    return [];
  }
};

export const fetchProjectData = async () => {
  try {
    console.log("Fetching home data...");
    return await client.fetch(getProjectsQuery);
  } catch (err) {
    console.error("Error fetching home:", err);
    return [];
  }
};

export const fetchContactPageData = async () => {
  try {
    console.log("Fetching home data...");
    return await client.fetch(getContactPageQuery);
  } catch (err) {
    console.error("Error fetching home:", err);
    return [];
  }
};

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
