/**
 * determine expiration datetime in ISO format
 * @param expiresIn number of seconds before the expiration
 */
export const getExpirationDateTime = (expiresIn: number) => {
  const expirationTime = new Date(new Date().getTime() + expiresIn * 1000);
  return expirationTime.toISOString();
};
