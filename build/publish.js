const fs = require('fs');
const path = require('path');
const babelParser = require('@babel/parser');
const glob = require('glob');
const { default: mergedirs } = require('merge-dirs');
const sourcemap = require('sourcemap-codec');

const inputs = 'outputs';

// get arguments
let dest = process.argv[2];
let source = process.argv[3];
const rootAlias = process.argv[4];

if (!dest || !source || !rootAlias) {
  console.error(`usage: node ${__filename} DEST SOURCE ROOTALIAS`);
  process.exit(1);
}

dest = path.resolve(dest);
source = path.resolve(source);

// publish
const prefix = path.resolve(__dirname, inputs);

mergedirs(path.resolve(prefix, 'server'), dest);
mergedirs(path.resolve(prefix, 'commons'), dest);

// fixup outputs
glob(__dirname.replace(/\\/g, '/') + `/${inputs}/**/*.js`, function (err, files) {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  for (const file of files) {
    fixOutput(file);
  }
});

/**
 * @param {string} origin
 */
function fixOutput(origin) {
  const relative = origin.substring(prefix.length + 1); // strip __dirname/outputs/
  const output = path.join(dest, relative.substring(relative.indexOf('/') + 1)); // dest/?/a.js -> dest/a.js

  console.log(`post-processing ${output}`);

  // parse ast and sourcemap
  let js = fs.readFileSync(output, 'utf8');
  const ast = babelParser.parse(js, { sourceType: 'script', tokens: true });
  const map = JSON.parse(fs.readFileSync(output + '.map', 'utf8'));
  const mappings = sourcemap.decode(map.mappings);

  // fix import alias and sourcemap
  const imports = findImports(ast.tokens);

  for (const i of imports.reverse()) {
    if (!i.value.startsWith(rootAlias)) {
      continue;
    }

    const loc = i.loc;
    const segments = mappings[loc.start.line-1];
    let rewrite = path.relative(
      path.dirname(output),
      path.join(dest, i.value.substring(rootAlias.length).replace(/\//g, path.sep))
    ).replace(/\\/g, '/');

    if (rewrite.charAt(0) !== '.') {
      rewrite = './' + rewrite;
    }

    js = js.substring(0, i.start) + JSON.stringify(rewrite) + js.substring(i.end);

    for (const s of segments) {
      if (s[0] <= loc.start.column) {
        continue;
      }
      s[0] += rewrite.length - i.value.length;
    }
  }

  map.sources[0] = path.relative(path.dirname(output), path.join(source, relative)).slice(0, -3) + '.ts';
  map.mappings = sourcemap.encode(mappings);

  // update file
  fs.writeFileSync(output, js);
  fs.writeFileSync(output + '.map', JSON.stringify(map));
}

function findImports(tokens) {
  const imports = [];

  for (let i = 0; i < tokens.length; i++) {
    const start = tokens[i];
    if (start.value !== 'require' || start.type.label !== 'name' || !start.type.startsExpr) {
      continue;
    }

    const name = tokens[i+2];
    if (!name) {
      break; // end of source
    }

    if (tokens[i+1].type.label != '(' || !tokens[i+1].type.beforeExpr) {
      continue;
    }

    if (name.type.label !== 'string' || !name.type.startsExpr) {
      continue;
    }

    imports.push(name);
    i += 2;
  }

  return imports;
}
