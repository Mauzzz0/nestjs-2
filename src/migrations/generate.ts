import dayjs from 'dayjs';
import fs from 'fs';
import path from 'path';

const name = process.argv[2];
if (!name) {
  throw Error('Migration name must be provided');
}

const ts = dayjs().format('YYYYMMDDHHmmss');
const src = path.resolve(__dirname, 'template.ts');
const dst = path.resolve(__dirname, 'migrations', `${ts}-${name}.ts`);

fs.copyFileSync(src, dst);

console.log('Generated new migration:', dst);
