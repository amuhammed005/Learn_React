// utils/storage.js
export const getLocalStorage = (key, fallback) => {
  try {
    if (typeof window === "undefined") return fallback;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

export const setLocalStorage = (key, value) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(value));
};
