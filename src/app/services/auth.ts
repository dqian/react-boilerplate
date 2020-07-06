

const JWT_TOKEN_LOCAL_STORAGE_KEY = `${process.env.PROJECT_PREFIX}_jwtToken`;

export const getJwtToken = () => {
  return localStorage.getItem(JWT_TOKEN_LOCAL_STORAGE_KEY);
}

export const hasJwtToken = () => !!getJwtToken();

export const setJwtToken = (jwtToken: string) => {
  localStorage.setItem(JWT_TOKEN_LOCAL_STORAGE_KEY, jwtToken);
}

export const clearJwtToken = () => {
  localStorage.setItem(JWT_TOKEN_LOCAL_STORAGE_KEY, "");
}