import { z } from 'zod';

const createCategoryRequest = z.object({
    body: z.object({
        name: z.string({
            required_error: "Category name is required",
            invalid_type_error: "Category name must be a string",
        }),
        description: z
            .string({
                required_error: "Description is required",
                invalid_type_error: "Description must be a string",
            })
    }),
});

export { createCategoryRequest };