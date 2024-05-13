import { IUser } from "@/types";

interface IAuthInitialState {
  loading: boolean;
  error: null | string;
  isAuthenticated: boolean;
  message: string | null;
}
interface ISignupUserResponse {
  status: string;
  message: string;
  token: string;
  data: {
    user: IUser;
  };
}
interface ILoginUserResponse {
  status: string;
  message: string;
  token: string;
  data: {
    user: IUser;
  };
}
interface ILogoutUserResponse {
  status: string;
  message: string;
}
export type {
  IAuthInitialState,
  ISignupUserResponse,
  ILoginUserResponse,
  ILogoutUserResponse,
};
