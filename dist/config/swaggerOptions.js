"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSwaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Directory Management API Documentation",
            version: "1.0.0",
            description: "This is the API documentation for the Task Management application.",
        },
        servers: [
            {
                url: "http://localhost:3000/api/v1",
                description: "Local server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/api/v1/routes/*.ts", "./src/api/v1/models/*.ts"], // Path to the API docs and schemas
};
// Generate the Swagger spec
const generateSwaggerSpec = () => {
    return (0, swagger_jsdoc_1.default)(swaggerOptions);
};
exports.generateSwaggerSpec = generateSwaggerSpec;
//# sourceMappingURL=swaggerOptions.js.map