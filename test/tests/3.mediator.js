if (typeof require === 'function') {
	Qbus = require('../../index.js');
	expect = require('chai').expect;
	testPaths = require('../testPaths.js')
}

describe('3. Mediator', function () {
	var qbus = function () {
			return new Qbus();
		},
		noop = function () {};

	function stringifyReplacer (key, value) {
		if (value === undefined) {
			return 'undefined';
		}

  		return value;
	}


	testPaths.forEach(function (testPath) {
		describe(testPath.descr, function () {
			testPath.paths.forEach(function (path) {

				describe("qbus.on('" + path + "', handler);", function () {
					testPath.equals.forEach(function (equals) {
						var emitArgs = [0, 'a', {}],
							withArgs = [].concat(equals.args, emitArgs);

						it("Should invoke on qbus.emit('" + equals.path + "', " + JSON.stringify(emitArgs) + ") with params " + JSON.stringify(withArgs, stringifyReplacer), function () {
							var calls = 0,
								args,
								_qbus = qbus();

							_qbus.on(path, function () {
								calls++;
								args = Array.prototype.slice.call(arguments);
							}).emit.apply(_qbus, [].concat(equals.path, emitArgs));

							expect(calls).to.equal(1);
							expect(args).to.deep.equal(withArgs);
						});
					});

					testPath.unlike.forEach(function (unlike) {
						it("Should not execute on qbus.emit('" + unlike + "')", function () {
							var calls = 0;

							qbus().on(path, function () {
								calls++;
							}).emit(unlike);

							expect(calls).to.equal(0);
						});
					});
				});
			});
		});
	});
});