---
layout: post
title: Dependency injection with deper.js
---

I haven't worked much with [node.js](http://nodejs.org). Actually, my problem arose when I wanted to start using [Browserify](http://http://browserify.org), that is a tool that makes node code work in the browser. This is nice since testing is much easier and you write all your code in the same way independent if it is run in the browser or on the server. Node.js has removed the not so nice feature of global variables. Instead it uses [CommonJS](http://wiki.commonjs.org/wiki/CommonJS) where you require and export modules.

{% gist 8749985 %}

##This is great! What's your problem?

Well.. the problem is dependency injection. There is none. I know there are people who say that this is something unnecessary
