export function isOzzyEmail(email = '') {
    return /^[^@\s]+@ozzystory\.com$/i.test(email.trim())
  }