import { z } from "zod";

export const surveySchema = z
    .object({
        name: z
            .string()
            .min(2, "Name must be at least 2 characters")
            .max(50, "Name must be less than 50 characters")
            .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
        gender: z.enum(["male", "female", "other", "prefer-not-to-say"], {
            required_error: "Please select your gender",
        }),
        nationality: z
            .string({
                invalid_type_error: "Nationality must be a string",
            })
            .min(2, "Nationality must be at least 2 characters")
            .max(30, "Nationality must be less than 30 characters"),
        email: z.string().email("Please enter a valid email address").min(1, "Email is required"),
        phone: z
            .string(),
        address: z
            .string()
            .min(10, "Address must be at least 10 characters")
            .max(200, "Address must be less than 200 characters"),
        message: z.string().max(500, "Message must be less than 500 characters").optional(),
    })