var loader = require("@loader");
var fetch = loader.fetch;
var timestamp = new Date().getTime();
var cacheVersion = isProduction() ? loader.cacheVersion || timestamp : timestamp;
var cacheKey = loader.cacheKey || "version";
var cacheKeyVersion = cacheKey + "=" + cacheVersion;

loader.fetch = function(load) {
	if(!load.metadata.plugin || load.metadata.cacheInitial) {
		load.address = load.address + (load.address.indexOf('?') === -1 ? '?' : '&') + cacheKeyVersion;
	} else if(load.metadata.plugin) {
		load.metadata.cacheInitial = true;
	}

	return fetch.call(this, load);
};
	
function isProduction(){
	return (loader.isEnv && loader.isEnv("production")) ||
		loader.env === "production";
}
