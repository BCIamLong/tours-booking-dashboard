export interface Guest {
  _id: string;
  fullName: string;
  email: string;
  password?: string;
  passwordConfirm?: string;
  verifyEmail?: boolean;
  verifyEmailToken?: string;
  nationalId?: string;
  nationality?: string;
  countryFlag?: string;
  updatePasswordToken?: string;
  passwordChangedAt?: Date;
  passwordResetToken?: string;
  passwordResetTokenTimeout?: Date;
  deactivated?: boolean;
  deactivatedReason?: string;
  deleteAt?: Date;
  deactivatedAt?: Date;
  avatar?: string;
  role?: "user";
  otp2FAAuthUrl?: string;
  otp2FAToken?: string;
  enable2FA?: boolean;
  verify2FAOtp?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GuestInput {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface GuestUpdateInput {
  fullName?: string;
  email?: string;
  avatar?: string | FileList;
  role: "user" | "admin";
}

export interface SearchGuest {
  fullName: string;
  email: string;
  nationality?: string;
  countryFlag?: string;
}
