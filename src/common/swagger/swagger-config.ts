import swaggerJSDoc, { Server, Tag } from 'swagger-jsdoc';
import { SwaggerUiOptions } from 'swagger-ui-express';
import fs from 'fs';

const customCss = fs.readFileSync('./src/common/swagger/swagger-ui-custom.css', 'utf8');

const oaS3Options: swaggerJSDoc.OAS3Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Lirest API',
      version: '0.1.0',
      description: 'API documentation for Lirest service',
      termsOfService: 'http://example.com/terms/',
      contact: {
        name: 'Support Team',
        url: 'http://www.exmaple.com/support',
        email: 'foet1997@gmail.com',
      },
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/',
      },
    },
    servers: [
      {
        url: `http://localhost:3000/api/v1`,
        description: 'Lirest API Documentation',
      },
    ],
    tags: [
      {
        name: 'User',
        description: 'User operations',
      },
      {
        name: 'Book',
        description: 'Book operations',
      },
      {
        name: 'Auth',
        description: 'Auth operations',
      },
      {
        name: 'Category',
        description: 'Category operations',
      },
    ],
  },
  apis: ['./src/routes/*.routes.ts'],
};

export const swaggerUIOptions: SwaggerUiOptions = {
  explorer: true,
  customCss: customCss,
  swaggerOptions: {
    validatorUrl: null,
    syntaxHighlight: {
      activate: false,
    },
  },
};

export const openAPISpecification = swaggerJSDoc(oaS3Options);
