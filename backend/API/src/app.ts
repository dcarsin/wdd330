import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';

import { Application } from 'express';

const app: Application = createExpressServer({
  cors: true,
  routePrefix: '/api',
  defaultErrorHandler: false,
  middlewares: [__dirname + '/middlewares/**/*{.ts,.js}'],
  controllers: [__dirname + '\\controllers\\MembersController.ts'],
  classTransformer: true,
});

export default app;
