export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: "" | "male" | "female" | "other" | string;
  city: string;
  postalCode: number | "";
  telephone: string;
  address: string;
  imagePath: string;
  otp: number | "";
  emailVerified: boolean;
}
