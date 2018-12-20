import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import es3 from 'rollup-plugin-es3';

export default {
	input: 'src/index.js',
	output: {
		dir: 'build',
		file: 'app.js',
		format: 'iife',
		sourceMap: true
	},
	external: [],
	plugins: [
		babel({
			babelrc: false,
			presets: [
				// 'es2015'
				// ['@babel/preset-env', { loose:true, modules:false }],
				// 'stage-0'
			],
			plugins: [
				...(process.env.ENABLE_HTM ? [
					['babel-plugin-jsx-pragmatic', {
						module: require('path').resolve(__dirname, 'src/html'),
						import: '_html'
					}],
					['babel-plugin-transform-jsx-to-tagged-templates', {
						tag: '_html'
					}]
				] : []),
				['@babel/plugin-proposal-class-properties', { loose: true }],
				// 'external-helpers',
				['@babel/plugin-transform-react-jsx', { pragma: 'h' }]
			]
		}),
		nodeResolve(),
		commonjs(),
		terser({
			compress: {
				pure_funcs: 'classCallCheck Object.defineProperty Object.freeze invariant warning'.split(' '),
				pure_getters: true,
				unsafe: true
			},
			mangle: {
				properties: {
					regex: /^(_|(handle|clear|toggle)([A-Z]|$))/
				}
			},
			output: {
				comments: false
			}
		}),
		es3()
	]
};
