import { Guest, GuestInput } from "./guest.type";
import { Tour } from "./tour.type";

export interface SearchPost {
  tourId: string;
  userId: string;
  title: string;
}

export interface Like {
  id?: string;
  userId: string;
  likeAt: Date;
}

export interface Comment {
  _id: string;
  id: string;
  userId: string | GuestInput;
  content: string;
  likes: Like[];
  commentAt: Date;
  updateCommentAt: Date;
}

export interface CommentInput {
  content: string;
}

export interface Bookmark {
  id?: string;
  userId: string;
  bookmarkAt: Date;
}

export interface PostInput {
  title: string;
  description: string;
  images: string[];
  comments?: Comment[];
  // commentId?: string;
}

export interface Post {
  _id: string;
  tourId: string | Tour;
  userId: string | Guest;
  title: string;
  description: string;
  likes: Like[];
  comments: Comment[];
  shares: number;
  bookmarks: Bookmark[];
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}
