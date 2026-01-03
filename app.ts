import path from "path";
import express from "express";
import dotenv from "dotenv";
import compression from "compression";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
import { I18n } from "i18n";
import database from "./config/database";
import mountRoutes from "./Routes";

dotenv.config();

const app: express.Application = express();

// FORCE CORS HEADERS (Vercel-safe)
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://e-commerce-frontend-mu-fawn.vercel.app"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(cors());
app.options("*", cors());

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
app.use(express.json({ limit: "10kb" }));
app.use(compression());
app.use(mongoSanitize());
app.use(
  hpp({
    whitelist: ["price", "category", "subcategory", "ratingAverage", "sold"],
  })
);

// Serve static files from public folder
app.use("/products", express.static(path.join(__dirname, "uploads/products")));
app.use("/users", express.static(path.join(__dirname, "uploads/users")));

// app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(express.static("uploads"));

database();

const i18n = new I18n({
  locales: ["en", "ar"],
  directory: path.join(__dirname, "locales"),
  defaultLocale: "en",
  queryParameter: "lang",
  updateFiles: false,
  syncFiles: false,
});
app.use(i18n.init);

mountRoutes(app);

export default app;
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
