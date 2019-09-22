const calcScoreNumber = (rightCharsLength, examCharsLength): number => {
  const result = Math.floor(Number((rightCharsLength / examCharsLength) * 100));

  return !Number.isNaN(result) ? result : 0;
};

export const examUtil = {
  calcScoreNumber,
};
