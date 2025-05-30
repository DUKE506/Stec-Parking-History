export const isValidDate = (date: Date | undefined): boolean => {
  return date instanceof Date && !isNaN(date.getTime());
};
