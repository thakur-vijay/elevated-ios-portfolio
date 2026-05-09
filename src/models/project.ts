import { string } from "zod";

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export interface SanityFile {
  _type: "file";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export interface ProjectResponse {
  _id: string;
  _type: "project";
  appName: string;
  tagline?: string;
  appType?: string;
  appStoreUrl?: string;
  appIcon?: SanityImage;
  appClip?: SanityFile;
  hero?: SanityFile;
  coverImage?: SanityImage;
  description?: string;
  role?: string;
  architecture?: string;
  techStack?: string[];
  screenshots?: SanityImage[];
  stats?: ProjectStat[];
  features?: ContentBlock[];
  challenges?: ContentBlock[];
  performance?: ContentBlock[];
  timeline?: ProjectTimeline[];
  gallerySection?: SectionBlock;
  featureSection?: SectionBlock;
  challengeSection?: SectionBlock;
  performanceSection?: SectionBlock;
  timelineSection?: SectionBlock;
}

export type ProjectStat = {
  label?: string;
  value?: string;
};

export type ContentBlock = {
  title?: string;
  description?: string;
};

export type ProjectTimeline = {
  phase?: string;
  description?: string;
};

export type SectionBlock = {
  title?: string;
  subtitle?: string;
}