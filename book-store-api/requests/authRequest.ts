import { z } from 'zod';

const loginRequest = z.object({
    body: z.object({
        email: z.string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        }).email('Email is invalid'),
        password: z.string({
            required_error: "Password is required",
            invalid_type_error: "Password must be a string",
        })
    }),
});

export { loginRequest };