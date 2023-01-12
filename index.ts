import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// CORS, JSON and URL Encoded Middlewares
import cors from "cors";
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import "./config/passport";

import { requestLogger } from "./middlewares/requestLogger";
app.use(requestLogger);

import routes from "./routes/index";
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
