import 'core-js/es6/promise';

import test from 'ava';
import getTemplate from '../dist/template-engine.min';

test('Simple variable inclusion', async (t) => {
  const template = 'Hello, "<%= name %>"!';
  const data = await Promise.resolve({name: 'Brother'});
  const compileTemplate = getTemplate(template);

  const result = compileTemplate(data);
  const expected = 'Hello, "Brother"!';
  t.is(result, expected);
});
