export enum AppRoute {
  Root = "/",
  Login = "/login",
  Register = "/register",
}

const ApiRouteRootPath = {
  User: "/user",
  Session: "/s",
}

export const ApiRoute = {
  UserInfo: `${ApiRouteRootPath.User}/info`,
  LoginUser: `${ApiRouteRootPath.Session}/login`,
  RegisterUser: `${ApiRouteRootPath.Session}/register`,
}