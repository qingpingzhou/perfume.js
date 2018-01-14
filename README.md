[![Perfume Logo](https://github.com/Zizzamia/perfume.js/blob/master/docs/src/assets/perfume-logo-v0-4-0.png)](http://zizzamia.github.io/perfume/)

# [Perfume.js v0.4.0](http://zizzamia.github.io/perfume/)
[![NPM version](https://badge.fury.io/js/perfume.js.svg)](https://www.npmjs.org/package/perfume.js) [![Build Status](https://travis-ci.org/Zizzamia/perfume.js.svg?branch=master)](https://travis-ci.org/Zizzamia/perfume.js) [![NPM Downloads](http://img.shields.io/npm/dm/perfume.js.svg)](https://www.npmjs.org/package/perfume.js)

> Perfume is a JavaScript library for measuring Short and Long Script, First Contentful Paint ([FCP](https://developers.google.com/web/updates/2017/06/user-centric-performance-metrics#first_paint_and_first_contentful_paint)), Time to Interactive ([TTI](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive)), Component First Paint (CFM), annotating them to the DevTools timeline and reporting the results to Google Analytics.


## User-centric performance metrics

When a user navigates to a web page, they're typically looking for visual feedback to reassure them that everything is going to work as expected.

Is it happening? Is it useful? Is it usable? Is it delightful?
To understand when a page delivers this feedback to its users, we've defined several new metrics:
- First Contentful Paint (FCP)
- Time to Interactive (TTI)
- Component First Paint (CFP)

Luckily, with the addition of a few new browser APIs, measuring these metrics on real devices is finally possible without a lot of hacks or workarounds that can make performance worse.

**Perfume** leverage these new APIs for measuring performance that matters! ⚡️

![Performance Metrics load timeline](https://github.com/Zizzamia/perfume.js/blob/master/docs/src/assets/perf-metrics-load-timeline.png)


## Installing

npm (https://www.npmjs.com/package/perfume.js):

    npm install perfume.js --save


## Importing library

You can import the generated bundle to use the whole library generated by this starter:

```javascript
import Perfume from 'perfume.js';
```

Additionally, you can import the transpiled modules from `dist/es` in case you have a modular library:

```javascript
import Perfume from 'node_modules/perfume.js/dist/es/perfume';
```

Universal Module Definition:

```javascript
import Perfume from 'node_modules/perfume.js/perfume.umd.js';
```


## Start measuring

### First Contentful Paint (FCP)
This metric mark the point, immediately after navigation, when the browser renders pixels to the screen. This is important to the user because it answers the question: is it happening?

**FCP** marks the point when the browser renders the first bit of content from the DOM, which may be text, an image, SVG, or even a <canvas> element.

```javascript
const perfume = new Perfume();
perfume.firstContentfulPaint(); 
// ⚡️ Perfume.js: First Contentful Paint 2029.00 ms
```


### Time to Interactive (TTI)
The metric marks the point at which your application is both visually rendered and capable of reliably responding to user input. An application could be unable to respond to user input for a couple of reasons:
- The JavaScript needed to make the components on the page work hasn't yet loaded;
- There are long tasks blocking the main thread.
The **TTI** metric identifies the point at which the page's initial JavaScript is loaded and the main thread is idle (free of long tasks). See the [metric definition](https://docs.google.com/document/d/1GGiI9-7KeY3TPqS3YT271upUVimo-XiL5mwWorDUD4c/preview#) for in-depth implementation details.

```javascript
const perfume = new Perfume();
perfume.timeToInteractive(); 
// ⚡️ Perfume.js: Time to interactive 2452.07 ms
```


### Annotate metrics in the DevTools
**Performance.mark** ([User Timing API](https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API)) is used to create an application-defined peformance entry in the browser's performance entry buffer.

```javascript
perfume.start('fibonacci');
fibonacci(400);
perfume.end('fibonacci', true); 
// ⚡️ Perfume.js: fibonacci 0.14 ms
```
![Performance Mark](https://github.com/Zizzamia/perfume.js/blob/master/docs/src/assets/performance-mark.png)


### Component First Paint (CFP)
This metric mark the point, immediately after creating a **new component**, when the browser renders pixels to the screen.

```javascript
perfume.start('togglePopover');
$(element).popover('toggle');
perfume.endPaint('togglePopover', true); 
// ⚡️ Perfume.js: togglePopover 10.54 ms
```
![Performance CFP](https://github.com/Zizzamia/perfume.js/blob/master/docs/src/assets/performance-cfp.png)


### Custom Logging
Save the duration and print it out exactly the way you want it.

```javascript
perfume.start('fibonacci');
fibonacci(400);
const duration = this.perfume.end('fibonacci');
perfume.log('Custom logging', duration); 
// ⚡️ Perfume.js: Custom logging 0.14 ms
```


### Google Analytics
To enable Perfume to send your measures to Google Analytics User timing, set the option `enable:true` and a custom [user timing variable](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#timingVar) `timingVar:"name"`.

```javascript
const perfume = new Perfume();
perfume.googleAnalytics.enable = true;
perfume.googleAnalytics.timingVar = "userId";
```
![Performance Analytics](https://github.com/Zizzamia/perfume.js/blob/master/docs/src/assets/performance-analytics.png)



## Develop

 - `npm t`: Run test suite
 - `npm start`: Run `npm run build` in watch mode
 - `npm run test:watch`: Run test suite in [interactive watch mode](http://facebook.github.io/jest/docs/cli.html#watch)
 - `npm run test:prod`: Run linting and generate coverage
 - `npm run build`: Generate bundles and typings
 - `npm run lint`: Lints code
 - `npm run commit`: Commit using conventional commit style ([husky](https://github.com/typicode/husky) will tell you to use it if you haven't :wink:)



## Credits and Specs
Made with ☕️ by [@zizzamia](https://twitter.com/zizzamia) and
I want to thank some friends and projects for the work they did:

- [Leveraging the Performance Metrics that Most Affect User Experience](https://developers.google.com/web/updates/2017/06/user-centric-performance-metrics) for documenting this new User-centric performance metrics;
- [Performance Timeline Level 2](https://w3c.github.io/performance-timeline/) the definition of *PerformanceObserver* in that specification;
- [The Contributors](https://github.com/Zizzamia/perfume.js/graphs/contributors) for their much appreciated Pull Requests and bug reports;
- **you** for the star you'll give this project 😉 and for supporting me by giving my project a try 😄



## Copyright and license
Code and documentation copyright 2018 [Leonardo Zizzamia](https://twitter.com/Zizzamia). Code released under the [MIT license](LICENSE). Docs released under Creative Commons.
