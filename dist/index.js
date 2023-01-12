"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// CORS, JSON and URL Encoded Middlewares
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
require("./config/passport");
const requestLogger_1 = require("./middlewares/requestLogger");
app.use(requestLogger_1.requestLogger);
const index_1 = __importDefault(require("./routes/index"));
app.use("/api", index_1.default);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
