var QUnit = require("steal-qunit");
var loader = require("@loader");

var test = QUnit.test;
var stop = QUnit.stop;
var start = QUnit.start;
var equal = QUnit.equal;

function wrapFetch(callback){
	var fetch = loader.fetch;
	loader.fetch = function(load){
		return fetch.apply(this, arguments).then(function(source){
			callback(load.address);
			return source;
		});
	};
	loader.unwrap = function(){
		loader.fetch = fetch;
	};
}

function getQuery(address){
	return address.substr(address.indexOf("?")+1)
}

QUnit.module("cache-bust", {
	setup: function(){
		stop();

		loader = loader.clone();
		loader.set("@loader", loader.newModule({ default: loader, __useDefault: true }));
		loader.env = "window-production";

		delete loader.cacheKey;
		delete loader.cacheVersion;

		loader.import("cache-bust").then(function(){
			start();
		});
	}
});

test("basics works", function(){
	expect(1);

	wrapFetch(function(address){
		var query = getQuery(address);
		var version = query.split("=")[1];

		equal(version, "14", "Correct version number");
	});

	loader.cacheVersion = "14";
	loader.import("test/tests/foo")
		.then(loader.unwrap).then(start);

	stop();
});

test("Overriding the cacheKey works", function(){
	expect(1);

	wrapFetch(function(address){
		var query = getQuery(address);
		var key = query.split("=")[0];

		equal(key, "someKey", "Correctly changed the cacheKey");
	});

	loader.cacheKey = "someKey";
	loader.import("test/tests/foo")
		.then(loader.unwrap).then(start);

	stop();
});

test("works with plugins too", function(){
	expect(2);

	wrapFetch(function(address){
		if(address.indexOf("?") > 0) {
			var query = getQuery(address);
			var parts = query.split("=");

			equal(parts.length, 2, "there should only be one version param and one value");
		}
	});

	loader.cacheVersion = 1;
	loader.import("test/tests/some.txt!test/tests/plugin")
		.then(loader.unwrap).then(start);

	stop();
});
