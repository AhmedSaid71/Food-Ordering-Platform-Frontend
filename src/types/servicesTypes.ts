export interface ILoginUserRequest {
  email: string;
  password: string;
}
export interface ISignupUserRequest {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
export interface IUpdateUserRequest {
  name: string;
  addressLine1: string;
  country: string;
  city: string;
}
