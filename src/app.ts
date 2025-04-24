// import the express application and type definition
import express, { Express,Request,Response } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";

// Load environment variables BEFORE your internal imports!
dotenv.config();


import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";
import setupSwagger from "../config/swagger";
import errorHandler from "./api/v1/middleware/errorHandler";

const app: Express = express();


// CORS configuration
app.use(cors({
    origin: ['https://console.firebase.google.com/project/branch-database-project3/overview', 'https://console.firebase.google.com/'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

app.use(helmet());
// Configure specific protections using Helmet

// Protect against Cross-Site Scripting (XSS) attacks
app.use(helmet.xssFilter()); 
// Prevent clickjacking by denying iframe embedding
app.use(helmet.frameguard({ action: 'deny' })); 

setupSwagger(app);

app.use(morgan("combined"));
app.use(express.json());

app.get("/",(req:Request,res:Response) => {
    res.send("Hello, World!");

});

app.get("/api/v1/health", (req:Request,res:Response) => {
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

app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/branches", branchRoutes);
app.use(errorHandler);



export default app;



