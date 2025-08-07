import { describe, expect, test } from '@jest/globals';
import { expectStrictType } from './type-test-utils';

describe('type-test-utils', () => {
  test('expectStrictType is defined', () => {
    expect(expectStrictType).toBeDefined();
  });
});
