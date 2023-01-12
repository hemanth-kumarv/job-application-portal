import { Readable } from "stream";

/**
 * Function to read and parse content of file uploaded through multer
 * @param file input file to be parsed
 * @returns file contents
 */
export const readFileContent = (file: Express.Multer.File | undefined) =>
  new Promise<string>((resolve, reject) => {
    if (!file) resolve("");

    const stream = Readable.from(file?.buffer as Buffer);
    let content = "";
    stream.on("data", (data) => (content += data.toString()));
    stream.on("end", () => resolve(content));
  });
