import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { today, validate } from './tradeForm';

describe('today', () => {
  it('returns a string in YYYY-MM-DD format', () => {
    const result = today();
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('returns the current date', () => {
    const mockDate = new Date('2026-02-22T12:00:00Z');
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);

    expect(today()).toBe('2026-02-22');

    vi.useRealTimers();
  });
});

describe('validate', () => {
  it('returns no errors when ticker is provided', () => {
    const errors = validate({ ticker: 'AAPL' });
    expect(errors).toEqual({});
  });

  it('returns a ticker error when ticker is empty', () => {
    const errors = validate({ ticker: '' });
    expect(errors.ticker).toBe('Ticker is required.');
  });

  it('returns a ticker error when ticker is only whitespace', () => {
    const errors = validate({ ticker: '   ' });
    expect(errors.ticker).toBe('Ticker is required.');
  });

  it('does not require any other field', () => {
    const errors = validate({ ticker: 'VOW3', companyName: '', price: '', currency: 'EUR' });
    expect(errors).toEqual({});
  });
});
