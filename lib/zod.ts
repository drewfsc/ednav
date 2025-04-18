import { object, string } from "zod";

export const signInSchema = object({
  username: string({ required_error: "username is required" }).min(
    1,
    "Email is required",
  ),
  password: string({ required_error: "Password is required" })
    .min(4, "Password is required")
    // .min(4, "Password must be more than 8 characters")
    .max(4, "Password must be less than 32 characters"),
});
