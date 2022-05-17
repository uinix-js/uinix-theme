import assert from 'node:assert';
import test from 'node:test';

import {combineStyles} from '../index.js';

test('combineStyles', async (t) => {
  await t.test('should return null', () => {
    assert.strictEqual(combineStyles(null), null);
  });

  await t.test('should return combined style rule', () => {
    const combinedStyle = combineStyles([]);
    assert.deepEqual(combinedStyle(), {});
  });

  await t.test(
    'should return combined style rule if single style rule is provided',
    () => {
      const rule = (props) => ({
        color: 'red',
        fontSize: props.fontSize,
      });
      const combinedStyle = combineStyles(rule);
      assert.strictEqual(combinedStyle, rule);
    },
  );

  await t.test(
    'should return combined style rule if single style object is provided',
    () => {
      const style = {
        color: 'red',
      };
      const combinedStyle = combineStyles(style);
      assert.strictEqual(combinedStyle(), style);
    },
  );

  await t.test(
    'should return combined style rule if multiple rules/styles are provided',
    () => {
      const rule1 = (props) => ({
        color: 'red',
        fontSize: props.fontSize,
      });
      const rule2 = () => ({
        color: 'blue',
      });
      const style1 = {
        '> h1': {
          color: 'gray',
          ':hover': {
            color: 'white',
          },
        },
      };
      const style2 = {
        '> h1': {
          ':hover': {
            color: 'black',
          },
        },
      };
      const combinedStyle = combineStyles([rule1, rule2, style1, style2]);

      assert.deepEqual(combinedStyle({}), {
        color: 'blue',
        fontSize: undefined,
        '> h1': {
          color: 'gray',
          ':hover': {
            color: 'black',
          },
        },
      });
      assert.deepEqual(
        combinedStyle({
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
      );
    },
  );
});
