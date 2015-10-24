var testPaths = [
	{
		descr: 'Plain text',

		paths: [
			'some/thing',
			'/some/thing',
			'some/thing/',
			'/some/thing/'
		],

		equals: [
			{ path: '/some/thing', args: [] },
			{ path: '/some/thing', args: [] },
			{ path: 'some/thing/', args: [] },
			{ path: '/some/thing/', args: [] }
		],

		unlike: [
			'ssoom/thing',
			'soom/thingg',
			'a/some/thing',
			'some/thing/b',
			'/a/some/thing/b',
			'some/thing/b/',
			'/a/some/thing/b/'
		]
	},

	{
		descr: 'Single mandatory parameter',

		paths: [
			'some/:thing',
			'/some/:thing',
			'some/:thing/',
			'/some/:thing/'
		],

		equals: [
			{ path: 'some/qwerty', args: ['qwerty'] },
			{ path: '/some/qwerty', args: ['qwerty'] },
			{ path: 'some/qwerty/', args: ['qwerty'] },
			{ path: '/some/qwerty/', args: ['qwerty'] }
		],

		unlike: [
			'ome',
			'someX',
			'some',
			'/some',
			'some/',
			'/some/',
			'ssoom/thing',
			'soom/thingg',
			'a/some/thing',
			'some/thing/b',
			'/a/some/thing/b',
			'some/thing/b/',
			'/a/some/thing/b/'
		]
	},

	{
		descr: 'Single optional parameter',

		paths: [
			'some/:thing?',
			'/some/:thing?',
			'some/:thing?/',
			'/some/:thing?/',
		],

		equals: [
			{ path: 'some/qwerty', args: ['qwerty'] },
			{ path: '/some/qwerty', args: ['qwerty'] },
			{ path: 'some/qwerty/', args: ['qwerty'] },
			{ path: '/some/qwerty/', args: ['qwerty'] },

			{ path: 'some/', args: [undefined] },
			{ path: '/some/', args: [undefined] },
			{ path: '/some', args: [undefined] },
			{ path: '/some/', args: [undefined] }
		],

		unlike: [
			'ome',
			'someX',
			'ssoom/thing',
			'soom/thingg',
			'a/some/thing',
			'some/thing/b',
			'/a/some/thing/b',
			'some/thing/b/',
			'/a/some/thing/b/'
		]
	},


	{
		descr: 'Single mandatory parameter at root',

		paths: [
			':thing',
			'/:thing',
			':thing/',
			'/:thing/'
		],

		equals: [
			{ path: 'qwerty', args: ['qwerty'] },
			{ path: '/qwerty', args: ['qwerty'] },
			{ path: 'qwerty/', args: ['qwerty'] },
			{ path: '/qwerty/', args: ['qwerty'] }
		],

		unlike: [
			'ssoom/thing',
			'soom/thingg',
			'a/some/thing',
			'some/thing/b',
			'/a/some/thing/b',
			'some/thing/b/',
			'/a/some/thing/b/',
			'/',
			'//'
		]
	},

	{
		descr: 'Single optional parameter at root',

		paths: [
			':thing?',
			'/:thing?',
			':thing?/',
			'/:thing?/',
		],

		equals: [
			{ path: 'qwerty', args: ['qwerty'] },
			{ path: '/qwerty', args: ['qwerty'] },
			{ path: 'qwerty/', args: ['qwerty'] },
			{ path: '/qwerty/', args: ['qwerty'] },

			{ path: '/', args: [undefined] },
			{ path: '//', args: [undefined] }
		],

		unlike: [
			'ssoom/thing',
			'soom/thingg',
			'a/some/thing',
			'some/thing/b',
			'/a/some/thing/b',
			'some/thing/b/',
			'/a/some/thing/b/'
		]
	},

	{
		descr: 'Single mandatory parameter sandwiched between fixed portions',

		paths: [
			'some/:thing?/stuff',
			'/some/:thing?/stuff',
			'some/:thing?/stuff/',
			'/some/:thing?/stuff/',
		],

		equals: [
			{ path: 'some/qwerty/stuff', args: ['qwerty'] },
			{ path: '/some/qwerty/stuff', args: ['qwerty'] },
			{ path: 'some/qwerty/stuff/', args: ['qwerty'] },
			{ path: '/some/qwerty/stuff/', args: ['qwerty'] },

			{ path: 'some/stuff', args: [undefined] },
			{ path: '/some/stuff', args: [undefined] },
			{ path: 'some/stuff/', args: [undefined] },
			{ path: '/some/stuff/', args: [undefined] }
		],

		unlike: [
			'some/XXX/notStuff',
			'/some/XXX/notStuff',
			'some/XXX/notStuff/',
			'/some/XXX/notStuff/',

			'some/notStuff',
			'/some/notStuff',
			'some/notStuff/',
			'/some/notStuff/'
		]
	},

	{
		descr: 'Multiple mandatory parameters',

		paths: [
			'some/:thing?/:stuff?/:evenmore?',
			'/some/:thing?/:stuff?/:evenmore?',
			'some/:thing?/:stuff?/:evenmore?/',
			'/some/:thing?/:stuff?/:evenmore?/'
		],

		equals: [
			{ path: 'some/a', args: ['a', undefined, undefined] },
			{ path: '/some/a', args: ['a', undefined, undefined] },
			{ path: '/some/a/', args: ['a', undefined, undefined] },
			{ path: 'some/a/', args: ['a', undefined, undefined] },

			{ path: 'some/a/b', args: ['a', 'b', undefined] },
			{ path: '/some/a/b', args: ['a', 'b', undefined] },
			{ path: '/some/a/b/', args: ['a', 'b', undefined] },
			{ path: 'some/a/b/', args: ['a', 'b', undefined] },

			{ path: 'some/a/b/c', args: ['a', 'b', 'c'] },
			{ path: '/some/a/b/c', args: ['a', 'b', 'c'] },
			{ path: '/some/a/b/c/', args: ['a', 'b', 'c'] },
			{ path: 'some/a/b/c/', args: ['a', 'b', 'c'] }
		],

		unlike: [
			'some/a/b/c/d',
			'/some/a/b/c/d',
			'some/a/b/c/d/',
			'/some/a/b/c/d/',
		]
	},

	{
		descr: 'Both mandatory and optional parameters',

		paths: [
			'some/:thing?/stuff/:evenmore?',
			'/some/:thing?/stuff/:evenmore?',
			'some/:thing?/stuff/:evenmore?/',
			'/some/:thing?/stuff/:evenmore?/'
		],

		equals: [
			{ path: 'some/a/stuff', args: ['a', undefined] },
			{ path: '/some/a/stuff', args: ['a', undefined] },
			{ path: 'some/a/stuff/', args: ['a', undefined] },
			{ path: '/some/a/stuff/', args: ['a', undefined] },

			{ path: 'some/stuff/b', args: [undefined, 'b'] },
			{ path: '/some/stuff/b', args: [undefined, 'b'] },
			{ path: 'some/stuff/b/', args: [undefined, 'b'] },
			{ path: '/some/stuff/b/', args: [undefined, 'b'] },

			{ path: 'some/a/stuff/b', args: ['a', 'b'] },
			{ path: '/some/a/stuff/b', args: ['a', 'b'] },
			{ path: 'some/a/stuff/b/', args: ['a', 'b'] },
			{ path: '/some/a/stuff/b/', args: ['a', 'b'] }
		],

		unlike: [
			'some/a/notStuff/b',
			'/some/a/notStuff/b',
			'some/a/notStuff/b/',
			'/some/a/notStuff/b/',

			'some/a/stuff/b/withExtra',
			'/some/a/stuff/b/withExtra',
			'some/a/stuff/b/withExtra/',
			'/some/a/stuff/b/withExtra/'
		]
	},

	{
		descr: 'Single wildcard right before end-of-string',

		paths: [
			'some/*'
		],
		equals: [
			{ path: 'some/', args: [undefined] },
			{ path: '/some/', args: [undefined] },

			{ path: 'some/stuff', args: ['stuff'] },
			{ path: '/some/stuff', args: ['stuff'] },
			{ path: 'some/stuff/', args: ['stuff'] },
			{ path: '/some/stuff/', args: ['stuff'] },

			{ path: 'some/stuff/moreStuff', args: ['stuff/moreStuff'] },
			{ path: '/some/stuff/moreStuff', args: ['stuff/moreStuff'] },
			{ path: 'some/stuff/moreStuff/', args: ['stuff/moreStuff'] },
			{ path: '/some/stuff/moreStuff/', args: ['stuff/moreStuff'] },

			{ path: '/some/it shou/ld rea/lly just ma/tch \\EVERYTHING exactly as-is/', args: ['it shou/ld rea/lly just ma/tch \\EVERYTHING exactly as-is'] }
		],
		unlike: [
			'some',
			'/some'
		]
	},

	{
		descr: 'Single wildcard right before / followed end-of-string',

		paths: [
			'some/*/'
		],

		equals: [
			{ path: 'some/stuff', args: ['stuff'] },
			{ path: '/some/stuff', args: ['stuff'] },
			{ path: 'some/stuff/', args: ['stuff'] },
			{ path: '/some/stuff/', args: ['stuff'] }
		],

		unlike: [
			'some',
			'/some',

			'some/stuff/moreStuff',
			'/some/stuff/moreStuff',
			'some/stuff/moreStuff/',
			'/some/stuff/moreStuff/'
		]
	},

	{
		descr: 'Two wildcards as independent parameters, no slash end',

		paths: [
			'some/*/*'
		],

		equals: [
			{ path: 'some/stuff/', args: ['stuff', undefined] },
			{ path: '/some/stuff/', args: ['stuff', undefined] },
			{ path: '/some/stuff/qwerty', args: ['stuff', 'qwerty'] },
			{ path: '/some/stuff/qwerty/moreStuff', args: ['stuff', 'qwerty/moreStuff'] },
			{ path: '/some/stuff/qwerty/moreStuff/', args: ['stuff', 'qwerty/moreStuff'] },
		],

		unlike: [
			'some',
			'/some',

			'some/stuff',
			'ssome/stuff/qwerty'
		]
	},

	{
		descr: 'Two wildcards as independent parameters, with slash end',

		paths: [
			'some/*/*/'
		],

		equals: [
			{ path: 'some/stuff/', args: ['stuff', undefined] },
			{ path: '/some/stuff/', args: ['stuff', undefined] },
			{ path: '/some/stuff/qwerty', args: ['stuff', 'qwerty'] },
			{ path: '/some/stuff/qwerty/', args: ['stuff', 'qwerty'] },
		],

		unlike: [
			'some',
			'/some',
			'/some/stuff/qwerty/moreStuff',
			'/some/stuff/qwerty/moreStuff/'
		]
	},

	{
		descr: 'Fixed portion prefixed with wildcard',

		paths: [
			'some/*thing'
		],

		equals: [
			{ path: 'some/thing', args: [undefined] },
			{ path: 'some/something', args: ['some'] },
			{ path: '/some/something', args: ['some'] },
			{ path: 'some/something/', args: ['some'] },
			{ path: '/some/something/', args: ['some'] },

			{ path: '/some/SOMEthing/', args: ['SOME'] },

			{ path: '/some/ anything that end with thing really. thing', args: [' anything that end with thing really. '] }
		],

		unlike: [
			'some',
			'/some',
			'some/',
			'/some/',

			'some/Athin'
		]
	},

	{
		descr: 'Fixed portion suffixed with wildcard',

		paths: [
			'some/thing*',
			'/some/thing*',
			'some/thing*/',
			'/some/thing*/'
		],

		equals: [
			{ path: 'some/thingElse', args: ['Else'] },
			{ path: '/some/thingElse', args: ['Else'] },
			{ path: 'some/thingElse/', args: ['Else'] },
			{ path: '/some/thingElse/', args: ['Else'] }
		],

		unlike: [
			'some/athing',
			'/some/athing',
			'some/athing/',
			'/some/athing/'
		]
	},

	{
		descr: 'Catch all until end',

		paths: [
			'*',
			'/*'
		],

		equals: [
			{ path: 'some/thingElse', args: ['some/thingElse'] },
			{ path: '/some/thingElse', args: ['some/thingElse'] },
			{ path: 'some/thingElse/', args: ['some/thingElse'] },
			{ path: '/some/thingElse/', args: ['some/thingElse'] }
		],

		unlike: [
		]
	},

	{
		descr: 'Catch all until frontslash or end',

		paths: [
			'*/',
			'/*/'
		],

		equals: [
			{ path: 'some', args: ['some'] },
			{ path: '/some', args: ['some'] },
			{ path: 'some/', args: ['some'] },
			{ path: '/some/', args: ['some'] },
		],

		unlike: [
		 'some/a', 
		 '/some/a'
		]
	},

	{
		descr: 'Frankensten queries 1',

		paths: [
			'/:'
		],

		equals: [
			{ path: ':', args: [] },
			{ path: '/:', args: [] },
			{ path: ':/', args: [] },
			{ path: '/:/', args: [] }
		],

		unlike: []
	},

	{
		descr: 'Frankensten queries 2',

		paths: [
			'/?'
		],

		equals: [
			{ path: '?', args: [] },
			{ path: '/?', args: [] },
			{ path: '?/', args: [] },
			{ path: '/?/', args: [] }
		],

		unlike: []
	},

	{
		descr: 'Frankensten queries 3',

		paths: [
			'/frank?'
		],

		equals: [
			{ path: 'frank?', args: [] },
			{ path: '/frank?', args: [] },
			{ path: 'frank?/', args: [] },
			{ path: '/frank?/', args: [] }
		],

		unlike: []
	},

	{
		descr: 'Frankensten queries 3',

		paths: [
			'/f:rank?'
		],

		equals: [
			{ path: 'f:rank?', args: [] },
			{ path: '/f:rank?', args: [] },
			{ path: 'f:rank?/', args: [] },
			{ path: '/f:rank?/', args: [] }
		],

		unlike: []
	},

	{
		descr: 'Frankensten queries 4',

		paths: [
			'/f : r a n k ?'
		],

		equals: [
			{ path: 'f : r a n k ?', args: [] },
			{ path: '/f : r a n k ?', args: [] },
			{ path: 'f : r a n k ?/', args: [] },
			{ path: '/f : r a n k ?/', args: [] }
		],

		unlike: []
	},

	{
		descr: 'Frankensten queries 5',

		paths: [
			'/:?'
		],

		equals: [
			{ path: ':?', args: [] },
			{ path: '/:?', args: [] },
			{ path: ':?/', args: [] },
			{ path: '/:?/', args: [] }
		],

		unlike: []
	}
];

if (typeof module !== 'undefined' && typeof module.exports === 'object') {
	module.exports = testPaths;
}