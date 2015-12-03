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
			Qbus(null, {}),
			new Qbus(null, {}),
			new Parent()
		];
	},
	qbusesLen = qbuses().length,

	bubblingbusses = function () {
		function Parent (p) {
			Qbus.call(this, p, Parent.prototype);
		}
		
		var p1 = new Parent(),
			p2 = new Qbus(p1),
			p3 = new Parent(p2),
			p4 = Qbus(p3);

		return [p1, p2, p3, p4];

	},

	bubblingbussesLen = bubblingbusses().length,

	noop = function () {};

function stringifyReplacer (key, value) {
	if (value === undefined) {
		return 'undefined';
	}

	return value;
}

test('5. Bubbling events', function (assert) {
	var callsh1,
		callsh2,
		handler1,
		handler2,
		busses,
		first,
		last;

	function reset () {
		callsh1 = 0;
		callsh2 = 0;

		handler1 = function () { callsh1++; };
		handler2 = function () { callsh2++; };

		busses = bubblingbusses();
		first = busses[0];
		last = busses[busses.length - 1];
	}

	///////////////////////////////////////////////////////////////////
	reset();
	last.on('whut', handler1).emit('whut');
	assert.equal(callsh1, 1, 'last member in chain. only listener.');
	///////////////////////////////////////////////////////////////////

	///////////////////////////////////////////////////////////////////
	reset();
	first.on('whut', handler1).emit('whut');
	assert.equal(callsh1, 1, 'first member in chain. only listener.');
	///////////////////////////////////////////////////////////////////

	//////////////////////////////////////////////////////////////////
	reset();
	last.on('whut', handler1)
	first.emit('whut');
	assert.equal(callsh1, 0, 'last is listener, first is emitting (no bubble).');
	//////////////////////////////////////////////////////////////////

	//////////////////////////////////////////////////////////////////
	reset();
	first.on('whut', handler1)
	last.emit('whut');
	assert.equal(callsh1, 1, 'first is listener, last is emitting.');
	//////////////////////////////////////////////////////////////////

	///////////////////////////////////////////////////////////////////
	reset();
	busses.forEach(function (bus) { bus.on('whut', handler1); });
	last.emit('whut');
	assert.equal(callsh1, bubblingbussesLen, 'all is listening, last is emitting.');
	///////////////////////////////////////////////////////////////////

	///////////////////////////////////////////////////////////////////
	reset();
	busses.forEach(function (bus) { bus.on('whut', handler1); });
	busses[busses.length - 2].emit('whut');
	assert.equal(callsh1, bubblingbussesLen - 1, 'all is listening, next-to-last is emitting.');
	///////////////////////////////////////////////////////////////////
	

	assert.end();
});