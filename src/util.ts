const _getIdDigit = () => Math.floor(Math.random() * 36).toString(36);

export const makeId = () => {
  const length = 3;
  let result = '';
  for (let i = 0; i < length; i++) {
    result += _getIdDigit();
  }
  return result.toUpperCase();
};
