const path = require('path');
const webpack = require('webpack');
const config = require('./webpack-config');

const output = process.argv[2];

if (!output) {
  console.error(`usage: node ${__filename} OUTDIR`);
  process.exit(1);
}

config.output.path = path.resolve(output);

webpack(config, (err, stats) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(stats.toString({ chunks: false, colors: true }));

  if (stats.hasErrors()) {
    process.exit(1);
  }
});
