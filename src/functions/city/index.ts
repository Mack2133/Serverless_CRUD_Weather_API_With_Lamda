import { handlerPath } from '@libs/handler-resolver';
import schema from './schema';

const create = {
  handler: `${handlerPath(__dirname)}/create.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'city',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};

const fetch = {
  handler: `${handlerPath(__dirname)}/fetch.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'city/{cityName}',
      },
    },
  ],
};

export { create, fetch };
