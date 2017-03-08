const path = require("path")

exports.interfaceVersion = 2
exports.resolve = function (source, file, config) {
  const resolver = require(config.resolver || "eslint-import-resolver-node")

  for (const alias of Object.keys(config.alias || {})) {
    if (source.indexOf(alias) !== -1) {
      const fixed = source.replace(alias, config.alias[alias])
      const rel = path.relative(path.dirname(file), fixed)
      return resolver.resolve(rel, file, config)
    }
  }

  return resolver.resolve(source, file, config)
}
