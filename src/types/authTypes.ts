interface IAuthInitialState {
  loading: boolean;
  error: null | string;
  isAuthenticated: boolean;
  message: string | null;
}

export type { IAuthInitialState };
