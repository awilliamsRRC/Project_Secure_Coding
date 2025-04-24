"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import the express application and type definition
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
// Load environment variables BEFORE your internal imports!
dotenv_1.default.config();
const employeeRoutes_1 = __importDefault(require("./api/v1/routes/employeeRoutes"));
const branchRoutes_1 = __importDefault(require("./api/v1/routes/branchRoutes"));
const swagger_1 = __importDefault(require("../config/swagger"));
const errorHandler_1 = __importDefault(require("./api/v1/middleware/errorHandler"));
const app = (0, express_1.default)();
// CORS configuration
app.use((0, cors_1.default)({
    origin: ['https://console.firebase.google.com/project/branch-database-project3/overview', 'https://console.firebase.google.com/'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use((0, helmet_1.default)());
// Configure specific protections using Helmet
// Protect against Cross-Site Scripting (XSS) attacks
app.use(helmet_1.default.xssFilter());
// Prevent clickjacking by denying iframe embedding
app.use(helmet_1.default.frameguard({ action: 'deny' }));
(0, swagger_1.default)(app);
app.use((0, morgan_1.default)("combined"));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});
// Add logging to check CORS headers
app.use((req, res, next) => {
    console.log('CORS Origin:', req.headers.origin);
    next();
});
app.use("/api/v1/employees", employeeRoutes_1.default);
app.use("/api/v1/branches", branchRoutes_1.default);
app.use(errorHandler_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map