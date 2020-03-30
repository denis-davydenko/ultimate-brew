const autoprefixer = require('autoprefixer');
const postcssNested = require('postcss-nested');
const postcssMediaMinMax = require('postcss-media-minmax');

const plugins = [postcssNested, postcssMediaMinMax, autoprefixer];

module.exports = { plugins };
