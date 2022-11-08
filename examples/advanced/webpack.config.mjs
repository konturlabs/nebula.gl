// NOTE: To use this example standalone (e.g. outside of deck.gl repo)
// delete the local development overrides at the bottom of this file
import { resolve } from 'node:path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import DotEnvPlugin from 'dotenv-webpack';

const CONFIG = {
  mode: 'development',

  devtool: 'source-map',
  devServer: {
    static: './dist',
  },
  entry: {
    app: resolve('./src/app.tsx'),
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  optimization: {
    runtimeChunk: 'single',
  },
  stats: 'minimal',
  module: {
    rules: [
      {
        // Compile ES2015 using babel
        test: /\.tsx?$/,
        include: [resolve('.'), resolve('../../modules')],
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          // options in .babelrc
        },
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: 'asset/inline',
      },
    ],
  },

  // Optional: Enables reading mapbox token from environment variable
  plugins: [
    new HtmlWebpackPlugin({ title: 'nebula.gl' }),
    new DotEnvPlugin({
      path: resolve('..', '..', '.env'),
    }),
  ],
};

// This line enables bundling against src in this repo rather than installed module
export default async (env) => {
  if (env && env.local) {
    const { default: loader } = await import('../webpack.config.local.mjs');
    const localConfigFabric = loader(CONFIG);
    return localConfigFabric(env);
  }
  return CONFIG;
};
