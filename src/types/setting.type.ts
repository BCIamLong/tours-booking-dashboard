export interface Setting {
  id: number;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPersonal: number;
  breakfastPrice: number;
  createdAt: Date;
}

export interface SettingInput {
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPersonal: number;
  breakfastPrice: number;
}
