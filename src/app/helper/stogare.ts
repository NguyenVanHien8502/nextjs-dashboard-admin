export const setStogare = (key: string, value: string) => {
  if (!window) return;
  window.localStorage.setItem(key, value);
};

export const getStogare = (key: string): string => {
  if (!window) return "";
  return window.localStorage.getItem(key) || "";
};
