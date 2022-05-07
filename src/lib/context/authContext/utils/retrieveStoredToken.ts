import { TOKEN_EXP_DATETIME, TOKEN_STR } from "lib/utils/localStorageKey";
import { calculateRemainingTime } from "./calculateRemainingTime";

/**
 * retrieve token from local storage
 * @returns token and time in milli second, if token is more than 1 minute to be expired. Else return null
 */
export const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem(TOKEN_STR);
  const storedExpirationDateTime = localStorage.getItem(TOKEN_EXP_DATETIME);

  const remainingTime = calculateRemainingTime(storedExpirationDateTime);

  // if remaining time is less than 1 minute
  if (remainingTime <= 60000) {
    localStorage.removeItem(TOKEN_STR);
    localStorage.removeItem(TOKEN_EXP_DATETIME);
    return null;
  }

  return { token: storedToken, duration: remainingTime };
};
