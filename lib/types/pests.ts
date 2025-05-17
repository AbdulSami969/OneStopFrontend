export interface PestSlug {
  current: string;
}

export interface PestHeroSection {
  heroImage: any;
  headline: string;
  description: string;
}

export interface PestIdentificationSection {
  description: string;
  closeupImage?: any;
  infestationSigns?: string;
  commonSpecies?: string;
  ourSolution?: string;
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface ProcessSection {
  title: string;
  steps: ProcessStep[];
}

export interface CTAButton {
  text: string;
  path: string;
}

export interface CTASection {
  title: string;
  description: string;
  button: CTAButton;
}

export interface Benefit {
  icon: string | React.ReactNode;
  title: string;
  description: string;
}

export interface StatCallout {
  icon: string;
  statNumber: string;
  statDescription: string;
}

export interface BenefitsSection {
  title: string;
  description: string;
  benefits: Benefit[];
  ctaButton?: CTAButton;
  featuredImage?: any;
  statCallout?: StatCallout;
  imageBadge?: string;
}

export interface HealthRisksSection {
  title: string;
  risks: string[];
}

export interface PreventionSection {
  title: string;
  tips: string[];
}

export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  openGraphImage?: any;
}

export interface Pest {
  _id: string;
  name: string;
  slug: PestSlug;
  icon: any;
  heroSection: PestHeroSection;
  identificationSection: PestIdentificationSection;
  benefitsSection?: BenefitsSection;
  processSection?: ProcessSection;
  ctaSection?: CTASection;
  healthRisksSection?: HealthRisksSection;
  preventionSection?: PreventionSection;
  seo?: SEO;
}
