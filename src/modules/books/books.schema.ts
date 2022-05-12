import Joi from 'joi';

const BookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  description: Joi.string().required(),
  ISBN: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
});
