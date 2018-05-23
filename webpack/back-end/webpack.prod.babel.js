import webpack from 'webpack';
import merge from 'webpack-merge';
import common from './webpack.common';

const prod = {
    mode: 'production',
    entry: './src/index',
    optimization: {
        minimize: false
    },
    plugins: [
        // need to specify NODE_ENV otherwise it will show undefined in code
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production'
        })
    ]
};

export default merge(common, prod);
