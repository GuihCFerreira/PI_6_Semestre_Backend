export function formatImageBaseURI(file: Express.Multer.File): string { 
    const b64 = Buffer.from(file.buffer).toString("base64");
    return "data:" + file.mimetype + ";base64," + b64;
}