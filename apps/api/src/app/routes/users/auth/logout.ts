import { RequestHandler } from 'express';
import { io } from '../../../../main';

export const logoutAll: RequestHandler = async (req, res) => {
  const { user } = req;
  const userId = user.id;

  // Send event to log out all connected instanaces instances of the same client
  io.to(userId).emit('forceLogout');

  res.json({ message: 'Logged out all users' });
};
