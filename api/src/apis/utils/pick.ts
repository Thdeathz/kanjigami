/**
 * Returns a new object with only the specified keys from the original object.
 * @param {Object} obj The original object.
 * @param {string[]} keys The keys to pick from the original object.
 * @returns {Object}
 */
export const pick = <T extends object>(obj: T, keys: string[]): object => {
  return keys.reduce((acc, key) => {
    if (obj && Object.prototype.hasOwnProperty.call(obj, key)) {
      acc[key] = obj[key]
    }

    return acc
  }, {})
}
