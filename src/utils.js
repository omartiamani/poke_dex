/**
 *
 * @param {string} string Capitalize a string
 */
export const capitalize = string => {
  if (typeof string !== "string") throw Error("The argument must be a string");
  return string.charAt(0).toUpperCase() + string.slice(1);
};
