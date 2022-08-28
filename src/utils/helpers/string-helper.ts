export const CapitaliseFirst = (word: string): string => {
  if (!word || word.length === 0) return word;

  return word[0].toUpperCase() + word.substring(1);
};

export const IgnoreCaseEquals = (str1: string, str2: string): boolean => {
  return str1.localeCompare(str2, undefined, { sensitivity: "accent" }) === 0;
};
