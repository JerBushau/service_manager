var webpack = require('webpack'),
       path = require('path');

module.exports = {
    context: path.resolve(__dirname , 'app'),
    entry: {
        app: './app.js',
        vendor: ['angular']
    },
    output: {
        path: path.resolve(__dirname, 'public/scripts'),
        filename: 'call.bundle.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: "vendor.bundle.js"})
    ]
};
