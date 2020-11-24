export const percent = (numerator: number, denominator: number) => {
  if (Number.isNaN(numerator) || Number.isNaN(denominator)) {
    return 0;
  }
  if (denominator === 0) {
    return 0;
  }

  let percentage = numerator / denominator;
  if (percentage > 100) {
    percentage = 100;
  } else if (percentage < 0) {
    percentage = 0;
  }
  return percentage * 100;
};
