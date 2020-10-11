export const IS_AUTH = "IS_AUTH";
export const IS_LOADING = "IS_LOADING";
export const ERROR = "ERROR";

export const isAuth = (isAuthenticated, loading) => {
  return {
    type: IS_AUTH,
    auth: isAuthenticated,
    isLoadning: loading,
  };
};

export const isLoadning = (loading) => {
  return {
    type: IS_LOADING,
    isLoadning: loading,
  };
};
export const isError = (error) => {
  return {
    type: ERROR,
    error: error,
  };
};
