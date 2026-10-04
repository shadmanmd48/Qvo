import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Download, Copy, CheckCircle2, ArrowLeft, Plus, AlertTriangle } from 'lucide-react';
import { isLowContrast } from '../utils/contrast';
import RecentList from './RecentList';

export default function ResultPage({
  payload,
  summary,
  type,
  settings,
  recents,
  onEdit,
  onCreateNew,
  onSelectRecent,
  onClearRecents,
}) {
  const canvasRef = useRef(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const hasLowContrast = isLowContrast(settings.fgColor, settings.bgColor);

  useEffect(() => {
    if (!payload || !canvasRef.current) return;

    QRCode.toCanvas(canvasRef.current, payload, {
      width: Math.min(settings.size, 320),
      margin: settings.margin,
      color: {
        dark: settings.fgColor,
        light: settings.bgColor,
      },
      errorCorrectionLevel: settings.errorCorrectionLevel,
    });
  }, [payload, settings]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    try {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `qvo-code-${Date.now()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2000);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  const handleCopy = () => {
    if (!canvasRef.current) return;
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
    <div className="result-container">
      <div className="card result-card">
        <div className="result-header">
          <div className="result-badge">
            <span className="result-type-tag">{type.toUpperCase()}</span>
            <span className="result-summary">{summary}</span>
          </div>
          <h2 className="result-title">Your QR Code is Ready</h2>
        </div>

        <div className="result-body">
          {hasLowContrast && (
            <div className="contrast-warning-banner">
              <AlertTriangle size={16} className="warning-icon" />
              <span>High contrast is recommended for better scanning.</span>
            </div>
          )}

          <div className="result-canvas-wrapper">
            <canvas ref={canvasRef} className="qr-canvas" />
          </div>

          <div className="result-actions-main">
            <button
              type="button"
              className="btn btn-primary download-btn"
              onClick={handleDownload}
            >
              {downloadSuccess ? (
                <>
                  <CheckCircle2 size={18} />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download size={18} />
                  <span>Download PNG</span>
                </>
              )}
            </button>

            <button
              type="button"
              className="btn btn-secondary copy-btn"
              onClick={handleCopy}
            >
              {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="result-secondary-nav">
            <button
              type="button"
              className="btn-nav-back"
              onClick={onEdit}
            >
              <ArrowLeft size={15} />
              <span>Edit Details & Colors</span>
            </button>
            <button
              type="button"
              className="btn-nav-new"
              onClick={onCreateNew}
            >
              <Plus size={15} />
              <span>Create Another QR</span>
            </button>
          </div>
        </div>
      </div>

      <div className="result-recents-wrapper">
        <RecentList
          recents={recents}
          onSelectRecent={onSelectRecent}
          onClearRecents={onClearRecents}
        />
      </div>
    </div>
  );
}
