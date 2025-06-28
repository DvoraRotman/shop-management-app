/**
 * Simple and efficient validations
 */

// Basic helper functions
function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidString(str, minLength = 1) {
  return str && typeof str === 'string' && str.trim().length >= minLength;
}

function isPositiveNumber(num) {
  return typeof num === 'number' && num > 0;
}

// Validation schemas
const SCHEMAS = {
  order: {
    fullName: { required: true, type: 'string', min: 2 },
    email: { required: true, type: 'string', email: true },
    address: { required: true, type: 'string', min: 5 },
    items: { required: true, type: 'array', min: 1 },
    totalAmount: { required: true, type: 'number', min: 0 }
  },
  
  item: {
    productName: { required: true, type: 'string' },
    quantity: { required: true, type: 'number', min: 0 },
    price: { required: true, type: 'number', min: 0 }
  }
};

// Simple validation function
function validate(data, schema) {  for (const [field, rules] of Object.entries(schema)) {
    const value = data[field];
    
    // Required field
    if (rules.required && (!value && value !== 0)) {
      return { isValid: false, message: `${field} is required` };
    }
    
    if (!value && value !== 0) continue;
    
    // Type check
    if (rules.type) {
      if (rules.type === 'array') {
        if (!Array.isArray(value)) {
          return { isValid: false, message: `${field} must be array` };
        }
      } else if (typeof value !== rules.type) {
        return { isValid: false, message: `${field} must be ${rules.type}` };
      }
    }
    
    // Specific checks
    if (rules.type === 'string') {
      if (rules.min && !isValidString(value, rules.min)) {
        return { isValid: false, message: `${field} must be at least ${rules.min} characters` };
      }
      if (rules.email && !isValidEmail(value)) {
        return { isValid: false, message: `${field} is not valid` };
      }
    }
      if (rules.type === 'number' && rules.min !== undefined) {
      if (rules.min > 0 && !isPositiveNumber(value)) {
        return { isValid: false, message: `${field} must be a positive number` };
      }
      if (value < rules.min) {
        return { isValid: false, message: `${field} must be at least ${rules.min}` };
      }
    }
    
    if (rules.type === 'array' && rules.min && value.length < rules.min) {
      return { isValid: false, message: `${field} must contain at least ${rules.min} items` };
    }
  }
  
  return { isValid: true };
}

// Order validation
function validateOrderData(orderData) {
  // Basic check
  const result = validate(orderData, SCHEMAS.order);
  if (!result.isValid) return result;
  
  // Items check
  for (let i = 0; i < orderData.items.length; i++) {
    const itemResult = validate(orderData.items[i], SCHEMAS.item);
    if (!itemResult.isValid) {
      return { isValid: false, message: `Item ${i + 1}: ${itemResult.message}` };
    }
  }
  
  return {
    isValid: true,
    data: {
      fullName: orderData.fullName.trim(),
      email: orderData.email.trim().toLowerCase(),
      address: orderData.address.trim(),
      items: orderData.items,
      totalAmount: orderData.totalAmount
    }
  };
}

module.exports = {
  validateOrderData,
  validate,
  isValidEmail,
  isValidString,
  isPositiveNumber,
  SCHEMAS
};
