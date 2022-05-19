import swaggerJSDoc from 'swagger-jsdoc';
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
        url: `http://{hostname}:{port}/{basePath}`,
        description: 'Lirest API Documentation',
        variables: {
          hostname: {
            default: 'localhost',
            description: 'This value is assigned by the service provider',
          },
          port: {
            default: '3000',
            description: 'This value is assigned by the service provider',
            enum: ['3000'],
          },
          basePath: {
            default: '',
            description: 'This value is assigned by the service provider',
          },
        },
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
