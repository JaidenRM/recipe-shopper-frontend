export const ContainsIgnoringAt = <T>(
  arr: T[],
  target: T,
  indexesToIgnore: number[],
): boolean => {
  const filteredArr = [...arr].filter((_, i) => !indexesToIgnore.includes(i));

  return filteredArr.includes(target);
};
