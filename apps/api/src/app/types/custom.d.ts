// custom_typings/express/index.d.ts
declare namespace Express {
  interface Request {
    token: string;
    user: Record<string, any>;
  }
}
