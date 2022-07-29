import express from 'express';
import { expressLogger } from 'src/common/logger-config';

export const UtilityHandlerMiddlewares = [express.json(), expressLogger];
