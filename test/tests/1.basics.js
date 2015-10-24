var Qbus = require('../../index.js'),
	test = require('tape'),

	expectProtos = { 'on': 1, 'once': 1, 'off': 1, 'emit': 1},
	actualProtos = {},
	proto,

	expectProps = { 'parse': 1 },
	actualProps = {},
	prop,

	noop = function () {};

for (proto in Qbus.prototype) {
	if (Qbus.prototype.hasOwnProperty(proto)) {
		actualProtos[proto] = 1;
	}
}

for (prop in Qbus) {
	if (Qbus.hasOwnProperty(prop)) {
		actualProps[prop] = 1;
	}
}

test('Basics', function (assert) {

	assert.equal(typeof Qbus, 'function', 'Qbus is a function');
	assert.equal(Qbus.length, 1, 'Qbus takes one argument');
	assert.ok(Qbus() instanceof Qbus, 'Qbus can be called without the `new` keyword');
	assert.deepEqual(expectProtos, actualProtos, 'Qbus has "on", "once", "off" and "emit" as the only prototype methods');
	assert.deepEqual(expectProps, actualProps, 'Qbus has "parse" as the only property');

	/**
	 * .on
	 */
	assert.equal(Qbus.prototype.on.length, 2, '.on should take two arguments');
	assert.throws(function () {
		var times = 0,
			expect = 4;

		try { Qbus().on(); } catch (e) { if (e instanceof TypeError) times++; }
		try { Qbus().on('a'); } catch (e) { if (e instanceof TypeError) times++; }
		try { Qbus().on(null, 'a'); } catch (e) { if (e instanceof TypeError) times++; }
		try { Qbus().on(noop, 'a'); } catch (e) { if (e instanceof TypeError) times++; }

		if (times === expect) {
			throw 'ok';
		}
	}, '.on throws TypeError on anything other than <String|RegExp, Function>');

	assert.doesNotThrow(function () {
		Qbus().on('a', noop);
		Qbus().on(/[a-z]/, noop);
	}, '.on does not throw with <String|RegExp, Function>')

	assert.ok(Qbus().on('a', noop) instanceof Qbus, '.on returns `this`');

	/**
	 * .once
	 */
	assert.equal(Qbus.prototype.once.length, 2, '.once should take two arguments')
	assert.throws(function () {
		var times = 0,
			expect = 4;

		try { Qbus().once(); } catch (e) { if (e instanceof TypeError) times++; }
		try { Qbus().once('a'); } catch (e) { if (e instanceof TypeError) times++; }
		try { Qbus().once(null, 'a'); } catch (e) { if (e instanceof TypeError) times++; }
		try { Qbus().once(noop, 'a'); } catch (e) { if (e instanceof TypeError) times++; }

		if (times === expect) {
			throw 'ok';
		}
	}, '.once throws TypeError on anything other than <String|RegExp, Function>');

	assert.doesNotThrow(function () {
		Qbus().once('a', noop);
		Qbus().once(/[a-z]/, noop);
	}, '.once does not throw with <String|RegExp, Function>');

	assert.ok(Qbus().once('a', noop) instanceof Qbus, '.once returns `this`');

	/**
	 * .off
	 */
	assert.equal(Qbus.prototype.off.length, 2, '.off should take two arguments');
	assert.throws(function () {
		var times = 0,
			expect = 3;

		try { Qbus().off(); } catch (e) { if (e instanceof TypeError) times++; }
		try { Qbus().off(null, 'a'); } catch (e) { if (e instanceof TypeError) times++; }
		try { Qbus().off(noop); } catch (e) { if (e instanceof TypeError) times++; }

		if (times === expect) {
			throw 'ok';
		} console.log(times);
	}, '.off throws TypeError on anything other than <String|RegExp[, Function]>');

	assert.doesNotThrow(function () {
		Qbus().off('a', noop);
		Qbus().off(/[a-z]/, noop);
		Qbus().off('a');
		Qbus().off(/[a-z]/);
	}, '.off does not throw with <String|RegExp[, Function]>')

	assert.ok(Qbus().off('a', noop) instanceof Qbus, '.off returns `this`');

	/**
	 * .emit
	 */
	assert.equal(Qbus.prototype.emit.length, 1, '.emit should take one argument');
	assert.throws(function () {
		var times = 0,
			expect = 2;

		try { Qbus().emit(); } catch (e) { if (e instanceof TypeError) times++; }
		try { Qbus().emit(null); } catch (e) { if (e instanceof TypeError) times++; }

		if (times === expect) {
			throw 'ok';
		} 
	}, '.emit throws TypeError on anything other than <String>')

	assert.doesNotThrow(function () {
		Qbus().emit('a');
	}, '.emit does not throw with <String>')

	assert.ok(Qbus().emit('a', noop) instanceof Qbus, '.emit returns `this`');

	/**
	 * .parse
	 */
	assert.equal(Qbus.parse.length, 1, '.parse should take one argument');
	assert.throws(function () {
		var times = 0,
			expect = 2;

		try { Qbus.parse(); } catch (e) { if (e instanceof TypeError) times++; }
		try { Qbus.parse(null); } catch (e) { if (e instanceof TypeError) times++; }

		if (times === expect) {
			throw 'ok';
		} 
	}, '.parse throws TypeError on anything other than <String|RegExp>')

	assert.doesNotThrow(function () {
		Qbus.parse('a');
		Qbus.parse(/[a-z]/);
	}, '.parse does not throw with <String>')

	assert.ok(Qbus.parse('a') instanceof RegExp, '.parse returns `RegExp`');

	assert.deepEqual(Qbus().qbus, {
		paths: {},
		parse: Qbus.parse
	}, 'Qbus().qbus hasn\'t changed');

	assert.deepEqual(Qbus({}), Qbus.prototype, 'Parasitic inheritence of prototypes');
	assert.deepEqual(Qbus({}).jbus, Qbus().jbus, 'Parasitic inheritence of `.jbus`');

    assert.end();
});