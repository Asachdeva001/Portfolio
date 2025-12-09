import { FALLBACK_DATA } from './constants';
import {
  validatePersonalData,
  validateProjectsData,
  validateSkillsData,
  validateCertificationsData,
  validateExperienceData,
  validateEducationData,
  validateSocialData
} from './validators';

/**
 * Validator functions mapped by data type
 */
const validators = {
  personal: validatePersonalData,
  projects: validateProjectsData,
  skills: validateSkillsData,
  certifications: validateCertificationsData,
  experience: validateExperienceData,
  education: validateEducationData,
  social: validateSocialData
};

/**
 * Validates data based on its type
 * @param {string} dataType - Type of data to validate
 * @param {any} data - Data to validate
 * @returns {any} - Validated data or fallback
 */
export function validateData(dataType, data) {
  const validator = validators[dataType];
  
  if (!validator) {
    console.warn(`No validator found for data type: ${dataType}`);
    return data;
  }

  try {
    const validatedData = validator(data);
    
    // If validation returns null or empty array, use fallback
    if (validatedData === null || (Array.isArray(validatedData) && validatedData.length === 0 && Array.isArray(data) && data.length > 0)) {
      console.warn(`Validation failed for ${dataType}, using fallback data`);
      return getFallbackData(dataType);
    }
    
    return validatedData;
  } catch (error) {
    console.error(`Error validating ${dataType} data:`, error);
    return getFallbackData(dataType);
  }
}

/**
 * Gets fallback data for a specific data type
 * @param {string} dataType - Type of data
 * @returns {any} - Fallback data
 */
export function getFallbackData(dataType) {
  return FALLBACK_DATA[dataType] || null;
}

/**
 * Loads data from the data directory
 * @param {string} dataType - Type of data to load (personal, projects, skills, etc.)
 * @returns {Promise<any>} - Loaded and validated data
 */
export async function loadData(dataType) {
  try {
    // Dynamic import of data file
    const dataModule = await import(`@/data/${dataType}`);
    const data = dataModule.default || dataModule[dataType] || dataModule;
    
    // Validate the loaded data
    const validatedData = validateData(dataType, data);
    
    return validatedData;
  } catch (error) {
    console.error(`Failed to load ${dataType} data:`, error.message);
    console.warn(`Using fallback data for ${dataType}`);
    return getFallbackData(dataType);
  }
}

/**
 * Loads multiple data types at once
 * @param {Array<string>} dataTypes - Array of data types to load
 * @returns {Promise<Object>} - Object with loaded data keyed by type
 */
export async function loadMultipleData(dataTypes) {
  const results = {};
  
  await Promise.all(
    dataTypes.map(async (dataType) => {
      results[dataType] = await loadData(dataType);
    })
  );
  
  return results;
}

/**
 * Synchronously loads data (for use in components)
 * Note: This should be used with data that's already imported
 * @param {string} dataType - Type of data
 * @param {any} data - Pre-imported data
 * @returns {any} - Validated data
 */
export function loadDataSync(dataType, data) {
  try {
    return validateData(dataType, data);
  } catch (error) {
    console.error(`Error loading ${dataType} data:`, error);
    return getFallbackData(dataType);
  }
}
