export const validateTodoTitle = (title, minLength = 3, maxLength = 100) => {
  if (!title || !title.trim()) {
    return { isValid: false, error: "Title is required" };
  }

  const trimmedTitle = title.trim();

  if (trimmedTitle.length < minLength) {
    return {
      isValid: false,
      error: `Title must be at least ${minLength} characters`,
    };
  }

  if (trimmedTitle.length > maxLength) {
    return {
      isValid: false,
      error: `Title must not exceed ${maxLength} characters`,
    };
  }

  return { isValid: true, error: "" };
};

/**
 * Formats a date to a readable string
 * @param {Date} date - The date to format
 * @returns {string} - Formatted date string
 */
export const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Calculates completion percentage
 * @param {number} completed - Number of completed items
 * @param {number} total - Total number of items
 * @returns {number} - Percentage (0-100)
 */
export const calculateCompletionPercentage = (completed, total) => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};
