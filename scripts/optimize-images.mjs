import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagesDir = path.resolve(__dirname, '../public/images');

// Helper to iteratively achieve target size if needed while maintaining maximum quality
async function compressToTarget(inputBufferOrPath, initialOptions, targetBytes) {
  let quality = initialOptions.quality || 76;
  let width = initialOptions.width;
  let bestBuffer = null;

  while (quality >= 40) {
    const pipeline = sharp(inputBufferOrPath);
    if (width) {
      pipeline.resize({ width, height: initialOptions.height, fit: initialOptions.fit || 'inside', withoutEnlargement: true });
    }
    const buf = await pipeline.webp({ quality, effort: 6 }).toBuffer();
    bestBuffer = buf;
    if (buf.length <= targetBytes) {
      return { buffer: buf, finalQuality: quality, finalWidth: width };
    }
    quality -= 3;
    if (quality < 55 && width && width > 520) {
      width = Math.round(width * 0.92);
    }
  }
  return { buffer: bestBuffer, finalQuality: quality, finalWidth: width };
}

async function optimizeImages() {
  console.log('[optimize-images] Starting image optimization in:', imagesDir);

  // 1. Hero Banner
  console.log('1. Optimizing Hero Banner...');
  const heroSrc = path.join(imagesDir, 'hero-banner-v3.png');
  if (fs.existsSync(heroSrc)) {
    // Desktop WebP (width 1360, quality 78, target size < 110 KB)
    const heroDesktopPath = path.join(imagesDir, 'hero-banner-v3.webp');
    const { buffer: desktopBuf } = await compressToTarget(
      heroSrc,
      { width: 1360, quality: 78 },
      110 * 1024
    );
    fs.writeFileSync(heroDesktopPath, desktopBuf);
    console.log(`  -> Generated hero-banner-v3.webp: ${(fs.statSync(heroDesktopPath).size / 1024).toFixed(1)} KB`);

    // Mobile WebP (width 768, quality 76, target size < 55 KB)
    const heroMobilePath = path.join(imagesDir, 'hero-banner-v3-mobile.webp');
    const { buffer: mobileBuf } = await compressToTarget(
      heroSrc,
      { width: 768, quality: 76 },
      55 * 1024
    );
    fs.writeFileSync(heroMobilePath, mobileBuf);
    console.log(`  -> Generated hero-banner-v3-mobile.webp: ${(fs.statSync(heroMobilePath).size / 1024).toFixed(1)} KB`);
  }

  // 2. Logo
  console.log('2. Optimizing Logo...');
  const logoSrc = path.join(imagesDir, 'logo.png');
  if (fs.existsSync(logoSrc)) {
    const logoWebpPath = path.join(imagesDir, 'logo.webp');
    const logoWebpBuf = await sharp(logoSrc)
      .resize({ width: 128, height: 128, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ quality: 85, effort: 6 })
      .toBuffer();
    fs.writeFileSync(logoWebpPath, logoWebpBuf);
    console.log(`  -> Generated logo.webp: ${(fs.statSync(logoWebpPath).size / 1024).toFixed(1)} KB`);

    // Overwrite 128x128 logo.png for schema / OpenGraph compatibility
    const logoPngBuf = await sharp(logoSrc)
      .resize({ width: 128, height: 128, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9, effort: 10 })
      .toBuffer();
    fs.writeFileSync(logoSrc, logoPngBuf);
    console.log(`  -> Resized logo.png: ${(fs.statSync(logoSrc).size / 1024).toFixed(1)} KB`);
  }

  // 3. Convert & Resize Large JPEGs to WebP
  console.log('3. Converting Large JPEGs to WebP...');
  const jpegConversions = [
    {
      src: 'simple-comforts.jpg',
      dest: 'simple-comforts.webp',
      maxWidth: 700,
      quality: 76,
      targetKB: 55,
    },
    {
      src: 'the-space.jpg',
      dest: 'the-space.webp',
      maxWidth: 800,
      quality: 76,
      targetKB: 55,
    },
    {
      src: 'ac-room1.jpg',
      dest: 'ac-room1.webp',
      maxWidth: 720,
      quality: 76,
      targetKB: 45,
    },
    {
      src: 'non-ac room2 view2.jpg',
      dest: 'non-ac-room2-view2.webp',
      maxWidth: 720,
      quality: 76,
      targetKB: 40,
    },
  ];

  for (const item of jpegConversions) {
    const srcPath = path.join(imagesDir, item.src);
    const destPath = path.join(imagesDir, item.dest);
    if (fs.existsSync(srcPath)) {
      const { buffer } = await compressToTarget(
        srcPath,
        { width: item.maxWidth, quality: item.quality },
        item.targetKB * 1024
      );
      fs.writeFileSync(destPath, buffer);
      console.log(`  -> Generated ${item.dest}: ${(fs.statSync(destPath).size / 1024).toFixed(1)} KB`);
    } else {
      console.warn(`  ! Source not found: ${item.src}`);
    }
  }

  // 4. Resize & Recompress Attraction .webp Cards in-place
  console.log('4. Resizing & Recompressing Attraction Cards in-place (target < 35 KB)...');
  const attractionCards = [
    'thiruvithancode-arappally.webp',
    'padmanabhapuram.webp',
    'mathur-aqueduct.webp',
    'church-of-ascension.webp',
    'thirparappu-waterfalls.webp',
    'muttom-beach.webp',
  ];

  for (const file of attractionCards) {
    const filePath = path.join(imagesDir, file);
    if (fs.existsSync(filePath)) {
      const inputBuffer = fs.readFileSync(filePath);
      const { buffer } = await compressToTarget(
        inputBuffer,
        { width: 680, quality: 74 },
        35 * 1024
      );
      fs.writeFileSync(filePath, buffer);
      console.log(`  -> Recompressed ${file}: ${(fs.statSync(filePath).size / 1024).toFixed(1)} KB`);
    } else {
      console.warn(`  ! Attraction image not found: ${file}`);
    }
  }

  console.log('[optimize-images] All image optimizations successfully completed.');
}

optimizeImages().catch((err) => {
  console.error('[optimize-images] Error:', err);
  process.exit(1);
});

