import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagesDir = path.resolve(__dirname, '../public/images');

// Helper to iteratively achieve target size while maintaining maximum visual quality
async function compressToTarget(inputBufferOrPath, initialOptions, targetBytes) {
  let quality = initialOptions.quality || 76;
  let width = initialOptions.width;
  let bestBuffer = null;

  while (quality >= 38) {
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
    if (quality < 55 && width && width > 420) {
      width = Math.round(width * 0.94);
    }
  }
  return { buffer: bestBuffer, finalQuality: quality, finalWidth: width };
}

async function optimizeImages() {
  console.log('[optimize-images] Starting image optimization in:', imagesDir);

  // 1. Hero Banner
  console.log('1. Optimizing Hero Banner...');
  const heroSrc = path.join(imagesDir, 'hero-banner-v3.png');
  const heroDesktopPath = path.join(imagesDir, 'hero-banner-v3.webp');
  const heroMobilePath = path.join(imagesDir, 'hero-banner-v3-mobile.webp');
  if (fs.existsSync(heroSrc)) {
    // Desktop WebP (width 1360, quality 78, target size < 110 KB)
    const { buffer: desktopBuf } = await compressToTarget(
      heroSrc,
      { width: 1360, quality: 78 },
      110 * 1024
    );
    fs.writeFileSync(heroDesktopPath, desktopBuf);
    console.log(`  -> Generated hero-banner-v3.webp: ${(fs.statSync(heroDesktopPath).size / 1024).toFixed(1)} KB`);

    // Mobile WebP (width 680, quality 62, effort 6, target size: 18-22 KiB)
    const { buffer: mobileBuf } = await compressToTarget(
      heroSrc,
      { width: 680, quality: 62 },
      22 * 1024
    );
    fs.writeFileSync(heroMobilePath, mobileBuf);
    console.log(`  -> Generated hero-banner-v3-mobile.webp: ${(fs.statSync(heroMobilePath).size / 1024).toFixed(1)} KB`);
  } else if (fs.existsSync(heroDesktopPath)) {
    console.log(`  -> hero-banner-v3.webp already optimized (${(fs.statSync(heroDesktopPath).size / 1024).toFixed(1)} KB)`);
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
      maxWidth: 600,
      quality: 70,
      targetKB: 20, // Under 20 KiB as specified
    },
    {
      src: 'non-ac room2 view2.jpg',
      dest: 'non-ac-room2-view2.webp',
      maxWidth: 600,
      quality: 70,
      targetKB: 20, // Under 20 KiB as specified
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
    } else if (fs.existsSync(destPath)) {
      console.log(`  -> ${item.dest} already optimized (${(fs.statSync(destPath).size / 1024).toFixed(1)} KB)`);
    } else {
      console.warn(`  ! Source not found: ${item.src}`);
    }
  }

  // 4. Resize & Recompress Attraction .webp Cards in-place
  console.log('4. Resizing & Recompressing Attraction Cards in-place...');
  const attractionCards = [
    { file: 'thiruvithancode-arappally.webp', width: 500, quality: 68, targetKB: 18 },
    { file: 'padmanabhapuram.webp', width: 500, quality: 68, targetKB: 18 },
    { file: 'thirparappu-waterfalls.webp', width: 500, quality: 68, targetKB: 18 },
    { file: 'mathur-aqueduct.webp', width: 560, quality: 70, targetKB: 28 },
    { file: 'church-of-ascension.webp', width: 560, quality: 70, targetKB: 24 },
    { file: 'muttom-beach.webp', width: 560, quality: 70, targetKB: 24 },
  ];

  for (const item of attractionCards) {
    const filePath = path.join(imagesDir, item.file);
    if (fs.existsSync(filePath)) {
      const inputBuffer = fs.readFileSync(filePath);
      const { buffer } = await compressToTarget(
        inputBuffer,
        { width: item.width, quality: item.quality },
        item.targetKB * 1024
      );
      fs.writeFileSync(filePath, buffer);
      console.log(`  -> Recompressed ${item.file}: ${(fs.statSync(filePath).size / 1024).toFixed(1)} KB`);
    } else {
      console.warn(`  ! Attraction image not found: ${item.file}`);
    }
  }

  console.log('[optimize-images] All image optimizations successfully completed.');
}

optimizeImages().catch((err) => {
  console.error('[optimize-images] Error:', err);
  process.exit(1);
});
