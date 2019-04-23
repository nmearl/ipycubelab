const path = require('path');
const version = require('./package.json').version;
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// Custom webpack rules
const rules = [
  { test: /\.ts$/, loader: 'ts-loader' },
  { test: /\.js$/, loader: 'source-map-loader' },
  { test: /\.css$/, use: ['style-loader', 'css-loader']},
  {
      test: /\.(png|jpg|jpeg|gif|svg)(\?.*)?$/,
      use: [
          'url-loader?name=assets/[name].[ext]',
      ]
  },
  {
    test: /\.vue$/,
    loader: 'vue-loader',
    options: {
      loaders: {
        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
        // the "scss" and "sass" values for the lang attribute to the right configs here.
        // other preprocessors should work out of the box, no loader config like this necessary.
        'scss': 'vue-style-loader!css-loader!sass-loader',
        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
      }
      // other vue-loader options go here
    }
  }
];

// Packages that shouldn't be bundled but loaded at runtime
const externals = ['@jupyter-widgets/base'];

const resolve = {
  // Add '.ts' and '.tsx' as resolvable extensions.
  extensions: [".webpack.js", ".web.js", ".ts", ".js", ".vue", "*"],
  alias: {
    'vue$': 'vue/dist/vue.esm.js'
  }
};

const plugins = [
  new VueLoaderPlugin(),
];

module.exports = [
  /**
   * Notebook extension
   *
   * This bundle only contains the part of the JavaScript that is run on load of
   * the notebook.
   */
  {
    entry: './src/extension.ts',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'ipycubelab', 'nbextension', 'static'),
      libraryTarget: 'amd'
    },
    module: {
      rules: rules
    },
    plugins,
    devtool: 'source-map',
    externals,
    resolve,
  },

  /**
   * Embeddable ipycubelab bundle
   *
   * This bundle is almost identical to the notebook extension bundle. The only
   * difference is in the configuration of the webpack public path for the
   * static assets.
   *
   * The target bundle is always `dist/index.js`, which is the path required by
   * the custom widget embedder.
   */
  {
    entry: './src/index.ts',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'amd',
        library: "ipycubelab",
        publicPath: 'https://unpkg.com/ipycubelab@' + version + '/dist/'
    },
    devtool: 'source-map',
    module: {
        rules: rules
    },
    plugins,
    externals,
    resolve,
  },


  /**
   * Documentation widget bundle
   *
   * This bundle is used to embed widgets in the package documentation.
   */
  {
    entry: './src/index.ts',
    output: {
      filename: 'embed-bundle.js',
      path: path.resolve(__dirname, 'docs', 'source', '_static'),
      library: "ipycubelab",
      libraryTarget: 'amd'
    },
    module: {
      rules: rules
    },
    plugins,
    devtool: 'source-map',
    externals,
    resolve,
  }

];
