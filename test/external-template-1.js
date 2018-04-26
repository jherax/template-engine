import 'core-js/es6/promise';

import test from 'ava';
import getFile from './_getFile';
import getData from './_getData';
import getTemplate from '../dist/template-engine.min';

test('Template from external resource #1', (t) => {
  const expected = [
    '<p>Here\'s a list of 6 items:</p> <ul>',
    '<li style="color: red"> 0 </li>',
    '<li style="color: green"> 1 </li>',
    '<li style="color: blue"> 2 </li>',
    '<li style="color: red"> 3 </li>',
    '<li style="color: green"> 4 </li>',
    '<li style="color: blue"> 5 </li>',
    '</ul>',
  ].join('  ').trim();

  return Promise.all([
    getData(),
    getFile('external-template-1.txt'),
  ]).then(([data, template]) => {
    const compileTemplate = getTemplate(template);
    const result = compileTemplate(data);

    t.is(result, expected);
  });
});
