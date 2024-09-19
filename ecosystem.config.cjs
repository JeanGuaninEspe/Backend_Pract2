require('@babel/register')({
  presets: ['@babel/preset-env']
});

module.exports = {
  apps: [{
    script: 'src/index.js',
    watch: ["src"],
    ignore_watch: ["uploads"],
  }]
};
