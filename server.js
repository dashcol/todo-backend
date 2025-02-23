import app from "./index.js";
import connectToDB from "./src/config/config.js";
import awsServerlessExpress from "aws-serverless-express";

connectToDB();

const server = awsServerlessExpress.createServer(app);

export const handler = (event, context) => {
  return awsServerlessExpress.proxy(server, event, context);
};
