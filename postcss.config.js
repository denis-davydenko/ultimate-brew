const autoprefixer = require('autoprefixer');
const postcssNested = require('postcss-nested');
const postcssMediaMinMax = require('postcss-media-minmax');
const postcssViewportHeightCorrection = require('postcss-viewport-height-correction');

const plugins = [
  postcssNested,
  postcssMediaMinMax,
  postcssViewportHeightCorrection,
  autoprefixer
];

module.exports = { plugins };
