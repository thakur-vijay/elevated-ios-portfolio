export const getHomeQuery = `*[_type == "home"][0]{
  _id,
  _type,
  homeSection,
  philosophySection,
  skillsSection,
  impactSection,
  experienceSection,
  workSection,
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

export const getUserQuery = `*[_type == "user"][0]`;

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

// Home Screen Projects Query
// Fetch lightweight data only

export const getHomeProjectsQuery = `
  *[_type == "project"] | order(_createdAt desc)[0...3] {
    _id,
    appName,
    tagline,
    appType,
    appIcon,
    hero,
    coverImage,
    description,
    techStack,
    screenshots
  }
`;

export const getProjectsQuery = `
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    appName,
    tagline,
    appType,
    appIcon,
    hero,
    coverImage,
    description,
    techStack,
    screenshots
  }
`;

export const getContactPageQuery = `*[_type == "contactPage"][0]`;

export const getProjectPageQuery = `*[_type == "projectPage"][0]`;

export const getProjectDetailQuery = `
  *[_type == "project" && _id == $id][0]
`;
