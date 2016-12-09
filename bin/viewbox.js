const fs = require('fs');
const path = require('path');
const glob = require('glob');
const cheerio = require('cheerio');

const rootDir = path.join(__dirname, '..');

glob(`${rootDir}/svg/**/*.svg`, (err, files) => {
  files.forEach((filename) => {
    const iconName = path.basename(filename, '.svg');
    const svg = fs.readFileSync(filename, 'utf-8');
    const $ = cheerio.load(svg, {
      xmlMode: true,
    });
    const $svg = $('svg');
    console.log(`${$svg.attr('viewBox')}\t${iconName}`);    
  });
});
