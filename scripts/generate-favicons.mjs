import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const faviconsDir = resolve(__dirname, '../src/assets/favicons');
const svgPath = resolve(faviconsDir, 'favicon.svg');
const svgBuffer = readFileSync(svgPath);

const renderPng = (size) =>
  sharp(svgBuffer, { density: Math.max(72, size * 4) })
    .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();

// Apple Touch Icon: 180x180 with white background (Apple recommends opaque)
const appleBuffer = await sharp(svgBuffer, { density: 720 })
  .resize(160, 160, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
  .extend({ top: 10, bottom: 10, left: 10, right: 10, background: { r: 255, g: 255, b: 255, alpha: 1 } })
  .png()
  .toBuffer();
writeFileSync(resolve(faviconsDir, 'apple-touch-icon.png'), appleBuffer);
console.log('✓ apple-touch-icon.png (180x180)');

// favicon.ico: multi-size ICO (16, 32, 48) with PNG-embedded entries
const sizes = [16, 32, 48];
const pngBuffers = await Promise.all(sizes.map(renderPng));

const numImages = sizes.length;
const headerSize = 6;
const dirEntrySize = 16;
const offsets = [];
let currentOffset = headerSize + numImages * dirEntrySize;
for (const buf of pngBuffers) {
  offsets.push(currentOffset);
  currentOffset += buf.length;
}

const totalSize = currentOffset;
const ico = Buffer.alloc(totalSize);
ico.writeUInt16LE(0, 0); // reserved
ico.writeUInt16LE(1, 2); // type: 1 = ICO
ico.writeUInt16LE(numImages, 4);

for (let i = 0; i < numImages; i++) {
  const dirOff = headerSize + i * dirEntrySize;
  const size = sizes[i];
  ico.writeUInt8(size === 256 ? 0 : size, dirOff + 0);
  ico.writeUInt8(size === 256 ? 0 : size, dirOff + 1);
  ico.writeUInt8(0, dirOff + 2); // colors in palette
  ico.writeUInt8(0, dirOff + 3); // reserved
  ico.writeUInt16LE(1, dirOff + 4); // color planes
  ico.writeUInt16LE(32, dirOff + 6); // bits per pixel
  ico.writeUInt32LE(pngBuffers[i].length, dirOff + 8);
  ico.writeUInt32LE(offsets[i], dirOff + 12);
}

for (let i = 0; i < numImages; i++) {
  pngBuffers[i].copy(ico, offsets[i]);
}

writeFileSync(resolve(faviconsDir, 'favicon.ico'), ico);
console.log(`✓ favicon.ico (${sizes.join(', ')})`);
