
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./0x-sdk.cjs.production.min.js')
} else {
  module.exports = require('./0x-sdk.cjs.development.js')
}
