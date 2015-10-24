if (typeof require === 'function') {
	Qbus = require('../../index.js');
	test = require('tape');
	testPaths = require('../testPaths.js')
}

function stringifyReplacer (key, value) {
	if (value === undefined) {
		return 'undefined';
	}

	return value;
}

test('2. Jbus.parse', function (assert) {
	testPaths.forEach(function (test) {

		assert.test(test.descr, function (assert) {
			test.equals.forEach(function (equals) {
				test.paths.forEach(function (path) {
					var res = Qbus.parse(path);

					assert.deepEqual(res.query(equals.path), equals.args, 'Should match: ' + path + ' + '+ equals.path + ' and ' + JSON.stringify(equals.args, stringifyReplacer));
				});
			});

			test.unlike.forEach(function (dontMatchThisPath) {
				test.paths.forEach(function (path) {
					assert.ok(Qbus.parse(path).query(dontMatchThisPath) === null, 'Should not match: ' + path + ' and '  + dontMatchThisPath);
				});
			});

			assert.end();
		});

	});

	assert.end();
});