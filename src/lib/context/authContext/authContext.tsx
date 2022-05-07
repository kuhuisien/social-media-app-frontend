/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { TOKEN_EXP_DATETIME, TOKEN_STR } from "lib/utils/localStorageKey";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { calculateRemainingTime } from "./utils/calculateRemainingTime";
import { retrieveStoredToken } from "./utils/retrieveStoredToken";

let logoutTimer: NodeJS.Timeout;

interface AuthContextType {
  token: string | null | undefined;
  isSignedIn: boolean;
  signin: (token: string, expirationTime: string) => void;
  signout: () => void;
}

export const AuthContext = React.createContext<AuthContextType>({
  token: "",
  isSignedIn: false,
  signin: (token: string) => {},
  signout: () => {},
});

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const tokenData = retrieveStoredToken();

  const initialToken = tokenData?.token;

  const [token, setToken] = useState(initialToken);

  const isSignedIn = !!token;

  const signoutHandler = useCallback(() => {
    setToken("");
    localStorage.removeItem(TOKEN_STR);
    localStorage.removeItem(TOKEN_EXP_DATETIME);

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const signinHandler = (token: string, expirationDateTime: string) => {
    setToken(token);
    localStorage.setItem(TOKEN_STR, token);
    localStorage.setItem(TOKEN_EXP_DATETIME, expirationDateTime);

    const remainingTime = calculateRemainingTime(expirationDateTime);
    logoutTimer = setTimeout(signoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(signoutHandler, tokenData.duration);
    }
  }, [tokenData, signoutHandler]);

  const contextValue = {
    token,
    isSignedIn,
    signin: signinHandler,
    signout: signoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
