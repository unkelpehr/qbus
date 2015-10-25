# qbus

  - Dynamic queries `/:capture/`, `/:optionalCapture?/`, `/wild*ards/`, `/^RegExp(.*)/i`
  - AMD & CommonJS compatible
  - Works in browser and Node completely without hacks, polyfills etc
  - Extensive test suite with 1.000+ tests
  - No dependencies - one file
  - Built in parasitic inheritence
  - Small (~1.5KB gzipped)

```js
bus.on('/entries/get/:id?', function (id, res) {
    var html;
    
    if (id) {
        html = render('article', id);
    } else {
        html = render('article-index');
    }
    
    res(html);
});
```

### Behaviour
Queries can be anything but Qbus is built with a "path-based" approach for routing e.g. URLs.

Frontslashes at the beginning and end of the query is ignored. I.e. these queries are identical: `/get/stuff/`, `get/stuff/`, `/get/stuff`, `get/stuff`. The only exception to this rule is when working with wildcards - more on that below.

All queries are as of now case insensitive, an option to control that will probably come in the future.

The context for all `handler` functions is the Qbus object or the `parent` object that was passed to the Qbus constructor (more on that under _Parasitic inheritence_).

Params extracted from the query will be the first arguments to the `handler` function. Subsequent arguments comes from the emitter:

```js
bus.on('/:a/:b/:c', function () {
    console.log(arguments); // [a, b, c, d, e, f]
}).emit('/a/b/c/', 'd', 'e', 'f');
```

Optional captures is still passed as an argument to keep the arguments object consistent, but their value is set to `undefined`:
```js
bus.on('/:a/:b?/:c?', function () {
    console.log(arguments); // [a, undefined, undefined, d, e, f]
}).emit('/a/', 'd', 'e', 'f');
```


##### Wondering how Qbus interprets your queries?
The `parse` function is exposed in the non-enumerable property "qbus":

```js
var regexp = bus.qbus.parse('/users/:userId/');

console.log(regexp instanceof RegExp, regexp);

// true { /^/?users/([^/]+?)/?$/i query: [Function: execQuery] }
```

##### What's `query` doing there?
When matching regex the first match is always the whole string. I.e.
```js
/^/?users/([^/]+?)/?$/i.exec('/users/13'); => ['/users/13', '13']
```

All that 'query' does is shifting the first (whole) match to give the listener exactly what it wants:
```js
var params = /^/?users/([^/]+?)/?$/i.query('/users/13'); => ['13']

handler.apply(this, params.concat(emitArgs));
```

### Disadvantages from using static queries
"Ordinary" event emitters with static queries are really simple and have unprecedented speed. This is because they can store the events in a lookup-object:

```js
var subscriptions = {
  hover: [Function, Function, Function],
  click: [Function]
};
```

When a event is to be emitted the handlers is only a key away:

```js
function emit (event, args) {
    var handlers, handler, i;
    
    if (!(handlers = subscriptions[event])) {
        return; // No listeners for this event
    }
    
    i = 0;
    while ((handler = handlers[i++])) {
        handler.apply(this, args);
    }
}
```

We can't do this. Because our listeners are listening to e.g. `/admin/users/:userId?/:action`. What usually happens behind the scenes is that the subscriptions is added to an array which is then looped on each `emit` to match all stored subscriptions against the emitted query:

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
    while ((sub = subscriptions[i++])) {
        if ((match = sub.re.exec(query))) {
            sub.handler.apply(this, match.concat(args));
        }
    }
}
```

So if we have ten listeners each on `/admin/users`, `/admin/groups`, `/admin/articles` every emit against `/admin/users` will have to be matched against 30 RegExp objects before running out.

##### What we can do about it
The first thing Qbus does to crank up the ops/s is to use string comparison instead of RegExp.exec if the listener-query doesn't use any modifiers.

The second thing we do is to break out the fixed part of the query and store them individually. So instead of the mega-array mentioned above we can pinpoint and check multiple, smaller arrays for more exact matching.

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
        
        needle = popNeedle(needle); // "admin/users/joe/"
                                    // "admin/users/"
                                    // "admin/"
                                    // "/"
    }
}
```

So now, instead of looping through `/admin/groups` and `/admin/articles` looking for subscriptions, we pinpointed potential subscribers and went from 30 iterations to 10 + 4. This is a huge speed improvement when the listener count is growing.

The last functionality we can use to speed up routing is to break the loop from within a handler; the equivalent of using `e.preventDefault(); e.stopPropagation()` for DOM events. The natural drawback is that if a handler breaks at `/admin/users/joe/` no handlers at `admin/users/`, `admin/` and `/` will have a chance to execute.

```js
bus.on('/admin/users/joe', function () {
    return false; // Tell Qbus to stop the emit loop
});
```

##### What get stored at "/"?
Everything that doesn't begin with a predeterminable portion. I.e. `on('/*')`, `on('/*stuff/')`, `on('/:page')` but also all pure RegExp subscriptions. You'd want to keep this collection small as they will always have to be matched against.

You can check how your queries are being stored by logging `bus.qbus.paths`.

### Usage
```js
var Qbus = require('Qbus'),
    bus = new Qbus(); // `new` keyword is optional
```

##### Parasitic inheritance
Qbus will latch on to any object ("_parent_") passed to it's constructor. This is a simple way of extending your own modules with Qbus' functionality. Five functions will be added to `parent`: `on`, `once`, `off`, `emit` along with a non-enumerable object called `qbus`; where all the subscriptions will be stored.
```js
var Qbus = require('Qbus');

Qbus(myLib); // `myLib` is returned for chaining

myLib.on('stuff', function () {
    // `this` is now `myLib`
}).emit('stuff');
```

##### .on(<`query`= String|RegExp>, <`handler` = Function>
Let `handler` execute on given `query`.
```js
bus.on('/users/update', function (user, changes, respond) {
    // Do stuff with user
    respond('OK');
});
```

##### .emit(<`query`= String>[, <`arg1` = *>, <`arg2` = *>, ...]>
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
##### .off(<`query`= String|RegExp>[, <`handler` = Function>]>
Remove all listeners with a query that matches `query` and a handler that matches `handler`. If `handler` is undefined all subscriptions for `query` will be removed.  
```js
// Remove all listeners for '/users/update'
bus.off('/users/update');

// Remove all listeners for '/users/update' with 'handleUserUpdate' as handler.
bus.off('/users/update', handleUserUpdate);
```

##### .once(<`query`= String|RegExp>[, <`handler` = Function>]>
Identical to `on` but the handler will only execute once.
```js
// `handleUserUpdate` will only execute once
bus.once('/users/update', handleUserUpdate).emit('/users/update').emit('/users/update');
```
#### RegExp queries
Strings and RegExp expressions are interchangable.
```js
// Catch all queries that contains 'users':
bus.on(/(.*users+?.*)/i, function (stuffThatCameAfterdebug) {
    console.log('debug:', stuffThatCameAfterDebug);
}).off(/(.*users+?.*)/i);
```
#### Expressions
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
#### Wildcards *
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
