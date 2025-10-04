const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  try {
    const projectRoot = path.resolve(__dirname, '..');
    const htmlPath = path.resolve(projectRoot, 'cv.html');
    const distDir = path.resolve(projectRoot, 'dist');
    const pdfPath = path.resolve(distDir, 'nikolay-stoyanov-cv.pdf');

    if (!fs.existsSync(htmlPath)) {
      throw new Error(`HTML file not found at ${htmlPath}`);
    }

    fs.mkdirSync(distDir, { recursive: true });

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true,
    });

    const page = await browser.newPage();

    // Prefer quick load to avoid waiting on external CDNs
    await page.goto('file://' + htmlPath, { waitUntil: 'networkidle2' });
    await page.emulateMediaType('screen');

    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
    });

    await browser.close();

    console.log(`PDF generated at: ${pdfPath}`);
  } catch (err) {
    console.error('Failed to render PDF:', err);
    process.exit(1);
  }
})();
