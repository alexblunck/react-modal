const path = require('path')
const pkg = require('./package.json')

module.exports = function (env, argv) {
    const pkgName = pkg.name.split('/').reverse()[0]

    let devtool

    if (argv.mode === 'development') {
        devtool = 'sourcemap'
    }

    return {
        output: {
            path: path.resolve(__dirname, 'lib'),
            filename: `${pkgName}.js`,
            library: 'reactModal',
            libraryTarget: 'umd'
        },
        devtool: devtool,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                },
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'postcss-loader',
                        'sass-loader'
                    ]
                }
            ]
        },
        externals: [
            'react',
            'classnames',
            'prop-types',
            'perfect-scrollbar',
            'isolated-scroll'
        ]
    }
}
