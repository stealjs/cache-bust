var loader = require("@loader");
var fetch = loader.fetch;
var timestamp = new Date().getTime();

loader.fetch = function(load) {
	var loader = this;
	var cacheVersion = isProduction() ? loader.cacheVersion || timestamp : timestamp;
	var cacheKey = loader.cacheKey || "version";
	var cacheKeyVersion = cacheKey + "=" + cacheVersion;

	load.address = load.address + (load.address.indexOf('?') === -1 ? '?' : '&') + cacheKeyVersion;

	return fetch.call(this, load);
};
	
function isProduction(){
	return (loader.isEnv && loader.isEnv("production")) ||
		loader.env === "production";
}
