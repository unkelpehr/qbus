if (typeof require === 'function') {
	Qbus = require('../../index.js');
	expect = require('chai').expect;
	testPaths = require('../testPaths.js')
}

describe('2. Qbus.parse', function () {
	function stringifyReplacer (key, value) {
		if (value === undefined) {
			return 'undefined';
		}

  		return value;
	}

	testPaths.forEach(function (test) {
		describe(test.descr, function () {
			describe('"' + test.paths.join('", "') + '"', function () {
				describe('Should match against', function () {
					test.equals.forEach(function (equals) {
						it(equals.path, function () {
							test.paths.forEach(function (path) {
								var res = Qbus.parse(path);

								expect(res).to.be.instanceof(RegExp);
								expect(res.query(equals.path)).to.be.an('Array');
							});
						});
					});
				});

				describe('... and deep equal these parameters', function () {
					test.equals.forEach(function (equals) {
						it(JSON.stringify(equals.args, stringifyReplacer), function () {
							test.paths.forEach(function (path) {
								var res = Qbus.parse(path);

								//console.log(equals.path , res );
								expect(res).to.be.instanceof(RegExp);
								expect(res.query(equals.path)).to.deep.equal(equals.args);
							});
						});
					});
				});

				describe('Should not match against', function () {
					test.unlike.forEach(function (dontMatchThisPath) {
						it(dontMatchThisPath, function () {
							test.paths.forEach(function (path) {
								expect(Qbus.parse(path).query(dontMatchThisPath)).to.equal(null);
							});
						});
					});
				});
			});
		});
	});
});