// Here you can store configs for all components and plugins
module.exports.styleImports = {
  /*
  * You can use string or array of string.
  * String can starts with @ - that means that path is relative to src folder (vue root).
  * Or you can write relative path from build directory
  * !Warning: It is better to use arrays instead of one file with imports 'cause imports will slow down build.
  * Imported files must contain ONLY preprocessor info (variables, mixins, e.t.c.)
  ********************************************************************************************
  * stylus: [],
  * less: '@assets/less/style.less'
  * sass: '../src/assets/sass/style.sass'
   */
}
{{#adaptive}}
module.exports.adaptive = {
  'desktop:wide': {
    rem: 10,
    from: {
      width: 1352
    }
  },
  'desktop:thin': {
    k: .75,
    from: {
      width: 1008
    },
    base: {
      width: 1008
    },
    to: {
      width: 1351
    },
  },
  'tablet': {
    rem: 10,
    from: {
      width: 752
    },
    to: {
      width: 1008
    }
  },
  'mobile': {
    rem: 10,
    from: {
      width: 305
    },
    to: {
      width: 751
    }
  }
}
{{/adaptive}}

{{#http}}
module.exports.http = {
  credentials	: 'same-origin',
  url					: 'https://api.stackexchange.com/2.2/search',
  method			: 'GET',
  mode        : 'no-cors',
  dataType    : 'form'
}
{{/http}}
