// ─── Shared TypeScript interfaces ──────────────────────────────────────────

export interface ProjectService {
  icon: string;
  title: string;
  title_ar?: string;
  desc: string;
  desc_ar?: string;
}

export interface ProjectResults {
  reach: string;       reachLabel: string;       reachLabel_ar?: string;
  impressions: string; impressionsLabel: string;  impressionsLabel_ar?: string;
  engagement: string;  engagementLabel: string;   engagementLabel_ar?: string;
  followers: string;   followersLabel: string;    followersLabel_ar?: string;
  clicks: string;      clicksLabel: string;       clicksLabel_ar?: string;
  ctr: string;         ctrLabel: string;          ctrLabel_ar?: string;
  roas: string;        roasLabel: string;         roasLabel_ar?: string;
  campaigns: string;   campaignsLabel: string;    campaignsLabel_ar?: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  alt_ar?: string;
  category: string;
  category_ar?: string;
}

export interface BeforeAfterItem {
  metric: string;
  metric_ar?: string;
  before: string;
  after: string;
  improvement: string;
}

export interface Achievement {
  icon: string;
  title: string;
  title_ar?: string;
  desc: string;
  desc_ar?: string;
}

export interface TimelinePhase {
  phase: string;
  phase_ar?: string;
  desc: string;
  desc_ar?: string;
  duration?: string;
}

export interface ProjectTestimonial {
  name: string;
  role: string;
  role_ar?: string;
  quote: string;
  quote_ar?: string;
  avatar?: string;
}

/** Slim shape used by ProjectRelated — resolved from slugs in the page */
export interface RelatedProject {
  slug: string;
  title: string;       title_ar?: string;
  subtitle: string;    subtitle_ar?: string;
  industry: string;    industry_ar?: string;
  color: string;
  tags: string[];      tags_ar?: string[];
  results: {
    reach: string;
    roas: string;
  };
}

export interface Project {
  id: string;
  slug: string;

  // Core — required everywhere
  title: string;
  color: string;
  year: string;
  tags: string[];
  overview: string;
  relatedProjects: string[];

  // Bilingual optional variants
  title_ar?: string;
  tags_ar?: string[];
  overview_ar?: string;

  // Hero fields — required in ProjectHero, present in all real projects
  subtitle: string;
  subtitle_ar?: string;
  industry: string;
  industry_ar?: string;
  duration: string;
  duration_ar?: string;

  // Images
  coverImage?: string;
  heroImage?: string;
  logo?: string;

  // Sections — optional so components can guard with early return
  challenge?: string;
  challenge_ar?: string;
  challengePoints?: string[];
  challengePoints_ar?: string[];
  objectives?: string[];
  objectives_ar?: string[];
  strategy?: string;
  strategy_ar?: string;
  strategyPoints?: string[];
  strategyPoints_ar?: string[];
  services?: ProjectService[];
  results?: ProjectResults;
  beforeAfter?: BeforeAfterItem[];
  achievements?: Achievement[];
  gallery?: GalleryImage[];
  testimonial?: ProjectTestimonial;
  timeline?: TimelinePhase[];
  tools?: string[];
}
