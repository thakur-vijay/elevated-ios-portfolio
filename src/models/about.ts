export type PortableTextBlock = {
  _key: string;
  _type: "block";
  children?: {
    _key: string;
    _type: "span";
    text: string;
    marks?: string[];
  }[];
  markDefs?: {
    _key: string;
    _type: "link";
    href: string;
  }[];
  style?: "normal" | "h2" | "blockquote";
  listItem?: "bullet" | "number";
  level?: number;
};

export type AboutSection = {
  title?: string;
  subtitle?: string;
  about?: PortableTextBlock[];
};

export type Principle = {
  _key?: string;
  title?: string;
  description?: string;
};

export type PrincipleSection = {
  title?: string;
  subtitle?: string;
  principles?: Principle[];
};

export type BeyondCodeSection = {
  subtitle?: string;
  title?: string;
  description?: string;
};

export type AboutResponse = {
  _id?: string;
  _type?: "about";
  _createdAt?: string;
  _updatedAt?: string;
  aboutSection?: AboutSection;
  principleSection?: PrincipleSection;
  beyondCodeSection?: BeyondCodeSection;
  collaborationMessage?: string;
};
