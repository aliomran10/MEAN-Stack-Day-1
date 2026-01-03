"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const compression_1 = __importDefault(require("compression"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const hpp_1 = __importDefault(require("hpp"));
const cors_1 = __importDefault(require("cors"));
const i18n_1 = require("i18n");
const database_1 = __importDefault(require("./config/database"));
const Routes_1 = __importDefault(require("./Routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// FORCE CORS HEADERS (Vercel-safe)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://e-commerce-frontend-mu-fawn.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.use((0, cors_1.default)());
app.options("*", (0, cors_1.default)());
// const corsOptions = {
//   origin: function (origin: string | undefined, callback: Function) {
//     const allowedOrigins = [
//       "http://localhost:4200",
//       "https://e-commerce-frontend-mu-fawn.vercel.app",
//     ];
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(null, false);
//     }
//   },
//   credentials: true,
// };
// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );
// app.options("*", cors());
// Body parser
app.use(express_1.default.json({ limit: "10kb" }));
app.use((0, compression_1.default)());
app.use((0, express_mongo_sanitize_1.default)());
app.use((0, hpp_1.default)({
    whitelist: ["price", "category", "subcategory", "ratingAverage", "sold"],
}));
// Serve static files from public folder
app.use('/products', express_1.default.static(path_1.default.join(__dirname, 'public/products')));
app.use('/users', express_1.default.static(path_1.default.join(__dirname, 'public/users')));
// app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(express_1.default.static("uploads"));
(0, database_1.default)();
const i18n = new i18n_1.I18n({
    locales: ["en", "ar"],
    directory: path_1.default.join(__dirname, "locales"),
    defaultLocale: "en",
    queryParameter: "lang",
    updateFiles: false,
    syncFiles: false,
});
app.use(i18n.init);
(0, Routes_1.default)(app);
exports.default = app;
module.exports = app;
// import { Server } from "http";
// import path from "path";
// import express from "express";
// import dotenv from "dotenv";
// import compression from "compression";
// import mongoSanitize from "express-mongo-sanitize";
// import helmet from "helmet";
// import hpp from "hpp";
// import cors from "cors";
// import { I18n } from "i18n";
// import database from "./config/database";
// import mountRoutes from "./Routes";
// const app: express.Application = express();
// let server: Server;
// dotenv.config();
// app.use(express.json({ limit: "10kb" }));
// app.use(
//   cors({
//     origin: ["http://localhost:4200", "https://project.nti.giize.com"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );
// app.use(compression());
// app.use(mongoSanitize());
// app.use(
//   hpp({
//     whitelist: ["price", "category", "subcategory", "ratingAverage", "sold"],
//   })
// );
// app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
// app.use(express.static("uploads"));
// database();
// const i18n = new I18n({
//   locales: ["en", "ar"],
//   directory: path.join(__dirname, "locales"),
//   defaultLocale: "en",
//   queryParameter: "lang",
// });
// app.use(i18n.init);
// mountRoutes(app);
// server = app.listen(process.env.PORT, () => {
//   console.log(`App is listening on port ${process.env.PORT}`);
// });
// process.on("unhandledRejection", (err: Error) => {
//   console.error(`unhandledRejection ${err.name} | ${err.message}`);
//   server.close(() => {
//     console.error("shutting the application down");
//     process.exit(1);
//   });
// });
