export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isMinLength(value: string, min: number): boolean {
  return value.trim().length >= min;
}

export function isRequired(value: string): boolean {
  return value.trim().length > 0;
}

// Validation functions that return error messages
export type ValidationError = string | null;

export function validateName(value: string): ValidationError {
  if (!isRequired(value)) {
    return "Name is required";
  }
  if (!isMinLength(value, 2)) {
    return "Name must be at least 2 characters";
  }
  return null;
}

export function validateEmail(value: string): ValidationError {
  if (!isRequired(value)) {
    return "Email is required";
  }
  if (!isValidEmail(value)) {
    return "Please enter a valid email address";
  }
  return null;
}

export function validateMessage(value: string): ValidationError {
  if (!isRequired(value)) {
    return "Message is required";
  }
  if (!isMinLength(value, 20)) {
    return "Message must be at least 20 characters";
  }
  return null;
}
