export const setStogare = (key: string, value: string) => {
  // if (typeof window === "undefined") return;
  if (!window) return;
  window.localStorage.setItem(key, value);
};

export const getStogare = (key: string): string => {
  // if (typeof window === "undefined") return "";
  if (!window) return "";
  return window.localStorage.getItem(key) || "";
};
