import test from 'tape';

import {combineStyles} from '../index.js';

test('combineStyles', (t) => {
  t.equal(combineStyles(null), null, 'should return null');

  t.deepEqual(
    combineStyles([])(),
    {},
    'should return combined style rule returning the empty style if no styles are provided',
  );

  const providedStyleRule = (props) => ({
    color: 'red',
    fontSize: props.fontSize,
  });

  t.equal(
    combineStyles(providedStyleRule),
    providedStyleRule,
    'should return the provided style rule if it is the only rule',
  );

  const providedStyleObject = {
    color: 'red',
  };

  t.equal(
    combineStyles(providedStyleObject)(),
    providedStyleObject,
    'should return a style rule returning the provided style object if it is the only object',
  );

  const style1 = (props) => ({
    color: 'red',
    fontSize: props.fontSize,
  });

  const style2 = () => ({
    color: 'blue',
  });

  const style3 = {
    '> h1': {
      color: 'gray',
      ':hover': {
        color: 'white',
      },
    },
  };

  const style4 = {
    '> h1': {
      ':hover': {
        color: 'black',
      },
    },
  };

  const combinedStyleRule = combineStyles([style1, style2, style3, style4]);

  t.deepEqual(
    combinedStyleRule({}),
    {
      color: 'blue',
      fontSize: undefined,
      '> h1': {
        color: 'gray',
        ':hover': {
          color: 'black',
        },
      },
    },
    'should combine multiple styles based on order of provided styles',
  );

  t.deepEqual(
    combinedStyleRule({
      fontSize: 12,
    }),
    {
      color: 'blue',
      fontSize: 12,
      '> h1': {
        color: 'gray',
        ':hover': {
          color: 'black',
        },
      },
    },
    'should combine multiple styles and combine style rule logic',
  );

  t.end();
});
