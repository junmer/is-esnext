import test from 'ava';
import fs from 'fs';
import path from 'path';
import isEsNext from './index';

const isEsNextStr = name => {
    let code = fs.readFileSync(
        path.join(__dirname, 'test/fixture/' + name + '.js'), 'utf-8'
    );
    return isEsNext(code);
};

const isEsNextBuffer = name => {
  let code = fs.readFileSync(
    path.join(__dirname, "test/fixture/" + name + ".js")
  );
  return isEsNext(code);
};

test('es5', t => {
    t.false(isEsNextStr('es5'));
    t.false(isEsNextBuffer("es5"));
});

test('es6', t => {
    t.true(isEsNextStr('es6'));
    t.true(isEsNextBuffer("es6"));
});
