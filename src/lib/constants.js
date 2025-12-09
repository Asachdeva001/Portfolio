// Application constants

export const DATA_TYPES = {
  PERSONAL: 'personal',
  PROJECTS: 'projects',
  SKILLS: 'skills',
  CERTIFICATIONS: 'certifications',
  EXPERIENCE: 'experience',
  EDUCATION: 'education',
  SOCIAL: 'social',
  THEME: 'theme'
};

export const REQUIRED_FIELDS = {
  personal: ['name', 'title', 'email'],
  projects: ['id', 'title', 'description', 'image', 'technologies'],
  skills: ['name', 'icon', 'description'],
  certifications: ['title', 'issuer', 'date', 'image'],
  experience: ['company', 'position', 'startDate', 'endDate'],
  education: ['institution', 'degree', 'field', 'startDate', 'endDate'],
  social: ['platform', 'url']
};

export const FALLBACK_DATA = {
  personal: {
    name: 'Portfolio Owner',
    title: 'Developer',
    tagline: 'Building amazing digital experiences',
    bio: 'Passionate developer with expertise in modern web technologies.',
    location: 'Location',
    email: 'contact@example.com',
    resume: '/Resume.pdf'
  },
  projects: [],
  skills: [],
  certifications: [],
  experience: [],
  education: [],
  social: []
};

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  },
  slideIn: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6 }
  },
  staggerContainer: {
    visible: { transition: { staggerChildren: 0.12 } },
    hidden: {}
  }
};
