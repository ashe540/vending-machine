import http from 'http';
import compression from 'compression';
import express from 'express';
import socketIO from 'socket.io';
import { json, urlencoded } from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import cors from 'cors';

// Set up config through env variables
import './app/config';

import { error } from './app/middleware';
import routes from './app/routes';
import log from './app/utils/logger';

import { mongoClient } from './app/clients/mongo';
import logger from './app/utils/logger';

// Connect to database
mongoClient();

const app = express();
const server = new http.Server(app);
const io = new socketIO.Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// This will not scale if we need to keep track of thousands of users
// We can use an in-memory store like Redis for this purpose
const connectedUsersMap = {};
const socketToUserMap = {};

io.on('connection', (socket) => {
  logger.info(`Socket ${socket.id} connected.`);

  socket.on('session', (userId) => {
    if (userId) {
      // Store reference to user when we receive connection
      if (!connectedUsersMap[userId]) {
        connectedUsersMap[userId] = 0;
      }
      socketToUserMap[socket.id] = userId;

      socket.join(userId);
      io.to(userId).emit('joined', userId);

      if (connectedUsersMap[userId] > 0) {
        io.to(userId).emit('multipleLogins', userId);
      }

      connectedUsersMap[userId] += 1;
    }
  });

  socket.on('disconnect', () => {
    if (socket.id) {
      const userId = socketToUserMap[socket.id];

      if (connectedUsersMap[userId]) {
        connectedUsersMap[userId] -= 1;
        delete socketToUserMap[socket.id];
      }
      logger.info(`Socket ${socket.id} disconnected.`);
    }
  });
});

const port = process.env.PORT || 4000;

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(json());
app.use(urlencoded({ extended: false }));
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});
app.use('/api/v1', routes);

app.use(error);

if (process.env.NODE_ENV !== 'test') {
  server.listen(port);
}

log.info(`⚡️ Running server on port ${port} in ${process.env.NODE_ENV} mode`);

export { app, io };
