export interface ExperiencePageResponse {
  _id: string;
  _type: "experiencePage";

  title?: string;
  subtitle?: string;
  description?: string;
}

export interface ExperienceResponse {
  _id: string;
  _type: "experience";

  startDate?: string;
  endDate?: string;

  role?: string;
  company?: string;
  description?: string;

  points?: string[];
}
