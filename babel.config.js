module.exports = {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' }, modules: 'auto' }],
      ['@babel/preset-react', { targets: { node: 'current' }, modules: 'auto' }],
    ],

    plugins: [
        ['@babel/transform-runtime', { targets: { node: 'current' }, modules: 'auto' }]]
};