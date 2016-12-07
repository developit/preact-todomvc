const bs = require('browser-sync');
const rollup = require('rollup').rollup;
const cf = require('./rollup.config');

var isWatch = 0;
const out = 'build';
const node = 'node_modules';

exports.clean = function * () {
	yield this.clear(out);
}

exports.copies = function * () {
	yield this.source('src/index.html').target(out);
	yield this.source(`${node}/todomvc-common/base.*`).target(`${out}/todomvc`);
	yield this.source(`${node}/todomvc-app-css/*.css`).target(`${out}/todomvc`);
}

exports.build = function * () {
	yield this.serial(['clean', 'copies', 'scripts']);
}

var bun;
exports.scripts = function * () {
	Object.assign(cf.rollup, {cache: bun});
	bun = yield rollup(cf.rollup);
	bun.write(cf.bundle);
	isWatch && bs.reload();
}

exports.watch = function * () {
	isWatch = 1;
	yield this.start('build');
	yield this.watch('src/**/*.js', 'scripts');
	yield this.start('server');
}

exports.server = function * () {
	bs({server: out, port: process.env.PORT || 8080});
}
