if (typeof require === 'function') {
	Qbus = require('../../index.js');
	expect = require('chai').expect;
}

describe('1. Basics', function () {
	var qbus = new Qbus(),

		expectProtos = { 'on': 1, 'once': 1, 'off': 1, 'emit': 1},
		actualProtos = {},
		proto,

		expectProps = { 'parse': 1 },
		actualProps = {},
		prop,

		noop = function () {};

	describe('Qbus', function () {
		it('Should be a function', function () {
			expect(Qbus).to.be.a('function');
		});

		it('Should take one argument', function () {
			expect(Qbus.length).to.equal(1);
		});

		it('Should have be optionally called with "new"', function () {
			expect(new Qbus()).to.be.instanceof(Qbus);
			expect(Qbus()).to.be.instanceof(Qbus);
		});

		it('Should have "on", "once", "off" and "emit" as the only prototype methods', function () {			
			for (proto in Qbus.prototype) {
				if (Qbus.prototype.hasOwnProperty(proto)) {
					actualProtos[proto] = 1;
				}
			}

			expect(expectProtos).to.deep.equal(actualProtos);
		});

		it('Should have "parse" as only property', function () {			
			for (prop in Qbus) {
				if (Qbus.hasOwnProperty(prop)) {
					actualProps[prop] = 1;
				}
			}

			expect(expectProps).to.deep.equal(actualProps);
		});

		it('All properties and prototypes are functions', function () {			
			for (proto in expectProtos) {
				if (Qbus.hasOwnProperty(proto)) {
					expect(Qbus.prototype[proto]).to.be.a('function');
				}
			}

			for (prop in expectProps) {
				if (Qbus.hasOwnProperty(prop)) {
					expect(Qbus[prop]).to.be.a('function');
				}
			}
		});
	});

	describe('(new Qbus()).on', function () {
		it('Should equal Qbus.prototype.on', function () {
			expect(qbus.on).to.equal(Qbus.prototype.on);
		});

		it('Should take two arguments', function () {
			expect(Qbus.prototype.on.length).to.equal(2);
		});

		it('Should throw TypeError on anything other than <String|RegExp, Function>', function () {
			expect(function () {
				(new Qbus).on();
				(new Qbus).on('a');
				(new Qbus).on(null, 'a');
				(new Qbus).on(noop, 'a');
			}).to.throw(TypeError);

			expect(function () {
				(new Qbus).on('a', noop);
				(new Qbus).on(/[a-z]/, noop);
			}).to.not.throw(TypeError);
		});

		it('Should return `this`', function () {
			expect(qbus.on('a', noop)).to.equal(qbus);
		});
	});

	describe('(new Qbus()).once', function () {
		it('Should equal Qbus.prototype.once', function () {
			expect(qbus.once).to.equal(Qbus.prototype.once);
		});

		it('Should take two arguments', function () {
			expect(Qbus.prototype.once.length).to.equal(2);
		});

		it('Should throw TypeError on anything other than <String|RegExp, Function>', function () {
			expect(function () {
				(new Qbus).on();
				(new Qbus).on('a');
				(new Qbus).on(null, 'a');
				(new Qbus).on(noop, 'a');
			}).to.throw(TypeError);

			expect(function () {
				(new Qbus).on('a', noop);
				(new Qbus).on(/[a-z]/, noop);
			}).to.not.throw(TypeError);
		});

		it('Should return `this`', function () {
			expect(qbus.once('a', noop)).to.equal(qbus);
		});
	});

	describe('(new Qbus()).off', function () {
		it('Should equal Qbus.prototype.off', function () {
			expect(qbus.off).to.equal(Qbus.prototype.off);
		});

		it('Should take two arguments', function () {
			expect(Qbus.prototype.off.length).to.equal(2);
		});

		it('Should throw TypeError on anything other than <String|RegExp [, Function]>', function () {
			expect(function () {
				(new Qbus).off();
				(new Qbus).off('a');
				(new Qbus).off(null, 'a');
			}).to.throw(TypeError);

			expect(function () {
				(new Qbus).off('a', noop);
				(new Qbus).off(/[a-z]/, noop);
			}).to.not.throw(TypeError);
		});

		it('Should return `this`', function () {
			expect(qbus.off('a', noop)).to.equal(qbus);
		});
	});

	describe('(new Qbus()).emit', function () {
		it('Should equal Qbus.prototype.emit', function () {
			expect(qbus.emit).to.equal(Qbus.prototype.emit);
		});

		it('Should take one argument', function () {
			expect(Qbus.prototype.emit.length).to.equal(1);
		});

		it('Should throw TypeError on anything other than <String|RegExp>', function () {
			expect(function () {
				Qbus.parse();
				Qbus.parse(0);
				Qbus.parse(null);
			}).to.throw(TypeError);

			expect(function () {
				Qbus.parse('a');
				Qbus.parse(/[a-z]/);
			}).to.not.throw(TypeError);
		});

		it('Should return `this`', function () {
			expect(qbus.emit('a')).to.equal(qbus);
		});
	});

	describe('Qbus.parse', function () {
		it('Should take one argument', function () {
			expect(Qbus.parse.length).to.equal(1);
		});

		it('Should throw TypeError on anything other than <String|RegExp>', function () {
			expect(function () {
				Qbus.parse();
				Qbus.parse(0);
				Qbus.parse(null);
			}).to.throw(TypeError);

			expect(function () {
				Qbus.parse('a');
				Qbus.parse('a', 'a');
				Qbus.parse('a', 'a', 0, true);
			}).to.not.throw(TypeError);
		});

		it('Should return a RegExp object', function () {
			expect(Qbus.parse('a')).to.be.instanceof(RegExp);
		});
	});

	describe('(new Qbus()).qbus', function () {
		it('Should be equal { path: {}, parse: Qbus.parse }', function () {
			expect((new Qbus).qbus).to.deep.equal({
				paths: {},
				parse: Qbus.parse
			});
		});
	});

	describe('Qbus().qbus', function () {
		it('Should be equal { path: {}, parse: Qbus.parse }', function () {
			expect(Qbus().qbus).to.deep.equal({
				paths: {},
				parse: Qbus.parse
			});
		});
	});

	describe('Qbus(parent).qbus', function () {
		it('Parent should equal new Qbus()', function () {
			var parent = {};

			Qbus(parent);

			expect(parent).to.deep.equal(new Qbus());
		});
	});
});