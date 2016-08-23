var loader = require("@loader");
var fetch = loader.fetch;
var timestamp = new Date().getTime();

var isBuildEnvironment = loader.isPlatform ?
	(loader.isPlatform("build") || loader.isEnv("build")) :
	(typeof window === "undefined");

loader.fetch = function(load) {
	var loader = this;
	var cacheVersion;
	var cacheKey;
	var cacheKeyVersion;
	
	if (!isBuildEnvironment) {
		cacheVersion = isProduction() ? loader.cacheVersion || timestamp : timestamp;
		cacheKey = loader.cacheKey || "version";
		cacheKeyVersion = cacheKey + "=" + cacheVersion;

		load.address = load.address + (load.address.indexOf('?') === -1 ? '?' : '&') + cacheKeyVersion;
	}
	
	return fetch.call(this, load);
};
	
function isProduction(){
	return (loader.isEnv && loader.isEnv("production")) ||
		loader.env === "production";
}
