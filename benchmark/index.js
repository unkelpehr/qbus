var Benchmark = require('benchmark'),
	suite = new Benchmark.Suite,

	queries = require('./queries'),
	Qbus1 = require('../index'),
	Qbus2 = require('./qbus2.js'),

	qbus1 = new Qbus1(),
	qbus2 = new Qbus2();

function noop () {}
function woop () { console.log('woop', arguments); }

// Listen on all string queries
queries.simple.forEach(function (query) {
	qbus1.on(query, noop);
	qbus2.on(query, noop);
});

// Listen on all regexp queries
queries.complex.forEach(function (query) {
	qbus1.on(query, noop);
	qbus2.on(query, noop);
});

console.log('Each run consists of ' + queries.simple.length + ' emits against ' + (queries.simple.length + queries.complex.length) + ' listeners.');

suite
	.add('qbus 1', function () {
		queries.simple.forEach(function (query) {
		qbus1.emit(query, 'a', 'b', 'c');
		});
	})
	.add('qbus 2', function() {
		queries.simple.forEach(function (query) {
			qbus2.emit(query, 'a', 'b', 'c');
		});
	})
	.on('cycle', function(event) {
		console.log(String(event.target));
	})
	.on('complete', function() {
		console.log('Fastest is ' + this.filter('fastest').pluck('name'));
	})
	.run();

// require('fs').writeFile(__dirname + '/qbus1.out.txt', JSON.stringify(qbus1.qbus, function (key, val) { return (val instanceof RegExp ? val.source : val);  }, '\t')); 
// require('fs').writeFile(__dirname + '/qbus2.out.txt', JSON.stringify(qbus2.qbus, function (key, val) { return (val instanceof RegExp ? val.source : val);  }, '\t')); 