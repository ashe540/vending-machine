export const config = {
  sessionSecret: process.env.SESSION_SECRET as string,
  mongoConnectionUri: process.env.MONGO_CONNECTION_URI as string,
};
