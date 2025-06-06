import { HttpResponse } from "@/constants/response-message.constant";
import { z } from "zod";

export const signinSchema = z
  .object({
    username: z.string().min(3).max(100).nonempty(HttpResponse.INVALID_USERNAME),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one digit")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character"
      ),
  })
  .strict()

