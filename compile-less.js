const less = require('less');
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const styles = require('./src/data/styles');

//paths
const cssDir = 'src/assets/static/css/';
const lessGlob = 'src/assets/less/**/*.less'

if (!fs.existsSync(cssDir)) {
  fs.mkdirSync(cssDir, { recursive: true });
  console.log(`Created CSS directory: ${cssDir}`);
}

//get file name slugs from styles data
let files = [];
for (let style of styles) {
  files.push(`src/assets/less/${style.slug}.less`);
}

const shouldWatch = process.argv.includes('--watch');

files.forEach(file => {
  const outputFilePath = path.join(cssDir, path.basename(file, '.less') + '.css');

  const compileLess = (filePath) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Failed to read ${filePath}: ${err}`);
        return;
      }

      less.render(data, { filename: filePath })
        .then(result => {
          fs.writeFile(outputFilePath, result.css, err => {
            if (err) {
              console.error(`Failed to write ${outputFilePath}: ${err}`);
              return;
            }
            console.log(`Compiled ${filePath} to ${outputFilePath}`);
          });
        })
        .catch(error => {
          console.error(`Error compiling ${filePath}: ${error}`);
        });
    });
  };

  if (shouldWatch) {
    // Watch file and recompile on changes
    chokidar.watch(lessGlob).on('change', () => {
      console.log(`Detected change in ${file}. Recompiling...`);
      compileLess(file);
    });
  }

  // Initial compilation
  compileLess(file);
});