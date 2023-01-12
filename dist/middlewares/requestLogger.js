"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
// Function to log incoming requests
const requestLogger = (req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    next();
};
exports.requestLogger = requestLogger;
