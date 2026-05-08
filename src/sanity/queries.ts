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
