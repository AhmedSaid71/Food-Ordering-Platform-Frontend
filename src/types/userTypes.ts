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
}

export type { IUser, IUserInitialState };
