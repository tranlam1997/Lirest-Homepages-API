import basicAuth from 'express-basic-auth';
import config from 'config';

export default basicAuth({
  challenge: true,
  users: {
    [config.get('api-docs.username') as string]: config.get('api-docs.password'),
  },
});
