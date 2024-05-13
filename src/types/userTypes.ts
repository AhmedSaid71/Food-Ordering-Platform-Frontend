interface IUser {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
}
interface IUserInitialState {
  user: IUser | null;
  loading: boolean;
  error: null | string;
  message: null | string;
}
interface IGetUserDataResponse {
  status: string;
  data: { user: IUser };
}
interface IUpdateUserDataResponse {
  status: string;
  message: string;
  data: { user: IUser };
}
export type {
  IUser,
  IUserInitialState,
  IGetUserDataResponse,
  IUpdateUserDataResponse,
};
