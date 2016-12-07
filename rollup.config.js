const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');

module.exports = {
	rollup: {
		entry: 'src/index.js',
		plugins: [
			babel({
				babelrc: false,
				presets: [
					['es2015', { loose:true, modules:false }],
					'stage-0'
				],
				plugins: [
					'external-helpers',
					['transform-react-jsx', { pragma:'h' }]
				]
			}),
			nodeResolve({ jsnext:true }),
			commonjs()
		]
	},
	bundle: {
		dest: 'build/app.js',
		format: 'iife',
		sourceMap: true,
	}
};
