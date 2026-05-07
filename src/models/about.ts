export type SocialLinks = {
  github: string;
  linkedin: string;
  mail: string;
  twitter?: string;
};

export type AboutResponse = {
  _id: string;
  _type: "about";
  name: string;
  socialLinks: SocialLinks;
};
