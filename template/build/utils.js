'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
const styleImports = require('../config/app.config').styleImports
const _ = require('lodash')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  let getPath = (assetPath) => assetPath.startsWith('@') ? path.resolve(__dirname, '../src', assetPath.substring(1)) : path.resolve(__dirname, assetPath)
  function loadImports (imports) {
    let result
    if (Array.isArray(imports)) {
      let assets = []
      _.forEach(imports, function(asset) {
        assets.push(getPath(asset))
      })
      result = assets
    } else {
      result = getPath(imports)
    }
    return result
  }
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaderOptions = _.assign(loaderOptions || {}, {
        sourceMap: options.sourceMap
      })
      let importOptions = {}
      if (styleImports.hasOwnProperty(loader)) {
        let imports = loadImports(styleImports[loader])
        switch (loader) {
          case 'stylus':
            importOptions.import = imports
            loaderOptions = _.assign(loaderOptions, importOptions)
            break
          case 'sass':
            if (typeof loaderOptions === 'undefined' || !loaderOptions.indentedSyntax) {
              imports = styleImports.hasOwnProperty('scss') ? loadImports(styleImports.scss) : []
            }
            importOptions.resources = imports
            break
          case 'less':
            importOptions.patterns = imports
            break
        }
      }
      loaders.push({
        loader: loader + '-loader',
        options: loaderOptions
      })
      if (loader !== 'stylus' && !_.isEmpty(importOptions)) {
        loaders.push({
          loader: loader === 'sass' ? 'sass-resource-loader' : 'styles-resource-loader',
          options: importOptions
        })
      }
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
