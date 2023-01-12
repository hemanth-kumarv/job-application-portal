"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFileContent = void 0;
const stream_1 = require("stream");
/**
 * Function to read and parse content of file uploaded through multer
 * @param file input file to be parsed
 * @returns file contents
 */
const readFileContent = (file) => new Promise((resolve, reject) => {
    if (!file)
        resolve("");
    const stream = stream_1.Readable.from(file === null || file === void 0 ? void 0 : file.buffer);
    let content = "";
    stream.on("data", (data) => (content += data.toString()));
    stream.on("end", () => resolve(content));
});
exports.readFileContent = readFileContent;
