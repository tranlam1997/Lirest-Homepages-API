import express from 'express';
import Joi from 'joi';

export const validateRequestData = (schema: Joi.ObjectSchema<any>) => {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
        status: 400,
      });
    }
    next();
  };
};
