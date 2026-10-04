import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Download, AlertTriangle, CheckCircle2, Copy, RotateCcw, ArrowRight } from 'lucide-react';
import { isLowContrast } from '../utils/contrast';

export default function QrPreview({
  payload,
  isValid,
  settings,
  onReset,
  onGenerate,
  onSaveRecent,
}) {
  const canvasRef = useRef(null);
  const [renderError, setRenderError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const hasLowContrast = isLowContrast(settings.fgColor, settings.bgColor);

  useEffect(() => {
    if (!isValid || !payload || !canvasRef.current) {
      return;
    }

    setRenderError(null);

    QRCode.toCanvas(
      canvasRef.current,
      payload,
      {
        width: settings.size,
        margin: settings.margin,
        color: {
          dark: settings.fgColor,
          light: settings.bgColor,
        },
        errorCorrectionLevel: settings.errorCorrectionLevel,
      },
      (error) => {
        if (error) {
          console.error('QR Render Error:', error);
          setRenderError('Unable to generate QR code with current payload.');
        }
      }
    );
  }, [payload, isValid, settings]);

  const handleDownload = () => {
    if (!canvasRef.current || !isValid) return;

    try {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `qvo-${Date.now()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (onSaveRecent) {
        onSaveRecent();
      }

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2000);
    } catch (err) {
      console.error('Failed to download QR code:', err);
    }
  };

  const handleCopy = async () => {
    if (!canvasRef.current || !isValid) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } catch {
      // Fallback
    }
  };

  return (
    <div className="card preview-card">
      <div className="card-header">
        <h2 className="card-title">Live Preview</h2>
        {onReset && (
          <button
            type="button"
            className="btn-reset"
            onClick={onReset}
            title="Clear all inputs and reset settings"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        )}
      </div>

      <div className="card-body preview-body">
        {hasLowContrast && isValid && (
          <div className="contrast-warning-banner">
            <AlertTriangle size={16} className="warning-icon" />
            <span>High contrast is recommended for better scanning.</span>
          </div>
        )}

        <div className="canvas-wrapper">
          {isValid && payload ? (
            <canvas
              ref={canvasRef}
              className="qr-canvas"
              style={{
                borderRadius: '8px',
                maxWidth: '100%',
                height: 'auto',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
              }}
            />
          ) : (
            <div className="empty-preview-placeholder">
              <div className="placeholder-box">
                <span className="placeholder-icon">◻</span>
                <p className="placeholder-text">
                  Enter your details on the left to generate the QR code
                </p>
              </div>
            </div>
          )}
        </div>

        {renderError && (
          <div className="render-error-text">{renderError}</div>
        )}

        <div className="preview-actions">
          {onGenerate && (
            <button
              type="button"
              className="btn btn-primary generate-main-btn"
              disabled={!isValid || !payload}
              onClick={onGenerate}
            >
              <span>Generate QR Code</span>
              <ArrowRight size={17} />
            </button>
          )}

          <div className="preview-sub-actions">
            <button
              type="button"
              className="btn btn-secondary download-btn-sub"
              disabled={!isValid || !payload}
              onClick={handleDownload}
            >
              {downloadSuccess ? (
                <>
                  <CheckCircle2 size={16} />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download size={16} />
                  <span>Download PNG</span>
                </>
              )}
            </button>

            {isValid && payload && (
              <button
                type="button"
                className="btn btn-secondary copy-btn-sub"
                onClick={handleCopy}
                title="Copy QR image to clipboard"
              >
                {copied ? <CheckCircle2 size={15} /> : <Copy size={15} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
