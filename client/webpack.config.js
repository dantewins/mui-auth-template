module.exports = {
    enforce: 'pre',
    include: paths.appSrc,
    test: /\.(js|jsx|mjs)$/,
    use: [{
        loader: require.resolve('eslint-loader'),
        options: {
            formatter: eslintFormatter,
            eslintPath: require.resolve('eslint'),
            emitWarning: true,
        },
    }],
};