/**
 * Returns name in first, middle, last  name order.
 *
 * @param {string} [firstName='']
 * @param {string} [middlename='']
 * @param {string} [lastName='']
 * @param {bool} [withComma=false]
 * @returns {string} Last Name FirstName.
 */
export const getFullName = (firstName = "", middleName = "", lastName = "") => {
  return [firstName, middleName, lastName]
    .filter(Boolean)
    .map((name) => name.toLowerCase().charAt(0).toUpperCase() + name.slice(1))
    .join(" ");
};
