import { ReactNode } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

interface IAuthOProviderWithNavigate {
  children: ReactNode;
}

interface ILoadingButton {
  title: string;
}

interface ICuisineCheckbox {
  cuisine: string;
  field: ControllerRenderProps<FieldValues, "cuisines">;
}
interface IMenuItemInput {
  index: number;
  removeMenuItem: () => void;
}

export type {
  IAuthOProviderWithNavigate,
  ILoadingButton,
  ICuisineCheckbox,
  IMenuItemInput,
};
