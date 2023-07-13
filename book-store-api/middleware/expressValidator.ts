import { NextFunction, Request, Response } from "express";
import { ValidationError, body, validationResult } from "express-validator";

const numericValidators = (fields: string[]) => {
    return fields.map((field: string) => {
        return body(field).isFloat({ min: 1 })
            .withMessage(`${field} must be a float and greater than 1`)
    })
}

const expressValidate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors: any[] = [];
    errors.array().map((err: ValidationError) => extractedErrors.push({ err: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

export { numericValidators, expressValidate };