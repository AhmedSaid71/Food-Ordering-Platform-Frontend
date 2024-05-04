type TLoading = "idle" | "pending" | "succeeded" | "failed";
type TSearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

export type { TLoading, TSearchState };
