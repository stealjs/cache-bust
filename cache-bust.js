var loader = require("@loader");

if(loader.env === "production") {
	cacheBust();
}

function cacheBust(){
	var locate = loader.locate;
	loader.locate = function (load) {
		var locatePromise = locate.call(this, load);
		var loader = this;

		return Promise.resolve(locatePromise).then(function (proposedAddress) {
			var cacheVersion = loader.cacheVersion || Math.random();
			var cacheKey = loader.cacheKey || "version";
			var newAddress = proposedAddress + "?" + cacheKey + "=" + cacheVersion;

			return newAddress;
		});
	};
}
