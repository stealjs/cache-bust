[![Build Status](https://travis-ci.org/stealjs/cache-bust.svg?branch=master)](https://travis-ci.org/stealjs/cache-bust)
[![npm version](https://badge.fury.io/js/steal-cache-bust.svg)](http://badge.fury.io/js/steal-cache-bust)

# cache-bust

A StealJS and SystemJS cache busting extension.

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

# Configuration

You can configure cache busting by setting properties on the script tag. You'll probably at least want to set `cacheVersion`.

## cacheVersion

This is the version string that will be appending as a query parameter.  For example if you do:

```html
<script src="node_modules/steal/steal.js" cache-version="14"></script>
```

Then requests will be for:

```
http://example.com/foo/bar.js?version=14
```

## cacheKey

By default **"version"** is used as the query param for busting caches but you can use a different string by setting `cacheKey`.

## License

MIT
