/**
 * Get value from storage by key
 *
 * @param {string} key
 * @return {string | null}
 */
export const get = (key) => {
  const value = window.localStorage.getItem(key);
  if (!value) {
    return null;
  }
  return JSON.parse(value);
};

/**
 * Set key value in storage.
 *
 * @param {string} key
 * @param {string} value
 */
export const set = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Remove key value in storage.
 *
 * @param {string} key
 */
export const remove = (key) => window.localStorage.removeItem(key);

/**
 * Clear storage.
 *
 * @return {string}
 */
export const clear = () => window.localStorage.clear();
