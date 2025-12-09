import { REQUIRED_FIELDS, EMAIL_REGEX } from './constants';

/**
 * Validates if an object has all required fields
 * @param {Object} data - Data object to validate
 * @param {Array<string>} requiredFields - Array of required field names
 * @returns {boolean} - True if all required fields are present
 */
export function hasRequiredFields(data, requiredFields) {
  if (!data || typeof data !== 'object') return false;
  return requiredFields.every(field => {
    const value = data[field];
    return value !== undefined && value !== null && value !== '';
  });
}

/**
 * Validates personal data structure
 * @param {Object} data - Personal data object
 * @returns {Object} - Validated data with defaults for missing optional fields
 */
export function validatePersonalData(data) {
  if (!hasRequiredFields(data, REQUIRED_FIELDS.personal)) {
    console.warn('Personal data missing required fields:', REQUIRED_FIELDS.personal);
    return null;
  }

  // Validate email format
  if (!EMAIL_REGEX.test(data.email)) {
    console.warn('Invalid email format in personal data');
    return null;
  }

  return {
    ...data,
    tagline: data.tagline || '',
    bio: data.bio || '',
    location: data.location || '',
    resume: data.resume || '/Resume.pdf',
    avatar: data.avatar || null
  };
}

/**
 * Validates projects data array
 * @param {Array} data - Projects data array
 * @returns {Array} - Validated projects array
 */
export function validateProjectsData(data) {
  if (!Array.isArray(data)) {
    console.warn('Projects data is not an array');
    return [];
  }

  return data.filter(project => {
    const isValid = hasRequiredFields(project, REQUIRED_FIELDS.projects);
    if (!isValid) {
      console.warn('Project missing required fields:', project.id || 'unknown');
    }
    
    // Validate technologies is an array
    if (!Array.isArray(project.technologies)) {
      console.warn('Project technologies must be an array:', project.id);
      return false;
    }

    return isValid;
  }).map(project => ({
    ...project,
    longDescription: project.longDescription || project.description,
    liveUrl: project.liveUrl || null,
    featured: project.featured || false,
    category: project.category || 'Other'
  }));
}

/**
 * Validates skills data array
 * @param {Array} data - Skills categories data array
 * @returns {Array} - Validated skills array
 */
export function validateSkillsData(data) {
  if (!Array.isArray(data)) {
    console.warn('Skills data is not an array');
    return [];
  }

  return data.filter(category => {
    if (!category.title || !Array.isArray(category.skills)) {
      console.warn('Invalid skill category structure');
      return false;
    }

    // Validate each skill in the category
    category.skills = category.skills.filter(skill => {
      const isValid = hasRequiredFields(skill, REQUIRED_FIELDS.skills);
      if (!isValid) {
        console.warn('Skill missing required fields:', skill.name || 'unknown');
      }
      return isValid;
    });

    return category.skills.length > 0;
  }).map(category => ({
    ...category,
    id: category.id || category.title.toLowerCase().replace(/\s+/g, '-'),
    color: category.color || '#8DB1A4'
  }));
}

/**
 * Validates certifications data array
 * @param {Array} data - Certifications data array
 * @returns {Array} - Validated certifications array
 */
export function validateCertificationsData(data) {
  if (!Array.isArray(data)) {
    console.warn('Certifications data is not an array');
    return [];
  }

  return data.filter(cert => {
    const isValid = hasRequiredFields(cert, REQUIRED_FIELDS.certifications);
    if (!isValid) {
      console.warn('Certification missing required fields:', cert.title || 'unknown');
    }
    return isValid;
  }).map(cert => ({
    ...cert,
    credentialId: cert.credentialId || null,
    credentialUrl: cert.credentialUrl || null
  }));
}

/**
 * Validates experience data array
 * @param {Array} data - Experience data array
 * @returns {Array} - Validated experience array
 */
export function validateExperienceData(data) {
  if (!Array.isArray(data)) {
    console.warn('Experience data is not an array');
    return [];
  }

  return data.filter(exp => {
    const isValid = hasRequiredFields(exp, REQUIRED_FIELDS.experience);
    if (!isValid) {
      console.warn('Experience missing required fields:', exp.company || 'unknown');
    }
    return isValid;
  }).map(exp => ({
    ...exp,
    current: exp.current || false,
    description: exp.description || '',
    achievements: Array.isArray(exp.achievements) ? exp.achievements : [],
    technologies: Array.isArray(exp.technologies) ? exp.technologies : []
  }));
}

/**
 * Validates education data array
 * @param {Array} data - Education data array
 * @returns {Array} - Validated education array
 */
export function validateEducationData(data) {
  if (!Array.isArray(data)) {
    console.warn('Education data is not an array');
    return [];
  }

  return data.filter(edu => {
    const isValid = hasRequiredFields(edu, REQUIRED_FIELDS.education);
    if (!isValid) {
      console.warn('Education missing required fields:', edu.institution || 'unknown');
    }
    return isValid;
  }).map(edu => ({
    ...edu,
    current: edu.current || false,
    gpa: edu.gpa || null,
    achievements: Array.isArray(edu.achievements) ? edu.achievements : []
  }));
}

/**
 * Validates social links data array
 * @param {Array} data - Social links data array
 * @returns {Array} - Validated social links array
 */
export function validateSocialData(data) {
  if (!Array.isArray(data)) {
    console.warn('Social data is not an array');
    return [];
  }

  return data.filter(social => {
    const isValid = hasRequiredFields(social, REQUIRED_FIELDS.social);
    if (!isValid) {
      console.warn('Social link missing required fields:', social.platform || 'unknown');
    }
    return isValid;
  }).map(social => ({
    ...social,
    icon: social.icon || null
  }));
}

/**
 * Validates contact form data
 * @param {Object} formData - Form data object
 * @returns {Object} - Validation result with isValid flag and errors
 */
export function validateContactForm(formData) {
  const errors = {};
  
  // Validate name
  if (!formData.name || formData.name.trim().length === 0) {
    errors.name = 'Name is required';
  } else if (formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  // Validate email
  if (!formData.email || formData.email.trim().length === 0) {
    errors.email = 'Email is required';
  } else if (!EMAIL_REGEX.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Validate message
  if (!formData.message || formData.message.trim().length === 0) {
    errors.message = 'Message is required';
  } else if (formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  // Phone is optional, but validate format if provided
  if (formData.phone && formData.phone.trim().length > 0) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
