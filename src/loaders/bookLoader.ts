import items from "../data.json";

export const bookLoader = async () => {
  const data = await Promise.resolve(items);
  return data;
};
