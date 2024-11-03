import { FieldValues } from "react-hook-form";

export interface TourInput extends FieldValues {
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: string;
  type: string;
  summary: string;
  description: string;
  price: number;
  imageCover: FileList | string;
  image1: FileList | string;
  image2: FileList | string;
  image3: FileList | string;
  startDates: StartDate[];
  startLocation: StartLocation;
  locations: Location[];
}

export interface SearchTour {
  name?: string;
  duration?: number;
  maxGroupSize?: number;
  difficulty?: string;
  type?: string;
  price?: number;
  vip?: boolean;
  createdAt?: Date;
  where?: string;
  when?: string;
  date?: string;
  nameLike?: string;
  priceRange?: number;
}

interface StartDate {
  date: Date;
  participants: number;
  soldOut: boolean;
}

interface StartLocation {
  type: string;
  coordinates: number[];
  address: string;
  description: string;
}

interface Location extends StartLocation {
  day: number;
}

export interface Tour {
  _id: string;
  name: string;
  slug: string;
  duration: number;
  maxGroupSize: number;
  difficulty: string;
  type: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  summary: string;
  description: string;
  price: number;
  imageCover: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  vip: boolean;
  startDates: StartDate[];
  startLocation: StartLocation;
  locations: Location[];
}
