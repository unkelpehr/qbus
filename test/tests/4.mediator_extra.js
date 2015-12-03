if (typeof require === 'function') {
	Qbus = require('../../index.js');
	test = require('tape');
	testPaths = require('../testPaths.js')
}

var qbuses = function () {
		function Parent () {
			Qbus.call(this, null, Parent.prototype);
		}
		
		return [
			new Qbus(),
			Qbus(),
			Qbus(),
			new Parent()
		];
	},
	qbusesLen = qbuses().length,
	noop = function () {};

function stringifyReplacer (key, value) {
	if (value === undefined) {
		return 'undefined';
	}

	return value;
}

test('4. Mediator extra functionality', function (assert) {

	// Strings
	(function () {
		var calls = 0;

		qbuses().forEach(function (qbus) {
			qbus.once('abc', function () {
				calls++;
			}).emit('abc').emit('abc').emit('abc');
		});

		assert.equal(calls, qbusesLen, '.once(str) only execute the handler once');
	}());

	(function () {
		var calls = 0;

		qbuses().forEach(function (qbus) {
			qbus.on('abc', function () {
				calls++;
			}).emit('abc').emit('abc').emit('abc');
		});

		assert.equal(calls, qbusesLen * 3, '.on(str) execute the handler three times with three emits');
	}());

	(function () {
		var h1calls = 0,
			h2calls = 0,
			handler1 = function () {
				h1calls++;
			}, handler2 = function () {
				h2calls++;
			};

		qbuses().forEach(function (qbus) {
			qbus
				.on('abc', handler1)
				.on('abc', handler2)
				.off('abc', handler1)
				.emit('abc');
		});

		assert.equal(h1calls, 0, '.off(str) should only remove the subs with the specified handler');
	}());

	(function () {
		var calls = 0,
			handler1 = function () {
				calls++;
			}, handler2 = function () {
				calls++;
			};

		qbuses().forEach(function (qbus) {
			qbus
				.on('abc', handler1)
				.on('abc', handler2)
				.off('abc')
				.emit('abc');
		});

		assert.equal(calls, 0, '.off(str) should remove all subs if no handler is specified');
	}());

	// Expressions
	(function () {
		var calls = 0;

		qbuses().forEach(function (qbus) {
			qbus.once('/users/:userId?', function () {
				calls++;
			}).emit('/users/userId').emit('/users').emit('/users/');
		});

		assert.equal(calls, qbusesLen, '.once(expression) only execute the handler once');
	}());

	(function () {
		var calls = 0;

		qbuses().forEach(function (qbus) {
			qbus.on('/users/:userId?', function () {
				calls++;
			}).emit('/users/userId').emit('/users').emit('/users/');
		});

		assert.equal(calls, qbusesLen * 3, '.on(expression) execute the handler three times with three emits');
	}());

	(function () {
		var h1calls = 0,
			h2calls = 0,
			handler1 = function () {
				h1calls++;
			}, handler2 = function () {
				h2calls++;
			};

		qbuses().forEach(function (qbus) {
			qbus
				.on('/users/:userId?', handler1)
				.on('/users/:userId?', handler2)
				.off('/users/:userId?', handler1)
				.emit('/users/userId');
		});

		assert.equal(h1calls, 0, '.off(expression) should only remove the subs with the specified handler');
	}());

	(function () {
		var calls = 0,
			handler1 = function () {
				calls++;
			}, handler2 = function () {
				calls++;
			};

		qbuses().forEach(function (qbus) {
			qbus
				.on('/users/:userId?', handler1)
				.on('/users/:userId?', handler2)
				.off('/users/:userId?')
				.emit('/users/userId');
		});

		assert.equal(calls, 0, '.off(expression) should remove all subs if no handler is specified');
	}());

	// RegExps
	(function () {
		var calls = 0;

		qbuses().forEach(function (qbus) {
			qbus.once(/(.*)/, function () {
				calls++;
			}).emit('abc').emit('abc').emit('abc');
		});

		assert.equal(calls, qbusesLen, '.once(RegExp) only execute the handler once');
	}());

	(function () {
		var calls = 0;

		qbuses().forEach(function (qbus) {
			qbus.on(/(.*)/, function () {
				calls++;
			}).emit('abc').emit('abc').emit('abc');
		});

		assert.equal(calls, qbusesLen * 3, '.on(RegExp) execute the handler three times with three emits');
	}());

	(function () {
		var h1calls = 0,
			h2calls = 0,
			handler1 = function () {
				h1calls++;
			}, handler2 = function () {
				h2calls++;
			};

		qbuses().forEach(function (qbus) {
			qbus
				.on(/(.*)/, handler1)
				.on(/(.*)/, handler2)
				.off(/(.*)/, handler1)
				.emit('abc');
		});

		assert.equal(h1calls, 0, '.off(RegExp) should only remove the subs with the specified handler');
	}());

	(function () {
		var calls = 0,
			handler1 = function () {
				calls++;
			}, handler2 = function () {
				calls++;
			};

		qbuses().forEach(function (qbus) {
			qbus
				.on(/(.*)/, handler1)
				.on(/(.*)/, handler2)
				.off(/(.*)/)
				.emit('abc');
		});

		assert.equal(calls, 0, '.off(RegExp) should remove all subs if no handler is specified');
	}());

	assert.end();
});