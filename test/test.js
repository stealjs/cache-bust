var QUnit = require("steal-qunit");
var loader = require("@loader");

var test = QUnit.test;
var stop = QUnit.stop;
var start = QUnit.start;
var equal = QUnit.equal;

function wrapLocate(callback){
	var locate = loader.locate;
	loader.locate = function(){
		return locate.apply(this, arguments).then(function(address){
			callback(address);
			return address;
		});
	};
	loader.unwrap = function(){
		loader.locate = locate;
	};
}

QUnit.module("cache-bust", {
	setup: function(){
		stop();

		loader["delete"]("cache-bust");
		loader["delete"]("test/tests/foo");
		loader.env = "production";

		delete loader.cacheKey;
		delete loader.cacheVersion;

		loader.import("cache-bust").then(function(){
			start();
		});
	}
});

test("basics works", function(){
	expect(1);

	wrapLocate(function(address){
		var query = address.substr(address.indexOf("?")+1);
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

	wrapLocate(function(address){
		var query = address.substr(address.indexOf("?")+1);
		var key = query.split("=")[0];

		equal(key, "someKey", "Correctly changed the cacheKey");
	});

	loader.cacheKey = "someKey";
	loader.import("test/tests/foo")
		.then(loader.unwrap).then(start);

	stop();
});
