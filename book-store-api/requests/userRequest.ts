import { z } from 'zod';

const createUserRequest = z.object({
    body: z.object({
        first_name: z.string({
            required_error: "First name is required",
            invalid_type_error: "First name must be a string",
        }),
        last_name: z.string({
            required_error: "Last name is required",
            invalid_type_error: "Last name must be a string",
        }),
        email: z.string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        }).email('Email is invalid'),
        password: z.string({
            required_error: "Password is required",
            invalid_type_error: "Password must be a string",
        }).min(8, "Password must be at least 8 characters long")
            .regex(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=.*[$@$#!%*?&]).{5,}$/, "Password is invalid"),
    }),
});

export { createUserRequest };