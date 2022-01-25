import path from "path";
import dotenv from "dotenv";

const { NODE_ENV } = process.env;

let envFile = ".env-development";

if (NODE_ENV === "production") {
  envFile = ".env";
}

const filePath = path.join(`${__dirname}/../`, envFile);
dotenv.config({
  path: filePath,
});
