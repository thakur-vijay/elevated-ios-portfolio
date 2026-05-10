import client from "./sanityClient.ts";
import { createImageUrlBuilder } from "@sanity/image-url";
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
  getProjectPageQuery,
  getProjectDetailQuery,
  getSkillsQuery,
} from "@/sanity/queries.ts";
import { ProjectResponse } from "@/models/project.ts";
import { UserResponse } from "@/models/user.ts";
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
export const fetchUserData = async (): Promise<UserResponse | null> => {
  try {
    console.log("Fetching home data...");
    return await client.fetch<UserResponse | null>(getUserQuery);
  } catch (err) {
    console.error("Error fetching home:", err);
    return null;
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
export const fetchProjectPageData = async () => {
  try {
    console.log("Fetching home data...");
    return await client.fetch(getProjectPageQuery);
  } catch (err) {
    console.error("Error fetching home:", err);
    return [];
  }
};

export const fetchProjectDetailData = async (id: string): Promise<ProjectResponse | null> => {
  try {
    console.log("Fetching project detail...");

    return await client.fetch<ProjectResponse | null>(getProjectDetailQuery, { id });
  } catch (err) {
    console.error("Error fetching project detail:", err);
    return null;
  }
};

export const fetchSkillsData = async () => {
  try {
    console.log("Fetching home data...");
    return await client.fetch(getSkillsQuery);
  } catch (err) {
    console.error("Error fetching home:", err);
    return [];
  }
};


const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export function fileUrl(ref?: string) {
  if (!ref) return "";

  const [, id, extension] = ref.split("-");

  return `https://cdn.sanity.io/files/te8jbj37/production/${id}.${extension}`;
}