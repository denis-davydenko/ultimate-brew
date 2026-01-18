import autoprefixer from 'autoprefixer';
import postcssNested from 'postcss-nested';
import postcssMediaMinMax from 'postcss-media-minmax';
import postcssViewportHeightCorrection from 'postcss-viewport-height-correction';

export default {
  plugins: [postcssNested, postcssMediaMinMax, postcssViewportHeightCorrection, autoprefixer]
};
