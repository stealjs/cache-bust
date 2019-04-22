# cache-bust

[![Join our Slack](https://img.shields.io/badge/slack-join%20chat-611f69.svg)](https://www.bitovi.com/community/slack?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Join our Discourse](https://img.shields.io/discourse/https/forums.bitovi.com/posts.svg)](https://forums.bitovi.com/?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/stealjs/steal/blob/master/license.md)
[![npm version](https://badge.fury.io/js/steal-cache-bust.svg)](http://badge.fury.io/js/steal-cache-bust)
[![Build Status](https://travis-ci.org/stealjs/cache-bust.svg?branch=master)](https://travis-ci.org/stealjs/cache-bust)
[![Greenkeeper badge](https://badges.greenkeeper.io/stealjs/cache-bust.svg)](https://greenkeeper.io/)

A StealJS and SystemJS cache busting extension.

> **Deprecated:** this package is now built into [steal](https://github.com/stealjs/steal/). See the [cacheVersion](https://stealjs.com/docs/config.cacheVersion.html) documentation for more details.

# Install

You can install through NPM:

```
npm install steal-cache-bust --save
```

You'll then want to copy `node_modules/steal-cache-bust/cache-bust.js` to a location within your project folder.  In the future this extension will be included in Steal by default.

# Usage

With StealJS simply include cache-bust as a configDependency.  Assuming you placed it in your root folder:

```json
{
  "system": {
    "configDependencies": [
      "cache-bust"
    ]
  }
}
```

If you prefer leaving cache-bust in your `node_modules` folder you should use the full path to the `cache-bust.js` file:

```json
{
  "system": {
    "configDependencies": [
      "node_modules/steal-cache-bust/cache-bust.js"
    ]
  }
}
```

# Configuration

When not running in production the `cacheVersion` is ignored and a timestamp is added instead.  As some files do not pass through steal no cache busting can be applied to those.  When developing using Chrome as your browser you may want to tick the 'Disable cache (while DevTools is open)' checkbox under *Settings | Preferences | Network* to prevent caching altogether while you are developing.

You can configure cache busting by setting properties on the script tag. You'll probably at least want to set `cacheVersion`.

## cacheVersion

This is the version string that will be appending as a query parameter inwhen running in **production.**  For example if you do:

```html
<script src="node_modules/steal/steal.js" cache-version="14"></script>
```

Then requests will be for:

```
http://example.com/foo/bar.js?version=14
```

This version should be changed for each production release to ensure that the latest code is retrieved from the server.

If you do not specify a `cacheVersion` value a timestamp will be added as the cache busting parameter.  This is not ideal for a production environment as you will lose all the benefits of browser caching.

## cacheKey

By default **"version"** is used as the query param for busting caches but you can use a different string by setting `cacheKey`.

## License

MIT
