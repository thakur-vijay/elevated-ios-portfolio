export type HomeResponse = {
  _id: string;
  _type: "home";
  homeSection?: HomeSection;
  philosophySection?: PhilosophySection;
  skillsSection?: SkillsSection;
  impactSection?: ImpactSection;
  experienceSection?: ExperienceSection;
  workSection?: WorkSection;
  ctaSection?: CTASection;
};

export type HomeSection = {
  professionTitle?: string;
  professionLocation?: string;
  title1?: string;
  title2?: string;
  subtitle?: string;
};

export type PhilosophySection = {
  title?: string;
  subtitle?: string;
  roleTags?: string[];
};

export type SkillsSection = {
  title?: string;
  subTitle?: string;
  description?: string;
};

export type ImpactSection = {
  title?: string;
  subTitle?: string;
  stats?: ImpactStat[];
};

export type ExperienceSection = {
  title?: string;
  subTitle?: string;
};

export type WorkSection = {
  title?: string;
  subTitle?: string;
  description?: string;
};

export type ImpactStat = {
  value?: string;
  label?: string;
};

export type CTASection = {
  eyebrow?: string;
  title?: string;
  description?: string;
};
