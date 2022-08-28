export const fetchRequest = async (
  url: string,
  options?: RequestInit,
): Promise<Response> => {
  return await fetch(url, options);
};
