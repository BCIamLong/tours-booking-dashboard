import { Guest } from "./guest.type";
import { Tour } from "./tour.type";

export interface Review {
  _id: string;
  user: string | Guest;
  cabin: string | Tour;
  review: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface SearchReview {
  cabin?: string | Tour;
}

export interface ReviewInput {
  review: string;
  rating: number;
}
