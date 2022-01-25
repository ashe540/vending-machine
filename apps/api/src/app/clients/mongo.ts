import mongoose from 'mongoose';
import log from '../utils/logger';

import { config } from '../utils/config';

function handleConnectionError(error) {
  log.error(`An error ocurred while connecting to database: ${error}`);
}

export const mongoClient = async () => {
  try {
    mongoose.connect(config.mongoConnectionUri, {});
  } catch (error) {
    handleConnectionError(error);
  }

  mongoose.connection.on('error', (error) => {
    handleConnectionError(error);
  });

  mongoose.connection.on('connecting', () => {
    log.info(`Connecting to database... please wait...`);
  });

  mongoose.connection.on('connected', () => {
    log.info(`Connected successfully to ${config.mongoConnectionUri}`);
  });
};
