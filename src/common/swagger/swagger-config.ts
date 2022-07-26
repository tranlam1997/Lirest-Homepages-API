import swaggerJSDoc from 'swagger-jsdoc';
import { SwaggerUiOptions } from 'swagger-ui-express';
import fs from 'fs';
import config from 'config';

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
        url: `https://${process.env.HOST || config.get('service.host')}:${
          process.env.PORT || config.get('service.port')
        }${config.get('service.baseUrl')}`,
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
  apis: ['./src/api-docs/**/*.yaml'],
};

export const swaggerUIOptions: SwaggerUiOptions = {
  explorer: true,
  customCss,
  swaggerOptions: {
    validatorUrl: null,
    syntaxHighlight: {
      activate: false,
    },
  },
};

export const openAPISpecification = swaggerJSDoc(oaS3Options);
