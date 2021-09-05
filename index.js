const { createFilter } = require("rollup-pluginutils");

function string(opts = {}) {
  if (!opts.include) {
    throw Error("include option should be specified");
  }

  const filter = createFilter(opts.include, opts.exclude);

  return {
    name: "string",

    transform(code, id) {
      if (filter(id)) {
        return {
          code: `export default ${JSON.stringify(opts.removeBOM && code.charCodeAt(0) === 0xFEFF ? code.slice(1) : code)};`,
          map: { mappings: "" }
        };
      }
    }
  };
}

exports.string = string;
