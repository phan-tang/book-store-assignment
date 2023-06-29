import { z } from 'zod';

const createBookRequest = z.object({
    body: z.object({
        name: z.string({
            required_error: "Book name is required",
            invalid_type_error: "Book name must be a string",
        }).min(1, "Book name must be at least 1 characters long")
            .max(30, "Book name must be up to 30 characters long"),
        author_name: z
            .string({
                required_error: "Author name is required",
                invalid_type_error: "Author name must be a string",
            }),
        category_name: z.string({
            required_error: "Category name is required",
            invalid_type_error: "Category name must be a string",
        }),
        summary: z.string({
            required_error: "Summary is required",
            invalid_type_error: "Summary must be a string",
        }),
        price: z.number({
            required_error: "Book price is required",
            invalid_type_error: "Price must be a number",
        }).min(1, "Price must not be less than 1"),
        final_price: z.number({
            required_error: undefined,
            invalid_type_error: "Final price must be a number"
        }).min(1, "Final price must not be less than 1"),
        quantity: z.number({
            required_error: "Quantity is required",
            invalid_type_error: "Quantity must be a number"
        }).min(1, "Quantity must not be less than 1")
    }),
});

export { createBookRequest };