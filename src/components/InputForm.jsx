import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function InputForm({
  activeType,
  values,
  onChangeField,
  validationError,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="card input-card">
      <div className="card-header">
        <h2 className="card-title">Content Details</h2>
      </div>

      <div className="card-body">
        {activeType === 'url' && (
          <div className="field-group">
            <label htmlFor="url-input" className="field-label">
              Website URL
            </label>
            <input
              id="url-input"
              type="text"
              className="text-input"
              placeholder="e.g. https://github.com or myportfolio.dev"
              value={values.url || ''}
              onChange={(e) => onChangeField('url', e.target.value)}
              autoComplete="off"
            />
            <span className="field-hint">Include http:// or https://, or type the domain directly.</span>
          </div>
        )}

        {activeType === 'text' && (
          <div className="field-group">
            <label htmlFor="text-input" className="field-label">
              Text Content
            </label>
            <textarea
              id="text-input"
              rows={4}
              className="text-input textarea-input"
              placeholder="Type any message, note, code snippet, or plain text..."
              value={values.text || ''}
              onChange={(e) => onChangeField('text', e.target.value)}
            />
            <div className="field-footer">
              <span className="field-hint">Plain text is displayed directly when scanned.</span>
              <span className="char-count">{(values.text || '').length} chars</span>
            </div>
          </div>
        )}

        {activeType === 'email' && (
          <div className="fields-stack">
            <div className="field-group">
              <label htmlFor="email-input" className="field-label">
                Recipient Email Address <span className="required-star">*</span>
              </label>
              <input
                id="email-input"
                type="email"
                className="text-input"
                placeholder="name@example.com"
                value={values.email || ''}
                onChange={(e) => onChangeField('email', e.target.value)}
                autoComplete="off"
              />
            </div>

            <div className="field-group">
              <label htmlFor="subject-input" className="field-label">
                Subject line <span className="optional-tag">(optional)</span>
              </label>
              <input
                id="subject-input"
                type="text"
                className="text-input"
                placeholder="Project inquiry / Hello!"
                value={values.subject || ''}
                onChange={(e) => onChangeField('subject', e.target.value)}
              />
            </div>

            <div className="field-group">
              <label htmlFor="message-input" className="field-label">
                Message Body <span className="optional-tag">(optional)</span>
              </label>
              <textarea
                id="message-input"
                rows={3}
                className="text-input textarea-input"
                placeholder="Write your email draft here..."
                value={values.message || ''}
                onChange={(e) => onChangeField('message', e.target.value)}
              />
            </div>
          </div>
        )}

        {activeType === 'phone' && (
          <div className="field-group">
            <label htmlFor="phone-input" className="field-label">
              Phone Number
            </label>
            <input
              id="phone-input"
              type="tel"
              className="text-input"
              placeholder="e.g. +1 (555) 234-5678"
              value={values.phone || ''}
              onChange={(e) => onChangeField('phone', e.target.value)}
              autoComplete="off"
            />
            <span className="field-hint">Supports international country codes and standard phone formats.</span>
          </div>
        )}

        {activeType === 'wifi' && (
          <div className="fields-stack">
            <div className="field-group">
              <label htmlFor="ssid-input" className="field-label">
                Network Name (SSID) <span className="required-star">*</span>
              </label>
              <input
                id="ssid-input"
                type="text"
                className="text-input"
                placeholder="e.g. Dorm_Room_5G"
                value={values.ssid || ''}
                onChange={(e) => onChangeField('ssid', e.target.value)}
                autoComplete="off"
              />
            </div>

            <div className="field-group">
              <label htmlFor="security-select" className="field-label">
                Security Type
              </label>
              <select
                id="security-select"
                className="select-input"
                value={values.security || 'WPA'}
                onChange={(e) => onChangeField('security', e.target.value)}
              >
                <option value="WPA">WPA / WPA2 / WPA3 (Most common)</option>
                <option value="WEP">WEP (Legacy)</option>
                <option value="nopass">None (Open Network)</option>
              </select>
            </div>

            {values.security !== 'nopass' && (
              <div className="field-group">
                <label htmlFor="password-input" className="field-label">
                  Wi-Fi Password
                </label>
                <div className="password-input-wrapper">
                  <input
                    id="password-input"
                    type={showPassword ? 'text' : 'password'}
                    className="text-input"
                    placeholder="Enter Wi-Fi password"
                    value={values.password || ''}
                    onChange={(e) => onChangeField('password', e.target.value)}
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    className="icon-button toggle-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {validationError && (
          <div className="validation-error-box">
            <AlertCircle size={15} className="error-icon" />
            <span>{validationError}</span>
          </div>
        )}
      </div>
    </div>
  );
}
