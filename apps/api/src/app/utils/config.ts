export const config = {
  env: process.env.NODE_ENV as string,
  sessionSecret: process.env.SESSION_SECRET as string,
  mongoConnectionUri: process.env.MONGO_CONNECTION_URI as string,
};
