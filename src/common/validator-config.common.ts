import Ajv from 'ajv';

export default new Ajv({
  allErrors: true,
  strict: true,
  verbose: true,
  timestamp: 'string',
  allowDate: true,
});
