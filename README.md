# qbus

  - Dynamic queries `/:capture/`, `/:optionalCapture/`, `/wild*ards/`, `/^RegExp(.*)`
  - AMD & CommonJS compatible
  - Works in browser and Node completely without hacks, polyfills etc
  - Extensive test suite
  - No dependencies - one file
  - Built in parasitic inheritence

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

### Usage
```js
var Qbus = require('Qbus'),
    bus = new Qbus(); // `new` keyword is optional
```

##### Parasitic inheritance
Qbus will latch on to any object passed to it's constructor. This is a simple way of extending your own modules with Qbus' functionality. Five functions will be added: `on`, `once`, `off`, `emit` along with a non-enumerable object called `qbus`; where all the subscriptions will be stored.
```js
var Qbus = require('Qbus');

Qbus(myLib); // `myLib` is returned for chaining

myLib.on('stuff', function () {}).emit('stuff');
```

##### .on(<`query`= String|RegExp>, <`handler` = Function>
Let `handler` execute on given `query`.
```js
bus.on('/users/update', function (user, changes, res) {
    // Do stuff with user
    respond('OK');
});
```

##### .emit(<`query`= String>[, <`arg1` = *>, <`arg2` = *>, ...]>
Execute all handlers for given `query`. Arguments after the mandatory first will be passed to each handler.
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
bus.emit('/users/update');
```

##### .once(<`query`= String|RegExp>[, <`handler` = Function>]>
Identical to `on` but the handler will only execute once.
```js
// `handleUpdate` will only execute once
bus.on('/users/update', handleUpdate).emit('/users/update').emit('/users/update');
```
#### RegExp queries
Strings and RegExp expressions are interchangable.
```js
// Catch all queries that begins with 'debug':
bus.on(/^debug(.*)/i, function (stuffThatCameAfterdebug) {
    console.log('debug:', stuffThatCameAfterDebug);
}).off(/^debug:(.*)/i);
```
#### Expressions
Qbus supports three modifiers:
  - /:capture
  - /:optionalCapture?
  - /wildcard*

#### /:capture
Mandatory capture of everyhing between the first frontslash and the next or end of string.
```js
// Catch all queries that begins with 'debug':
bus.on('/sysinfo/get/:prop', function (prop) {
    if (prop === 'memoryUsage') { ... }
});
```
#### /:optionalCapture?
By appending a question sign (?) to the end of capture groups the capture becomes optional. If the group isn't matched the argument is still passed but it's value is set to `undefined`.
```js
// Catch all queries that begins with 'debug':
bus.on('/sysinfo/get/:prop?/something/', function (prop) {
    if (prop) {
        if (prop === 'memoryUsage') { ... }
    }
});
```

 _More will come shortly_
