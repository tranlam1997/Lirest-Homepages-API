import { readFileSync } from 'fs';
import { join } from 'path';
import { compile } from 'handlebars';

export function compileTemplate(path: string) {
  const template = readFileSync(join(process.cwd(), `/src/templates/${path}`), 'utf8');
  return compile(template);
}
