export type SortOptions =
  | "none"
  | "latest"
  | "oldest"
  | "price-low"
  | "price-high"
  | "name-low"
  | "name-high"
  | "rating-high"
  | "rating-low"
  | "likes-high"
  | "likes-low"
  | "shares-high"
  | "shares-low"
  | "bookmarks-high"
  | "bookmarks-low"
  | "comments-high"
  | "comments-low"
  | "popular"
  | "most-likes"
  | "trending";

export type SortReviewOption = "latest" | "oldest";

export type FilterOptions = "none" | "group" | "private" | "personal";
export type FilterBookingsOptions = "none" | "checked-in" | "checked-out" | "confirmed";
export type FilterReviewsOptions = "none" | "1" | "2" | "3" | "4" | "5";
export type FilterPostsOptions = "none" | "popular" | "most-likes" | "trending";
export type FilterGuestOptions =
  | "none"
  | "verifyEmail-true"
  | "verifyEmail-false"
  | "enable2FA-true"
  | "enable2FA-false";
