"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = exports.validate = void 0;
/**
 * Validates data against a Joi schema and throws an error if validation fails.
 *
 * @template T - The type of data being validated
 * @param schema - Joi schema to validate against
 * @param data - Data to validate
 * @throws Error if validation fails, with concatenated error messages
 *
 * @example
 * const userSchema = Joi.object({
 *   name: Joi.string().required(),
 *   age: Joi.number().min(0)
 * });
 *
 * try {
 *   validate(userSchema, { name: "John", age: -1 });
 * } catch (error) {
 *   // Will throw with validation error message
 * }
 */
const validate = (schema, data) => {
    // abortEarly: false ensures all validation errors are collected, not just the first one
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
        // Map through all validation errors and join them into a single string
        throw new Error(`Validation error: ${error.details
            .map((x) => x.message)
            .join(", ")}`);
    }
};
exports.validate = validate;
/**
 * Creates an Express middleware function that validates request data against a Joi schema.
 * Combines and validates data from request body, URL parameters, and query parameters.
 *
 * @param schema - Joi schema to validate the combined request data against
 * @returns Express middleware function that performs the validation
 * @throws Returns 400 Bad Request if validation fails
 *
 * @example
 * const router = express.Router();
 *
 * const userSchema = Joi.object({
 *   name: Joi.string().required(),
 *   id: Joi.string().required(), // from URL params
 *   filter: Joi.string() // from query params
 * });
 *
 * router.post('/users/:id', validateRequest(userSchema), (req, res) => {
 *   // If we reach here, validation passed
 *   res.json({ success: true });
 * });
 */
const validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            // Combine all possible sources of request data into a single object
            // This allows validation of data from body, URL params, and query params together
            const data = Object.assign(Object.assign(Object.assign({}, req.body), req.params), req.query);
            // Validate the combined data against the schema
            (0, exports.validate)(schema, data);
            // If validation passes, proceed to the next middleware/route handler
            next();
        }
        catch (error) {
            // If validation fails, return a 400 Bad Request response
            // Type assertion is needed because catch blocks receive an unknown type
            res.status(400).json({ error: error.message });
        }
    };
};
exports.validateRequest = validateRequest;
//# sourceMappingURL=validate.js.map