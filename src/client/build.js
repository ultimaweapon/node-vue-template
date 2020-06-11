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
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    process.exit(1);
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error(info.errors);
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }

  if (stats.hasErrors() || stats.hasWarnings()) {
    process.exit(1);
  }
});
