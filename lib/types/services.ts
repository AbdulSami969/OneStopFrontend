export interface ServiceSlug {
  current: string;
}

export interface ServiceHeroSection {
  heroImage: any;
  headline: string;
  description: string;
}

export interface Service {
  _id: string;
  title: string;
  slug: ServiceSlug;
  featured: boolean;
  heroSection: ServiceHeroSection;
  benefitsSection?: any;
  processSection?: any;
  ctaSection?: any;
  seo?: any;
}
