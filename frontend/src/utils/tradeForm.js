export function today() {
  return new Date().toISOString().split('T')[0];
}

export function validate(data) {
  const errors = {};
  if (!data.ticker.trim()) {
    errors.ticker = 'Ticker is required.';
  }
  return errors;
}
