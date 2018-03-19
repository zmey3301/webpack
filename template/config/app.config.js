// Here you can store configs for all components and plugins
{{#adaptive}}
export const adaptive = {
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
    },
    k: 1,
    base: {
      width: 752
    }
  },
  'mobile': {
    rem: 10,
    from: {
      width: 305
    },
    to: {
      width: 751
    },
    k: 1,
      base: {
      width: 305
    }
  }
}
{{/adaptive}}

{{#http}}
export const http = {
  credentials	: 'same-origin',
  url					: 'https://api.stackexchange.com/2.2/search',
  method			: 'GET',
  mode        : 'no-cors',
  dataType    : 'form'
}
{{/http}}
