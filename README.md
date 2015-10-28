# qbus

  - Dynamic queries `/:capture/`, `/:optionalCapture?/`, `/wild*ards/`, `/^RegExp(.*)/i`
  - AMD & CommonJS compatible
  - Works in browser and node completely without hacks, polyfills etc
  - Extensive test suite with 1.500+ tests
  - No dependencies - one file
  - Built in parasitic inheritence
  - Small (~1.5KB gzipped)
  - V8 optimized

[TOC]

<a href="http://unkelpehr.github.io/qbus" target="_blank">Try a live demo of qbus query parser here</a>

##Installation
###Node
```sh
$ npm install qbus
```

###Browser
Download the latest uncompressed in 'lib/index.js'.
<a target="_blank" href="https://marijnhaverbeke.nl/uglifyjs?utf8=on&code_url=https://raw.githubusercontent.com/unkelpehr/qbus/master/lib/index.js&header=/**%20@license%20Licenced%20under%20MIT%20-%20qbus%20-%20%C2%A92015%20Pehr%20Boman%20%3Cgithub.com/unkelpehr%3E%20*/">Or get it compressed using UglifyJS here</a> _via <a href="https://marijnhaverbeke.nl/" target="_blank">https://marijnhaverbeke.nl/</a>_


## General
###Terminology
_Expressions_ are given to the _.on_ and _.once_ methods for matching incoming _queries_.
_Queries_ are given to the _.emit_ function to be ran against the stored _expressions_ looking for a match.

###Introduction
Any string can be an expression but qbus is built with a "path-based" approach _(foo/bar/baz)_ for routing e.g. URLs.

Frontslashes at the beginning and end of the query are ignored. I.e. these queries are identical: `/get/stuff/`, `get/stuff/`, `/get/stuff`, `get/stuff`. The only exception to this rule is when working with wildcards - more on that below.

All queries are as of now case insensitive, an option to control that will probably come in the future.

The context for all `handler` functions is the qbus object or the `parent` object that was passed to the qbus constructor (more on that under _Parasitic inheritence_).

Params extracted from the query will be the first arguments to the `handler` function. Subsequent arguments comes from the emitter:

```js
bus.on('/:one/:two?/:three', function () {
    console.log(arguments); // ['one', 'two', 'three', 'four', 'five', 'six']
}).emit('/one/two/three/', 'four', 'five', 'six');
```

Optional captures is still passed as an argument to keep the arguments object consistent, but their value is set to `undefined`:
```js
bus.on('/:one/:two?/:three', function () {
    console.log(arguments); // ['one', undefined, 'three', 'four', 'five', 'six']
}).emit('/one/three/', 'four', 'five', 'six');
```

## Disadvantages from using static queries
Basic "ordinary" event emitters with static queries are really simple and have unprecedented speed. This is because they can store the events in a lookup-object:

```js
var listeners = {
  hover: [Function, Function, Function],
  click: [Function]
};
```

When a event is to be emitted the handlers is only a key away:

```js
function emit (event, args) {
    var handlers, handler, i;
    
    if (!(handlers = listeners[event])) {
        return; // No listeners for this event
    }
    
    i = 0;
    while ((handler = handlers[i++])) {
        handler.apply(this, args);
    }
}
```

We can't do this because our listeners are listening to e.g. `/admin/users/:userId?/:action`. What usually happens behind the scenes is that the listeners are pushed to an array which is then looped on each `emit` to match all stored expressions against the emitted query:

```js
var subscriptions = [
    { re: /.*/, handler: Function },
    { re: /.*/, handler: Function },
    { re: /.*/, handler: Function },
    { re: /.*/, handler: Function },
    { re: /.*/, handler: Function },
    ...
];
```

```js
function emit (query, args) {
    var sub, match, i;
    
    i = 0;
    while ((sub = listeners[i++])) {
        if ((match = sub.re.exec(query))) {
            sub.handler.apply(this, match.concat(args));
        }
    }
}
```

So if we have ten listeners each on `/admin/users`, `/admin/groups` and `/admin/articles` every emit against `/admin/users` will have to be matched against 30 RegExp objects before running out.

#### What we can do about it
The first thing qbus does to crank up the emitrate is to use string comparison instead of RegExp.exec if the listener-query doesn't use any modifiers.

The second thing we do is to extract the fixed part of the expression and use it for namespacing. So instead of the mega-array mentioned above we can pinpoint and check multiple, smaller arrays for more exact matching.

```js
var subscriptions = {
    '/admin/users/': [
        {re: /.*/, handler: Function},
        {re: /.*/, handler: Function},
        ...
    ],
    '/admin/groups/': [
        {re: /.*/, handler: Function},
        {re: /.*/, handler: Function},
        ...
    ],
    '/admin/articles/': [
        {re: /.*/, handler: Function},
        {re: /.*/, handler: Function},
        ...
    ];
};
```

```js
function emit (query, args) {
    var needle,
        handlers,
        i;
    
    // getFixed("/admin/users/joe/:doWhat/:withWhat?") => "/admin/users/joe"
    needle = getFixed(query);
    
    while (needle) {
        if (!(handlers = subscriptions[needle])) {
            continue;
        }
        
        i = 0;
        while ((sub = handlers[i++)) {
            if (!sub.regexp) {
                // Use string comparison if possible
                if (sub.query == query) {
                   sub.handler.apply(this, args);
                }
            } else if ((match = sub.regexp.exec(needle)) {
                sub.handler.apply(this, match.concat(args));
            }
        }
        
        needle = popNeedle(needle); // "/admin/users/joe"
                                    // "/admin/users"
                                    // "/admin"
                                    // "/"
    }
}
```

