export type SocialLinks = {
  github: string;
  linkedin: string;
  mail: string;
  twitter?: string;
};

export type UserResponse = {
  _id: string;
  _type: "user";
  name: string;
  role: string;
  tagline: string;
  location: string;
  socialLinks: SocialLinks;
};
