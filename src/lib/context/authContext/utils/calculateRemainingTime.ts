/**
 * calculate the current remaining time of datetime input
 * @param expirationTime datetime in ISO format
 * @returns time in milli sec
 */
export const calculateRemainingTime = (expirationTime: string | null) => {
  if (!expirationTime) {
    return 0;
  }

  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingTime = adjExpirationTime - currentTime;
  return remainingTime || 0;
};