So instead of looping through `/admin/groups` and `/admin/articles` looking for subscriptions we now pinpointed potential listeners and went from 30 iterations to 10 + 4. This is a huge speed improvement when the listener count is growing.

The last functionality we can use to speed up routing is to break the loop from within a handler; the equivalent of using `e.stopPropagation()` for DOM events. The natural drawback is that if a handler breaks at `/admin/users/joe/` no handlers at `admin/users/`, `admin/` and `/` will have a chance to execute.

```js
bus.on('/admin/users/joe', function () {
    return false; // Tell qbus to stop the emit loop
});
```

#### What get stored at "/"?
Everything that doesn't begin with a predeterminable portion. I.e. `on('/*')`, `on('/*stuff/')`, `on('/:page')` but also all pure RegExp subscriptions. You'd want to keep this collection small as the expressions stored here will always be matched against.

You can check how your queries are being stored by logging `bus.qbus.paths`.

#### Sooo... how fast is it?
That depends a lot on the complexity and quantity of the listener base. But as a rule of thumb if speed is an issue: avoid `/`, avoid deep paths (every level needs to be checked) and keep all dynamic portions of the expressions far to the right. These for example will all be stored at the same level: `/users`, `/users/:userId?`, `/users/:userId?/:action`, `/user/*` and all has to be matched on any query with `/users` as basename.

The amount of listeners __not__ tuning in on the same static path does not affect eachother. 1 or 1m listeners on `a` does not affect to rate of emitting against `b`.

On this current machine, single core i5 2.90GHz processor running with W7, using a possible old qbus version when you read this:
4,891,286 emits/sec with 1 listener and a static query
4,749,031 emits/sec with 1 listener and a static query _and 1m listeners in another basedir_
2,914,642 emits/sec with 1 listener and a dynamic query

## Usage
```js
var Qbus = require('Qbus'),
    bus = new Qbus(); // `new` keyword is optional
```

### Parasitic inheritance
Qbus will latch on to any object ("_parent_") passed to it's constructor. This is a simple way of extending your own modules with Qbus' functionality. Four functions will be added to `parent`'s properties: `on`, `once`, `off`, `emit` along with a non-enumerable object called `qbus`; where all the subscriptions will be stored.
```js
var Qbus = require('Qbus');

Qbus(myLib); // `myLib` is returned for chaining

myLib.on('stuff', function () {
    // `this` is now `myLib`
}).emit('stuff');
```

Or, if you want to add Qbus' functionality to your constructors prototype:
```js
var $, Qbus = require('Qbus');

function MyLib () {
    Qbus.call(this, MyLib.prototype);
}

$ = new MyLib();

$.on('stuff', function () {
    // `this` is now `myLib`
}).emit('stuff');
```

### .on(<`query`= String|RegExp>, <`handler` = Function>)
Let `handler` execute on given `query`.
```js
bus.on('/users/update', function (user, changes, respond) {
    // Do stuff with user
    respond('OK');
});
```

### .emit(<`query`= String>[, <`arg1` = *>, <`arg2` = *>, ...])
Execute all handlers that matches `query`. Arguments after the mandatory first `query` will be passed to each handler.
```js
bus.emit('/users/update', userObject, {
    name: 'New name'
}, function (res) {
    if (res === 'OK') {
        ...
    }
});
```
### .off(<`query`= String|RegExp>[, <`handler` = Function>])
Remove all listeners with a query that matches `query` and a handler that matches `handler`. If `handler` is undefined all subscriptions for `query` will be removed.  
```js
// Remove all listeners for '/users/update'
bus.off('/users/update');

// Remove all listeners for '/users/update' with 'handleUserUpdate' as handler.
bus.off('/users/update', handleUserUpdate);
```

### .once(<`query`= String|RegExp>, <`handler` = Function>)
Identical to `on` but the handler will only execute once.
```js
// `handleUserUpdate` will only execute once
bus.once('/users/update', handleUserUpdate).emit('/users/update').emit('/users/update');
```
## RegExp queries
Strings and RegExp expressions are interchangable.
```js
// Catch all queries that contains 'users':
bus.on(/(.*users+?.*)/i, function (stuffThatCameAfterdebug) {
    console.log('debug:', stuffThatCameAfterDebug);
}).off(/(.*users+?.*)/i);
```
## Expressions
Qbus supports three modifiers:
  - /:capture
  - /:optionalCapture?
  - /wildcard*

#### /:capture
Mandatory capture of everything between the first frontslash (or beginning of string) and the next frontslash (or end of string).
```js
bus.on('/sysinfo/get/:prop', function (prop) {
    if (prop === 'memoryUsage') { ... }
});
```
#### /:optionalCapture?
By appending a question sign (?) to the end of capture groups the capture becomes optional. If the group isn't matched the argument is still passed but its value is set to `undefined`.
```js
bus.on('/sysinfo/get/:prop?/something/', function (prop) {
    if (prop) {
        if (prop === 'memoryUsage') { ... }
    }
});
```
### Wildcards *
Matches everything at the position of the wildcard if the preceding and subsequent criteria is met. I.e.
```js
// Match everything up until the end of the string.
bus.on('debug*', handler); // `debug/some/stuff/` => `some/stuff`
```

```js
// Match everything up until a frontslash or the end of the string.
bus.on('debug*/', handler);
```
`debug/some/stuff/` will not match the second expression because the criteria says that we should stop matching at the next frontslash.  `debugSomeStuff` will match and yield `SomeStuff` as a parameter to the handler.

Examples of working wildcard expressions:
```js
bus.on('*', handler);
bus.on('*/', handler);
bus.on('/some*', handler);
bus.on('/*thing', handler);
bus.on('/*/user-*/*', handler);
```
