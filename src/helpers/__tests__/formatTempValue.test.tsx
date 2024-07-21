import { formatTempValue } from '../formatTempValue';

describe('formatTempValue', () => {
  it.each([
    [10.69, '11°'],
    [10.1, '10°'],
    [-1, '-1°'],
    [0, '0°'],
  ] as const)('returns formatted value with value=%s', (value, valueExpected) => {
    const result = formatTempValue(value);

    expect(result).toBe(valueExpected);
  });

  it('handles falsy value', () => {
    const result = formatTempValue();

    expect(result).toBe('-°');
  });
});
