// lib/validation.js

/**
 * Validation utility for form fields
 * @returns {Object} Validation methods
 */
export const validation = {
  /**
   * Validates email format
   * @param {string} email - Email to validate
   * @returns {boolean} Whether email is valid
   */
  isValidEmail: (email) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(String(email).toLowerCase());
  },

  /**
   * Validates and formats US phone numbers
   * @param {string} phone - Phone number to validate
   * @returns {Object} Valid status and formatted number
   */
  formatPhoneNumber: (phone) => {
    // Strip non-digits
    const digitsOnly = phone.replace(/\D/g, '');

    // Check length (10 digits for US numbers)
    const isValid = digitsOnly.length === 10;

    // Format as (xxx) xxx-xxxx if valid
    let formatted = phone;
    if (isValid) {
      formatted = `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`;
    }

    return { isValid, formatted };
  }
};