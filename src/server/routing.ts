import { IRouter } from 'express';
import { createRouter as createApiRouter } from './api';
import { Path } from './app-config';

export function configure(router: IRouter) {
  router.use(Path.Api, createApiRouter());
}
