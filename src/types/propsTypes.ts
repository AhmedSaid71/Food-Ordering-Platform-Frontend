import { ReactNode } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { TSearchBarValidator } from "./formsTypes";
import { IRestaurant } from "./restaurantTypes";

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

interface ISearchBar {
  onSubmit: (formData: TSearchBarValidator) => void;
  placeholder: string;
  onReset?: () => void;
  searchQuery?: string;
}
interface IRestaurantCard {
  restaurant: IRestaurant;
}
interface ISearchResultInfo {
  total: number;
  city: string;
}
interface IPaginationSelector {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
}
interface ICuisineFilter {
  selectedCuisines: string[];
  isExpanded: boolean;
  onChange: (cuisines: string[]) => void;
  onExpand: () => void;
}
interface ISortBy {
  onChange: (value: string) => void;
  sortOption: string;
}

interface IRestaurantInfo {
  restaurant: IRestaurant;
}
export type {
  IAuthOProviderWithNavigate,
  ILoadingButton,
  ICuisineCheckbox,
  IMenuItemInput,
  ISearchBar,
  IRestaurantCard,
  ISearchResultInfo,
  IPaginationSelector,
  ICuisineFilter,
  ISortBy,
  IRestaurantInfo,
};
