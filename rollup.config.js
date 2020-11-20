import babel from "@rollup/plugin-babel";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy'

export default {
  input: "src/playground.js",
  output: [
    {
      file: 'dist/playground.js',
      format: "iife",
      sourcemap: false,
      globals: {
        Inferno: 'Inferno'
      }
    }
  ],
  plugins: [
    copy({
      targets: [
        { src: 'public/*', dest: 'dist' }
      ]
    }),
    nodeResolve({
      browser: true,
    }),
    commonjs({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
      include: 'node_modules/*/**'
    }),
    postcss({
      babelrc: false,
      plugins: [],
      extract: true,
      minimize: true,
      sourceMap: false,
      babelHelpers: 'runtime'
    }),
    babel({
      "presets": [
        [
          "@babel/preset-env",
          {
            "loose": true,
            "modules": false
          }
        ]
      ],
      "plugins": [
        "@babel/plugin-syntax-jsx",
        [
          "babel-plugin-inferno",
          {
            "imports": true
          }
        ]
      ]
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    // terser()
  ]
};