// for ... of

function* foo() {
  yield 1;
  yield 2;
}

for (let o of foo()) {
  console.log(o);
  // expected output: 1

  break; // closes iterator, triggers return
}


// arrow function

var materials = [
  'Hydrogen',
  'Helium',
  'Lithium',
  'Beryllium'
];

console.log(materials.map(material => material.length));
// expected output: Array [8, 6, 7, 9]


// WeakMap

var wm1 = new WeakMap()