// Here you can store configs for all components and plugins
{{#adaptive}}
export const adaptive = {
  'desktop': {
    // if: device.desktop,
    from: {
      width: 1007
    },
    setDevice: true
  },
  'desktop:wide': {
    rem: 10,
    from: {
      width: 1008
    }
  },
  'desktop:thin': {
    // if: device.desktop,
    // rem: 10,
    k: .75,
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
    },
    setDevice: true
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
    },
    setDevice: true
  }
}
{{#adaptive}}

{{#http}}
export const http = {
  credentials	: 'include',
  url					: 'https://api.stackexchange.com/2.2/search',
  method			: 'GET',
  mode        : 'no-cors',
  dataType    : 'form'
}
{{/http}}
