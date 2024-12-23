export interface User {
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
