import React from 'react';

const PRESETS = [
  {
    id: 'classic',
    name: 'Classic',
    fgColor: '#000000',
    bgColor: '#ffffff',
  },
  {
    id: 'soft',
    name: 'Soft',
    fgColor: '#2b2d42',
    bgColor: '#f4f4f0',
  },
  {
    id: 'dark',
    name: 'Dark',
    fgColor: '#ddeb55',
    bgColor: '#181a1b',
  },
];

export default function Customizer({
  settings,
  onChangeSetting,
  onApplyPreset,
}) {
  return (
    <div className="card customizer-card">
      <div className="card-header">
        <h2 className="card-title">Customization</h2>
      </div>

      <div className="card-body">
        <div className="presets-section">
          <label className="field-label">Presets</label>
          <div className="preset-buttons-row">
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className="preset-btn"
                onClick={() => onApplyPreset(preset)}
              >
                <span
                  className="preset-preview-dot"
                  style={{
                    backgroundColor: preset.bgColor,
                    borderColor: preset.fgColor,
                  }}
                >
                  <span
                    className="preset-inner-dot"
                    style={{ backgroundColor: preset.fgColor }}
                  />
                </span>
                <span className="preset-name">{preset.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="colors-grid">
          <div className="color-field">
            <label htmlFor="fg-color" className="field-label">
              Foreground Color
            </label>
            <div className="color-input-container">
              <input
                id="fg-color"
                type="color"
                className="color-picker-input"
                value={settings.fgColor}
                onChange={(e) => onChangeSetting('fgColor', e.target.value)}
              />
              <input
                type="text"
                className="color-hex-input"
                value={settings.fgColor}
                onChange={(e) => onChangeSetting('fgColor', e.target.value)}
                maxLength={7}
              />
            </div>
          </div>

          <div className="color-field">
            <label htmlFor="bg-color" className="field-label">
              Background Color
            </label>
            <div className="color-input-container">
              <input
                id="bg-color"
                type="color"
                className="color-picker-input"
                value={settings.bgColor}
                onChange={(e) => onChangeSetting('bgColor', e.target.value)}
              />
              <input
                type="text"
                className="color-hex-input"
                value={settings.bgColor}
                onChange={(e) => onChangeSetting('bgColor', e.target.value)}
                maxLength={7}
              />
            </div>
          </div>
        </div>

        <div className="field-group">
          <div className="slider-header">
            <label htmlFor="size-slider" className="field-label">
              QR Code Size
            </label>
            <span className="slider-value">{settings.size}px</span>
          </div>
          <input
            id="size-slider"
            type="range"
            min="180"
            max="380"
            step="10"
            className="range-slider"
            value={settings.size}
            onChange={(e) => onChangeSetting('size', Number(e.target.value))}
          />
        </div>

        <div className="field-group">
          <div className="slider-header">
            <label htmlFor="margin-slider" className="field-label">
              Margin / Padding
            </label>
            <span className="slider-value">{settings.margin} units</span>
          </div>
          <input
            id="margin-slider"
            type="range"
            min="0"
            max="6"
            step="1"
            className="range-slider"
            value={settings.margin}
            onChange={(e) => onChangeSetting('margin', Number(e.target.value))}
          />
        </div>

        <div className="field-group">
          <label htmlFor="ec-level-select" className="field-label">
            Error Correction Level
          </label>
          <select
            id="ec-level-select"
            className="select-input"
            value={settings.errorCorrectionLevel}
            onChange={(e) => onChangeSetting('errorCorrectionLevel', e.target.value)}
          >
            <option value="L">L - Low (7% recovery)</option>
            <option value="M">M - Medium (15% recovery)</option>
            <option value="Q">Q - Quartile (25% recovery)</option>
            <option value="H">H - High (30% recovery)</option>
          </select>
          <span className="field-hint">
            Higher levels allow scanning even if the code is slightly obscured.
          </span>
        </div>
      </div>
    </div>
  );
}
