import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const assetsDir = join(__dirname, '../src/assets');

const files = await readdir(assetsDir);
const pngs = files.filter(f => extname(f).toLowerCase() === '.png');

console.log(`Convertendo ${pngs.length} arquivo(s) PNG → WebP...\n`);

for (const file of pngs) {
  const input = join(assetsDir, file);
  const output = join(assetsDir, basename(file, '.png') + '.webp');

  const before = (await import('fs')).statSync(input).size;
  await sharp(input)
    .webp({ quality: 82, effort: 6 })
    .toFile(output);
  const after = (await import('fs')).statSync(output).size;

  const reduction = (((before - after) / before) * 100).toFixed(1);
  console.log(`  ${file} → ${basename(output)}`);
  console.log(`  ${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB  (-${reduction}%)\n`);
}

console.log('✅ Conversão concluída!');
