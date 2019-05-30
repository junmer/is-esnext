// JSON

var code = "{}";
JSON.parse(code);

// Object

var o = Object.create(null);

// Array

Array.isArray([1, 2, 3]); // true
Array.isArray({ foo: 123 }); // false
Array.isArray("foobar"); // false
Array.isArray(undefined); // false
