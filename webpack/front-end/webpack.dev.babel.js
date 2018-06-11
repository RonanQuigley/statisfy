import webpack from 'webpack';
import merge from 'webpack-merge';
import common from './webpack.common.babel';

const dev = {
    mode: 'development',
    entry: {
        dev: ['./src/client/dev'],
        index: [
            'webpack-hot-middleware/client',
            'whatwg-fetch',
            './src/client/pages/index/'
        ],
        results: [
            'webpack-hot-middleware/client',
            'whatwg-fetch',
            './src/client/pages/results/'
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.EnvironmentPlugin({
            // we use this for hot reloading the client
            NODE_ENV: process.env.NODE_ENV
        })
    ]
};

export default merge(common, dev);
