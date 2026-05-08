export const getHomeQuery = `*[_type == "home"][0]{
  _id,
  _type,
  homeSection,
  philosophySection,
  skillsSection,
  impactSection,
  ctaSection
}`;

export const getFooterQuery = `*[_type == "footer"][0]{
  _id,
  _type,
  copyrightMessage,
  rightSideMessage,
  socialLinks{
    github,
    linkedin,
    twitter,
    mail
  }
}`;

export const getUserQuery = `*[_type == "user"][0]{
  _id,
  _type,
  name,
  socialLinks{
    github,
    linkedin,
    twitter,
    mail
  }
}`;

export const getAboutQuery = `*[_type == "about"][0]{
  _id,
  _type,
  aboutSection,
  principleSection,
  beyondCodeSection,
  collaborationMessage
}`;

export const getExperiencePageQuery = `*[_type == "experiencePage"][0]`;

export const getExperienceQuery = `*[_type == "experience"] | order(startDate desc)`;

export const getHomeExperienceQuery = `
  *[_type == "experience"]
  | order(startDate desc)[0...2]{
    role,
    company,
    startDate,
    endDate
  }
`;
