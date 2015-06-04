[![Build Status](https://travis-ci.org/stealjs/cache-bust.svg?branch=master)](https://travis-ci.org/stealjs/cache-bust)

# cache-bust

A StealJS and SystemJS cache busting extension.

# Install

You can install through NPM:

```
npm install steal-cache-bust --save
```

You'll then want to copy `node_modules/steal-cache-bust/cache-bust.js` to a location within your project folder.

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

## License

MIT
