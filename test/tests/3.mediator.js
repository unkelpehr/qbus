if (typeof require === 'function') {
	Qbus = require('../../index.js');
	test = require('tape');
	testPaths = require('../testPaths.js')
}

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

test('3. Mediator routing', function (assert) {
	testPaths.forEach(function (test) {

		assert.test(test.descr, function (assert) {

			test.equals.forEach(function (equals) {
				var emitArgs = [0, 'a', {}],
					withArgs = [].concat(equals.args, emitArgs);

				test.paths.forEach(function (path) {
					var calls = 0,
						args,
						_qbus = qbus();

					_qbus.on(path, function () {
						calls++;
						args = Array.prototype.slice.call(arguments);
					}).emit.apply(_qbus, [].concat(equals.path, emitArgs));

					assert.deepEqual(args, withArgs, "Should run and args deepEqual: on('" + path + "').emit('"+ equals.path + "', " + JSON.stringify(equals.args, stringifyReplacer) + ")");
				});
			});

			test.unlike.forEach(function (negPath) {
				test.paths.forEach(function (path) {
					var calls = 0,
						_qbus = qbus();

					_qbus.on(path, function () {
						calls++;
					}).emit(negPath);

					assert.equal(calls, 0, "Should not run: on('" + path + "').emit('" + negPath + "')");
				});
			});

			assert.end();
		});
	});

	assert.end();
});