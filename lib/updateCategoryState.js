// utils/updateCategoryState.js

function flattenKeys(obj, prefix = '') {
  const keys = new Set();

  for (const key in obj) {
    const fullKey = `${prefix} ${key}`.trim().toLowerCase();
    keys.add(fullKey);

    const value = obj[key];

    if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (typeof item === 'string') {
            keys.add(`${fullKey} ${item}`.trim().toLowerCase());
          }
        });
      } else {
        const nestedKeys = flattenKeys(value, fullKey);
        nestedKeys.forEach(k => keys.add(k));
      }
    }
  }

  return keys;
}

export function updateCategoryState(newObject, previousObject = null, previousCategory = null) {
  const activityKeywords = ['enrolled', 'graduated', 'inactive', 'needs', 'referred', 'attending', 'grade', 'support'];
  const programKeywords = ['ged', 'hsed', 'tutoring'];

  const newKeys = flattenKeys(newObject);

  if ([...newKeys].some(key => activityKeywords.some(word => key.includes(word)))) {
    return 'activity';
  }

  if ([...newKeys].some(key => programKeywords.some(word => key.includes(word)))) {
    return 'program';
  }

  if (previousObject) {
    const prevKeys = flattenKeys(previousObject);
    if ([...prevKeys].some(key => programKeywords.some(word => key.includes(word)))) {
      return 'school';
    }
  }

  if (previousCategory === 'school') {
    return 'achievement';
  }

  return null;
}