import { useState } from 'react';
import { today, validate } from '../utils/tradeForm';
import './TradeEntryForm.css';

const CURRENCIES = ['EUR', 'USD', 'GBP', 'CHF', 'JPY', 'CAD', 'AUD', 'SEK', 'NOK', 'DKK'];

export default function TradeEntryForm() {
  const [formData, setFormData] = useState({
    companyName: '',
    ticker: '',
    date: today(),
    price: '',
    currency: 'EUR',
    exchangeRate: '',
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }

  function handleTickerBlur() {
    setFormData(prev => ({ ...prev, ticker: prev.ticker.toUpperCase().trim() }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(formData);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    console.log('Trade submitted:', formData);
  }

  return (
    <section className="trade-form-wrapper">
      <header className="trade-form-header">
        <h1>Log a Trade</h1>
        <hr className="divider" />
      </header>

      <form className="trade-form" onSubmit={handleSubmit} noValidate>

        <div className="field-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            id="companyName"
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="e.g. Apple Inc."
          />
        </div>

        <div className={`field-group${errors.ticker ? ' field-group--error' : ''}`}>
          <label htmlFor="ticker">
            Ticker <span className="required-mark" aria-hidden="true">*</span>
          </label>
          <input
            id="ticker"
            type="text"
            name="ticker"
            value={formData.ticker}
            onChange={handleChange}
            onBlur={handleTickerBlur}
            placeholder="e.g. AAPL"
            aria-required="true"
            aria-describedby={errors.ticker ? 'ticker-error' : undefined}
          />
          {errors.ticker && (
            <span id="ticker-error" className="field-error" role="alert">
              {errors.ticker}
            </span>
          )}
        </div>

        <div className="field-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            max={today()}
          />
        </div>

        <div className="field-row">
          <div className="field-group field-group--grow">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="0.00"
            />
          </div>

          <div className="field-group">
            <label htmlFor="currency">Currency</label>
            <select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
            >
              {CURRENCIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {formData.currency !== 'EUR' && (
          <div className="field-group">
            <label htmlFor="exchangeRate">Exchange to EUR</label>
            <input
              id="exchangeRate"
              type="number"
              name="exchangeRate"
              value={formData.exchangeRate}
              onChange={handleChange}
              min="0"
              step="0.0001"
              placeholder="e.g. 1.08"
            />
          </div>
        )}

        <hr className="divider divider--form-end" />

        <div className="form-actions">
          <button type="submit" className="btn-submit">Log Trade</button>
        </div>

      </form>
    </section>
  );
}
