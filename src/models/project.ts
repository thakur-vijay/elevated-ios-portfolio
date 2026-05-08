export interface SanityImage {
  _type: "image";
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
  appIcon?: SanityImage;
  coverImage?: SanityImage;
  description?: string;
  techStack?: string[];
  screenshots?: SanityImage[];
}
