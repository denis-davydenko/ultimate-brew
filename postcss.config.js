const plugins =
  process.env.NODE_ENV === 'production'
    ? ['autoprefixer']
    : [];

module.exports = { plugins };