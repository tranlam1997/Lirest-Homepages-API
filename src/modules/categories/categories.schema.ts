import Joi from 'joi';

const CategorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});
