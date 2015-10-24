// Random queries to lay as basis for benchmark tests
module.exports = {
	simple: [
		'aaaaaaaaaa', 'bbbbbbbbbb', 'cccccccccc', 'dddddddddd', 'eeeeeeeeee', 'ffffffffff',
		'gggggggggg', 'hhhhhhhhhh', 'iiiiiiiiii', 'jjjjjjjjjj', 'kkkkkkkkkk', 'llllllllll',
		'mmmmmmmmmm', 'nnnnnnnnnn', 'oooooooooo', 'pppppppppp', 'qqqqqqqqqq', 'rrrrrrrrrr',
		'ssssssssss', 'tttttttttt', 'uuuuuuuuuu', 'vvvvvvvvvv', 'zzzzzzzzzz',

		'aaaaaaaaaa/aaaaaaaaaa', 'bbbbbbbbbb/bbbbbbbbbb', 'cccccccccc/cccccccccc',
		'dddddddddd/dddddddddd', 'eeeeeeeeee/eeeeeeeeee', 'ffffffffff/ffffffffff',
		'gggggggggg/gggggggggg', 'hhhhhhhhhh/hhhhhhhhhh', 'iiiiiiiiii/iiiiiiiiii',
		'jjjjjjjjjj/jjjjjjjjjj', 'kkkkkkkkkk/kkkkkkkkkk', 'llllllllll/llllllllll',
		'mmmmmmmmmm/mmmmmmmmmm', 'nnnnnnnnnn/nnnnnnnnnn', 'oooooooooo/oooooooooo',
		'pppppppppp/pppppppppp', 'qqqqqqqqqq/qqqqqqqqqq', 'rrrrrrrrrr/rrrrrrrrrr',
		'ssssssssss/ssssssssss', 'tttttttttt/tttttttttt', 'uuuuuuuuuu/uuuuuuuuuu',
		'vvvvvvvvvv/vvvvvvvvvv', 'zzzzzzzzzz/zzzzzzzzzz',

		'aaaaaaaaaa/aaaaaaaaaa/aaaaaaaaaa', 'bbbbbbbbbb/bbbbbbbbbb/bbbbbbbbbb', 'cccccccccc/cccccccccc/cccccccccc',
		'dddddddddd/dddddddddd/dddddddddd', 'eeeeeeeeee/eeeeeeeeee/eeeeeeeeee', 'ffffffffff/ffffffffff/ffffffffff',
		'gggggggggg/gggggggggg/gggggggggg', 'hhhhhhhhhh/hhhhhhhhhh/hhhhhhhhhh', 'iiiiiiiiii/iiiiiiiiii/iiiiiiiiii',
		'jjjjjjjjjj/jjjjjjjjjj/jjjjjjjjjj', 'kkkkkkkkkk/kkkkkkkkkk/kkkkkkkkkk', 'llllllllll/llllllllll/llllllllll',
		'mmmmmmmmmm/mmmmmmmmmm/mmmmmmmmmm', 'nnnnnnnnnn/nnnnnnnnnn/nnnnnnnnnn', 'oooooooooo/oooooooooo/oooooooooo',
		'pppppppppp/pppppppppp/pppppppppp', 'qqqqqqqqqq/qqqqqqqqqq/qqqqqqqqqq', 'rrrrrrrrrr/rrrrrrrrrr/rrrrrrrrrr',
		'ssssssssss/ssssssssss/ssssssssss', 'tttttttttt/tttttttttt/tttttttttt', 'uuuuuuuuuu/uuuuuuuuuu/uuuuuuuuuu',
		'vvvvvvvvvv/vvvvvvvvvv/vvvvvvvvvv', 'zzzzzzzzzz/zzzzzzzzzz/zzzzzzzzzz',

		'aaaaa/aaaaa/aaaaa/aaaaa/aaaaa', 'bbbbb/bbbbb/bbbbb/bbbbb/bbbbb', 'ccccc/ccccc/ccccc/ccccc/ccccc',
		'ddddd/ddddd/ddddd/ddddd/ddddd', 'eeeee/eeeee/eeeee/eeeee/eeeee', 'fffff/fffff/fffff/fffff/fffff',
		'ggggg/ggggg/ggggg/ggggg/ggggg', 'hhhhh/hhhhh/hhhhh/hhhhh/hhhhh', 'iiiii/iiiii/iiiii/iiiii/iiiii',
		'jjjjj/jjjjj/jjjjj/jjjjj/jjjjj', 'kkkkk/kkkkk/kkkkk/kkkkk/kkkkk', 'lllll/lllll/lllll/lllll/lllll',
		'mmmmm/mmmmm/mmmmm/mmmmm/mmmmm', 'nnnnn/nnnnn/nnnnn/nnnnn/nnnnn', 'ooooo/ooooo/ooooo/ooooo/ooooo',
		'ppppp/ppppp/ppppp/ppppp/ppppp', 'qqqqq/qqqqq/qqqqq/qqqqq/qqqqq', 'rrrrr/rrrrr/rrrrr/rrrrr/rrrrr',
		'sssss/sssss/sssss/sssss/sssss', 'ttttt/ttttt/ttttt/ttttt/ttttt', 'uuuuu/uuuuu/uuuuu/uuuuu/uuuuu',
		'vvvvv/vvvvv/vvvvv/vvvvv/vvvvv', 'zzzzz/zzzzz/zzzzz/zzzzz/zzzzz',

		'aa/aa/aa/aa/aa/aa/aa/aa', 'bb/bb/bb/bb/bb/bb/bb/bb', 'cc/cc/cc/cc/cc/cc/cc/cc',
		'dd/dd/dd/dd/dd/dd/dd/dd', 'ee/ee/ee/ee/ee/ee/ee/ee', 'ff/ff/ff/ff/ff/ff/ff/ff',
		'gg/gg/gg/gg/gg/gg/gg/gg', 'hh/hh/hh/hh/hh/hh/hh/hh', 'ii/ii/ii/ii/ii/ii/ii/ii',
		'jj/jj/jj/jj/jj/jj/jj/jj', 'kk/kk/kk/kk/kk/kk/kk/kk', 'll/ll/ll/ll/ll/ll/ll/ll',
		'mm/mm/mm/mm/mm/mm/mm/mm', 'nn/nn/nn/nn/nn/nn/nn/nn', 'oo/oo/oo/oo/oo/oo/oo/oo',
		'pp/pp/pp/pp/pp/pp/pp/pp', 'qq/qq/qq/qq/qq/qq/qq/qq', 'rr/rr/rr/rr/rr/rr/rr/rr',
		'ss/ss/ss/ss/ss/ss/ss/ss', 'tt/tt/tt/tt/tt/tt/tt/tt', 'uu/uu/uu/uu/uu/uu/uu/uu',
		'vv/vv/vv/vv/vv/vv/vv/vv', 'zz/zz/zz/zz/zz/zz/zz/zz',

		'aaaaaaaaaa/bbbbbbbbbb', 'eeeeeeeeee/ffffffffff', 'gggggggggg/hhhhhhhhhh',
		'iiiiiiiiii/jjjjjjjjjj', 'kkkkkkkkkk/llllllllll', 'mmmmmmmmmm/nnnnnnnnnn',
		'oooooooooo/pppppppppp', 'qqqqqqqqqq/rrrrrrrrrr', 'ssssssssss/tttttttttt',
		'uuuuuuuuuu/vvvvvvvvvv'
	],

	complex: [

		'aaaaaaaaaa/:aaaaaaaaaa', 'bbbbbbbbbb/:bbbbbbbbbb', 'cccccccccc/:cccccccccc',
		'dddddddddd/:dddddddddd', 'eeeeeeeeee/:eeeeeeeeee', 'ffffffffff/:ffffffffff',
		'gggggggggg/:gggggggggg', 'hhhhhhhhhh/:hhhhhhhhhh', 'iiiiiiiiii/:iiiiiiiiii',
		'jjjjjjjjjj/:jjjjjjjjjj', 'kkkkkkkkkk/:kkkkkkkkkk', 'llllllllll/:llllllllll',
		'mmmmmmmmmm/:mmmmmmmmmm', 'nnnnnnnnnn/:nnnnnnnnnn', 'oooooooooo/:oooooooooo',
		'pppppppppp/:pppppppppp', 'qqqqqqqqqq/:qqqqqqqqqq', 'rrrrrrrrrr/:rrrrrrrrrr',
		'ssssssssss/:ssssssssss', 'tttttttttt/:tttttttttt', 'uuuuuuuuuu/:uuuuuuuuuu',
		'vvvvvvvvvv/:vvvvvvvvvv', 'zzzzzzzzzz/:zzzzzzzzzz',

		'aaaaaaaaaa/:aaaaaaaaaa?/aaaaaaaaaa', 'bbbbbbbbbb/:bbbbbbbbbb?/bbbbbbbbbb', 'cccccccccc/:cccccccccc?/cccccccccc',
		'dddddddddd/:dddddddddd?/dddddddddd', 'eeeeeeeeee/:eeeeeeeeee?/eeeeeeeeee', 'ffffffffff/:ffffffffff?/ffffffffff',
		'gggggggggg/:gggggggggg?/gggggggggg', 'hhhhhhhhhh/:hhhhhhhhhh?/hhhhhhhhhh', 'iiiiiiiiii/:iiiiiiiiii?/iiiiiiiiii',
		'jjjjjjjjjj/:jjjjjjjjjj?/jjjjjjjjjj', 'kkkkkkkkkk/:kkkkkkkkkk?/kkkkkkkkkk', 'llllllllll/:llllllllll?/llllllllll',
		'mmmmmmmmmm/:mmmmmmmmmm?/mmmmmmmmmm', 'nnnnnnnnnn/:nnnnnnnnnn?/nnnnnnnnnn', 'oooooooooo/:oooooooooo?/oooooooooo',
		'pppppppppp/:pppppppppp?/pppppppppp', 'qqqqqqqqqq/:qqqqqqqqqq?/qqqqqqqqqq', 'rrrrrrrrrr/:rrrrrrrrrr?/rrrrrrrrrr',
		'ssssssssss/:ssssssssss?/ssssssssss', 'tttttttttt/:tttttttttt?/tttttttttt', 'uuuuuuuuuu/:uuuuuuuuuu?/uuuuuuuuuu',
		'vvvvvvvvvv/:vvvvvvvvvv?/vvvvvvvvvv', 'zzzzzzzzzz/:zzzzzzzzzz?/zzzzzzzzzz',

		'aaaaa/*/:aaaaa?/:aaaaa/:aaaaa?', 'bbbbb/*/:bbbbb?/:bbbbb/:bbbbb?', '*/ccccc/*/ccccc/*/',
		'ddddd/*/:ddddd?/:ddddd/:ddddd?', 'eeeee/*/:eeeee?/:eeeee/:eeeee?', '*/fffff/*/fffff/*/',
		'ggggg/*/:ggggg?/:ggggg/:ggggg?', 'hhhhh/*/:hhhhh?/:hhhhh/:hhhhh?', '*/iiiii/*/iiiii/*/',
		'jjjjj/*/:jjjjj?/:jjjjj/:jjjjj?', 'kkkkk/*/:kkkkk?/:kkkkk/:kkkkk?', '*/lllll/*/lllll/*/',
		'mmmmm/*/:mmmmm?/:mmmmm/:mmmmm?', 'nnnnn/*/:nnnnn?/:nnnnn/:nnnnn?', '*/ooooo/*/ooooo/*/',
		'ppppp/*/:ppppp?/:ppppp/:ppppp?', 'qqqqq/*/:qqqqq?/:qqqqq/:qqqqq?', '*/rrrrr/*/rrrrr/*/',
		'sssss/*/:sssss?/:sssss/:sssss?', 'ttttt/*/:ttttt?/:ttttt/:ttttt?', '*/uuuuu/*/uuuuu/*/',
		'vvvvv/*/:vvvvv?/:vvvvv/:vvvvv?', 'zzzzz/*/:zzzzz?/:zzzzz/:zzzzz?',

		'aa/:aa?/:aa?/:aa?/:aa?/:aa?/:aa?/:aa?', ':bb/:bb/:bb/:bb/:bb/:bb/:bb/:bb', '*/*/*/*/*/*/*/*',
		'dd/:dd?/:dd?/:dd?/:dd?/:dd?/:dd?/:dd?', ':ee/:ee/:ee/:ee/:ee/:ee/:ee/:ee', '*/*/*/*/*/*/*/*',
		'gg/:gg?/:gg?/:gg?/:gg?/:gg?/:gg?/:gg?', ':hh/:hh/:hh/:hh/:hh/:hh/:hh/:hh', '*/*/*/*/*/*/*/*',
		'jj/:jj?/:jj?/:jj?/:jj?/:jj?/:jj?/:jj?', ':kk/:kk/:kk/:kk/:kk/:kk/:kk/:kk', '*/*/*/*/*/*/*/*',
		'mm/:mm?/:mm?/:mm?/:mm?/:mm?/:mm?/:mm?', ':nn/:nn/:nn/:nn/:nn/:nn/:nn/:nn', '*/*/*/*/*/*/*/*',
		'pp/:pp?/:pp?/:pp?/:pp?/:pp?/:pp?/:pp?', ':qq/:qq/:qq/:qq/:qq/:qq/:qq/:qq', '*/*/*/*/*/*/*/*',
		'ss/:ss?/:ss?/:ss?/:ss?/:ss?/:ss?/:ss?', ':tt/:tt/:tt/:tt/:tt/:tt/:tt/:tt', '*/*/*/*/*/*/*/*',
		'vv/:vv?/:vv?/:vv?/:vv?/:vv?/:vv?/:vv?', ':zz/:zz/:zz/:zz/:zz/:zz/:zz/:zz',

		'*aaaaaaaaaa/bbbbbbbbbb', 'eeeeeeeeee/ffffffffff*', '*gggggggggg/hhhhhhhhhh*',
		'iiiiiiiiii*/jjjjjjjjjj', 'kkkkkkkkkk/*llllllllll', 'mmmmmmmmmm*/*nnnnnnnnnn',
		'*oooooooooo*/*pppppppppp*', '*/rrrrrrrrrr', 'ssssssssss/*',
		'*/*', '/*/*/', '*'
	]
};