export const getStogare = (key: string): string => {
  if (typeof window === "undefined") return "";

  return window.localStorage.getItem(key) || "";
};
