const autoprefixer = require('autoprefixer');
const postcssNested = require('postcss-nested');
const postcssMediaMinMax = require('postcss-media-minmax');

const shared = [postcssNested, postcssMediaMinMax];
const plugins =
  process.env.NODE_ENV === 'production'
    ? [...shared, autoprefixer]
    : [...shared];

module.exports = { plugins };
