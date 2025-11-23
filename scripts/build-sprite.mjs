import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import svgstore from 'svgstore';
import { optimize } from 'svgo';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logosDir = path.resolve(__dirname, '..', 'assets', 'svg-purple-logos');
const outDir = path.resolve(__dirname, '..', 'assets');
const outFile = path.join(outDir, 'sprite.svg');

const files = readdirSync(logosDir)
  .filter((file) => file.toLowerCase().endsWith('.svg'))
  .sort();

if (!files.length) {
  console.error(`No SVG files found in ${logosDir}`);
  process.exit(1);
}

const sprite = svgstore({ inline: true });

files.forEach((file) => {
  const raw = readFileSync(path.join(logosDir, file), 'utf8');
  const optimized = optimize(raw, {
    multipass: true,
    plugins: [
      'preset-default',
      {
        name: 'removeXMLNS',
      },
    ],
  });

  const id = file
    .replace(/\.svg$/i, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();

  sprite.add(id, optimized.data);
});

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, sprite.toString({ inline: true }), 'utf8');

console.log(`SVG sprite created at ${outFile}`);
