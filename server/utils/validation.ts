/**
 * Validation utilities for API requests
 */

export interface ValidationError {
  field: string;
  message: string;
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): ValidationError | null => {
  if (password.length < 8) {
    return { field: "password", message: "Password must be at least 8 characters" };
  }
  if (!/[A-Z]/.test(password)) {
    return { field: "password", message: "Password must contain at least one uppercase letter" };
  }
  if (!/[a-z]/.test(password)) {
    return { field: "password", message: "Password must contain at least one lowercase letter" };
  }
  if (!/[0-9]/.test(password)) {
    return { field: "password", message: "Password must contain at least one number" };
  }
  return null;
};

export const validatePostData = (data: any): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.title || data.title.trim().length === 0) {
    errors.push({ field: "title", message: "Title is required" });
  }

  if (data.title && data.title.length > 200) {
    errors.push({ field: "title", message: "Title must not exceed 200 characters" });
  }

  if (!data.content || data.content.trim().length === 0) {
    errors.push({ field: "content", message: "Content is required" });
  }

  if (!data.categoryId || data.categoryId.trim().length === 0) {
    errors.push({ field: "categoryId", message: "Category is required" });
  }

  if (!data.imageUrl || data.imageUrl.trim().length === 0) {
    errors.push({ field: "imageUrl", message: "Featured image is required" });
  }

  return errors;
};

export const validateAnnouncementData = (data: any): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.title || data.title.trim().length === 0) {
    errors.push({ field: "title", message: "Title is required" });
  }

  if (!data.date || data.date.trim().length === 0) {
    errors.push({ field: "date", message: "Date is required" });
  }

  if (!data.category || data.category.trim().length === 0) {
    errors.push({ field: "category", message: "Category is required" });
  }

  if (!data.href || data.href.trim().length === 0) {
    errors.push({ field: "href", message: "Link is required" });
  }

  return errors;
};

export const validateExternalLinkData = (data: any): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!data.title || data.title.trim().length === 0) {
    errors.push({ field: "title", message: "Title is required" });
  }

  if (!data.subtitle || data.subtitle.trim().length === 0) {
    errors.push({ field: "subtitle", message: "Subtitle is required" });
  }

  if (!data.url || data.url.trim().length === 0) {
    errors.push({ field: "url", message: "URL is required" });
  }

  // Basic URL validation
  try {
    new URL(data.url);
  } catch {
    errors.push({ field: "url", message: "Invalid URL format" });
  }

  return errors;
};
