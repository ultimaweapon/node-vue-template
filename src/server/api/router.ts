import { IRouter, Router } from 'express';
import * as message from './message';

export function create(): IRouter {
  const router = Router();

  router.get('/message', message.get);

  return router;
}
