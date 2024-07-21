export const formatTempValue = (value?: number) => {
  return value || value === 0 ? `${Math.round(value)}°` : '-°';
};
