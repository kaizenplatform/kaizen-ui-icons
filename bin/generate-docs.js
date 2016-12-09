const fs = require('fs');
const glob = require('glob');
const path = require('path');
const pug = require('pug');
const svgData = [];

const rootDir = path.join(__dirname, '..');

glob(`${rootDir}/svg/**/*.svg`, (err, files) => {
  files.forEach((filename) => {
    const iconName = path.basename(filename, '.svg');
    const svg = fs.readFileSync(filename, 'utf-8');
    svgData.push({
      iconName,
      svg,
    });
  });

  const html = pug.renderFile(`${rootDir}/docs/index.pug`, { svgData: svgData });
  fs.writeFileSync(`${rootDir}/docs/index.html`, html, 'utf-8');
});
