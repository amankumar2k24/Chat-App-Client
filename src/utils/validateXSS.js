//i want to use this function to validate all the inputs that are coming from the user
export const validateXSS = (value) => {
  if (value) {
    // Regex to match any HTML tags and JavaScript code
    const regex = /<[^>]*>|javascript:/gi;
    return !regex.test(value);
  }
  return true;
};
