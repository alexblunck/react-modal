const path = require('path')

module.exports = function (env, argv) {
    let devtool

    if (argv.mode === 'development') {
        devtool = 'sourcemap'
    }

    return {
        output: {
            path: path.resolve(__dirname, 'lib'),
            filename: `react-modal.js`,
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
                }
            ]
        },
        externals: [
            'classnames',
            'isolated-scroll',
            'perfect-scrollbar',
            'prop-types',
            'react'
        ]
    }
}
