import { ErrorRequestHandler } from 'express';

export const error: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  if (err.name === 'UnauthorizedError') {
    res.status(err.status).send({ message: err.message });
    return;
  }

  if (err?.meta?.body) {
    // eslint-disable-next-line
    console.error(JSON.stringify(err.meta.body, null, 2));
  } else {
    // eslint-disable-next-line
    console.error(err);
  }

  // Handle Boom Errors
  if (err.isBoom) {
    return res.status(err.output.statusCode).json(err.output.payload);
  }

  // Handle statusCode
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      message: err.message,
      error: err.name,
      statusCode: err.statusCode,
    });
  }

  res.status(500);
  return res.json({ error: err.message });
};
