const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { default: mergedirs } = require('merge-dirs');

const inputs = 'outputs';

// get arguments
let dest = process.argv[2];
let source = process.argv[3];

if (!dest || !source) {
  console.error(`usage: node ${__filename} DEST SOURCE`);
  process.exit(1);
}

dest = path.resolve(dest);
source = path.resolve(source);

// publish
const prefix = path.resolve(__dirname, inputs);

mergedirs(path.resolve(prefix, 'server'), dest);
mergedirs(path.resolve(prefix, 'commons'), dest);

// fixup sourcemap
glob(__dirname.replace(/\\/g, '/') + `/${inputs}/**/*.js.map`, function (err, files) {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  for (const file of files) {
    fixSourceMap(file);
  }
});

/**
 * @param {string} file
 */
function fixSourceMap(file) {
  const relative = file.substring(prefix.length + 1); // strip __dirname/outputs/
  const output = path.join(dest, relative.substring(relative.indexOf('/') + 1)); // dest/?/a.js.map -> dest/a.js.map
  const map = JSON.parse(fs.readFileSync(output, 'utf8'));

  map.sources[0] = path.relative(path.dirname(output), path.join(source, relative)).slice(0, -7) + '.ts';

  fs.writeFileSync(output, JSON.stringify(map));
}
