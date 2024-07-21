import { renderHook, waitFor } from '@testing-library/react-native';
import { useDebouncedValue } from '../useDebouncedValue';

describe('useDebouncedValue', () => {
  it('returns initial value', () => {
    const { result } = renderHook(() => useDebouncedValue('Warsaw', 1000));

    expect(result.current).toBe('Warsaw');
  });

  it('returns debounced value', async () => {
    const { result, rerender } = renderHook(value => useDebouncedValue(value, 10), {
      initialProps: 'Warsaw',
    });

    expect(result.current).toBe('Warsaw');

    rerender('Gdansk');

    await waitFor(() => expect(result.current).toBe('Gdansk'));
  });
});
