if (typeof require === 'function') {
	Qbus = require('../../index.js');
	expect = require('chai').expect;
}

describe('4. Mediator extra', function () {
	var qbuses = function () {
			return [
				new Qbus(),
				Qbus(),
				Qbus({}),
				new Qbus({})
			];
		},
		noop = function () {};

	describe('.once(str)', function () {
		it('Should only execute the handler once', function () {
			var calls = 0;

			qbuses().forEach(function (qbus) {
				qbus.once('abc', function () {
					calls++;
				}).emit('abc').emit('abc').emit('abc');
			});

			expect(calls).to.equal(qbuses().length);
		});
	});

	describe('.on(str)', function () {
		it('Should execute handler three times with three emits', function () {
			var calls = 0;

			qbuses().forEach(function (qbus) {
				qbus.on('abc', function () {
					calls++;
				}).emit('abc').emit('abc').emit('abc');
			});

			expect(calls).to.equal(qbuses().length * 3);
		});
	});


	describe('.off(str)', function () {
		it('Should remove only the subs with the specified handler', function () {
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
					.off('abc', handler1)
					.emit('abc');
			});

			expect(calls).to.equal(qbuses().length);
		});

		it('Should remove remove all subs if no handler is specified', function () {
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

			expect(calls).to.equal(0);
		});
	});

	describe('.once(expression)', function () {
		it('Should only execute the handler once', function () {
			var calls = 0;

			qbuses().forEach(function (qbus) {
				qbus.once('/users/userId?', function () {
					calls++;
				}).emit('/users/userId?').emit('/users/userId?').emit('/users/userId?');
			});

			expect(calls).to.equal(qbuses().length);
		});
	});

	describe('.on(expression)', function () {
		it('Should execute handler three times with three emits', function () {
			var calls = 0;

			qbuses().forEach(function (qbus) {
				qbus.on('/users/userId?', function () {
					calls++;
				}).emit('/users/userId?').emit('/users/userId?').emit('/users/userId?');
			});

			expect(calls).to.equal(qbuses().length * 3);
		});
	});


	describe('.off(expression)', function () {
		it('Should remove only the subs with the specified handler', function () {
			var calls = 0,
				handler1 = function () {
					calls++;
				}, handler2 = function () {
					calls++;
				};

			qbuses().forEach(function (qbus) {
				qbus
					.on('/users/userId?', handler1)
					.on('/users/userId?', handler2)
					.off('/users/userId?', handler1)
					.emit('/users/userId?');
			});

			expect(calls).to.equal(qbuses().length);
		});

		it('Should remove remove all subs if no handler is specified', function () {
			var calls = 0,
				handler1 = function () {
					calls++;
				}, handler2 = function () {
					calls++;
				};

			qbuses().forEach(function (qbus) {
				qbus
					.on('/users/userId?', handler1)
					.on('/users/userId?', handler2)
					.off('/users/userId?')
					.emit('/users/userId?');
			});

			expect(calls).to.equal(0);
		});
	});


	describe('.once(RegExp)', function () {
		it('Should only execute the handler once', function () {
			var calls = 0;

			qbuses().forEach(function (qbus) {
				qbus.once(/(.*)/, function () {
					calls++;
				}).emit('abc').emit('abc').emit('abc');
			});

			expect(calls).to.equal(qbuses().length);
		});
	});

	describe('.on(RegExp)', function () {
		it('Should execute handler three times with three emits', function () {
			var calls = 0;

			qbuses().forEach(function (qbus) {
				qbus.on(/(.*)/, function () {
					calls++;
				}).emit('abc').emit('abc').emit('abc');
			});

			expect(calls).to.equal(qbuses().length * 3);
		});
	});


	describe('.off(RegExp)', function () {
		it('Should remove only the subs with the specified handler', function () {
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
					.off(/(.*)/, handler1)
					.emit('abc');
			});

			expect(calls).to.equal(qbuses().length);
		});

		it('Should remove remove all subs if no handler is specified', function () {
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

			expect(calls).to.equal(0);
		});
	});
});