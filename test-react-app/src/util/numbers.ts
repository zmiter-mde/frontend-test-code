/**
 * Requirements are basically defined in the test file
 * @param str any string value
 * @returns true if specifically integer string
 */
export const isInteger = (str: string): boolean => {
  const er = /^-?[0-9]+$/

  return er.test(str)
}
