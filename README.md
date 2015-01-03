# proxy-setup

Configure setting of web-proxy. It's available on both script and terminal. Currently, works on Mac and Windows, not Linux.
On Mac, need to enter a password of superuser. On Windows, need to restart IE after configuring.


## Install

```shell
npm install -g proxy-setup
```


## Usage

```js
var ps = require('proxy-setup');

// set web-proxy
ps.web.server = 'localhost:8080';
ps.web.server = '127.0.0.1';

// clear web-proxy
ps.web.server = '';

// enable and disable
ps.web.enabled = true;
ps.web.enabled = false;


// save current setting and restore it

console.log(ps.web.enabled) //=> false
console.log(ps.web.server)  //=> ''

ps.web.save();

ps.web.enabled = true;
ps.web.server = 'temp-server:9999';

console.log(ps.web.enabled) //=> true
console.log(ps.web.server)  //=> temp-server:9999

ps.web.restore();

console.log(ps.web.enabled) //=> false
console.log(ps.web.server)  //=> ''
```


```shell
# get information current web-proxy
proxysetup #=> { enabled: true, server: 'localhost:8080' }

# enable web-proxy
proxysetup -e

# disable web-proxy
proxysetup -d

# set web-proxy
proxysetup -h localhost:8080
proxysetup -h 127.0.0.1

# clear web-proxy
proxysetup -h

# set web-proxy and enable
proxysetup -e -h localhost:8080
```


## Test

```shell
npm test
```


## License

Licensed under the MIT license.


## Special thanks to

* [Keiko Kitagawa](http://official.stardust.co.jp/keiko/)
