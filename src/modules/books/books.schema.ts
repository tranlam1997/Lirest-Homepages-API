import { JSONSchemaType } from 'ajv';
import { CreateBookDto } from './books.dto';
import ajv from '../../common/validator-config.common';

const BookSchema: JSONSchemaType<CreateBookDto> = {
  type: 'object',
  properties: {
    title: { type: 'string', minLength: 1, maxLength: 100, nullable: true },
    author: { type: 'string', nullable: true },
    description: { type: 'string', nullable: true },
    ISBN: { type: 'string', nullable: true },
    price: { type: 'number', nullable: true },
    quantity: { type: 'number', nullable: true },
  },
  additionalProperties: true,
};

export default ajv.compile(BookSchema);
