/**
 * Helper function to conditionally join CSS class names
 * @param classes - Array of class names or conditional class objects
 * @returns String of combined class names
 */
export type ClassNames = (
  ...classes: (string | null | undefined | { [key: string]: boolean })[]
) => string;

export const classNames: ClassNames = (...classes) => {
  const result: string[] = [];

  for (const cls of classes) {
    if (typeof cls === 'string' && cls) {
      result.push(cls);
    } else if (typeof cls === 'object' && cls !== null) {
      for (const key in cls) {
        if (cls[key]) {
          result.push(key);
        }
      }
    }
  }

  return result.join(' ');
};

export default classNames;