export type SortOptions =
  | "none"
  | "latest"
  | "oldest"
  | "price-low"
  | "price-high"
  | "name-low"
  | "name-high"
  | "popular"
  | "most-likes"
  | "trending";

export type SortReviewOption = "latest" | "oldest";

export type FilterOptions = "none" | "group" | "private" | "personal";
export type FilterBookingsOptions = "none" | "checked-in" | "checked-out" | "confirmed";
export type FilterGuestOptions =
  | "none"
  | "verifyEmail-true"
  | "verifyEmail-false"
  | "enable2FA-true"
  | "enable2FA-false";
