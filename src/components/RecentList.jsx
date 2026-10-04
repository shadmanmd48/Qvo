import React from 'react';
import { History, Trash2, ArrowUpRight } from 'lucide-react';

export default function RecentList({
  recents,
  onSelectRecent,
  onClearRecents,
}) {
  if (!recents || recents.length === 0) {
    return (
      <div className="card recents-card">
        <div className="card-header">
          <div className="header-left">
            <History size={16} className="section-icon" />
            <h2 className="card-title">Recent QR Codes</h2>
          </div>
        </div>
        <div className="card-body">
          <p className="empty-recents-text">
            Generated QR codes will appear here so you can reuse them later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card recents-card">
      <div className="card-header">
        <div className="header-left">
          <History size={16} className="section-icon" />
          <h2 className="card-title">Recent QR Codes</h2>
          <span className="count-badge">{recents.length}</span>
        </div>
        <button
          type="button"
          className="btn-text-clear"
          onClick={onClearRecents}
          title="Clear recent QR codes"
        >
          <Trash2 size={13} />
          <span>Clear</span>
        </button>
      </div>

      <div className="card-body recents-list">
        {recents.map((item) => (
          <div
            key={item.id || item.timestamp}
            className="recent-item-row"
            onClick={() => onSelectRecent(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onSelectRecent(item);
              }
            }}
          >
            <div className="recent-item-meta">
              <span className={`recent-type-tag type-${item.type}`}>
                {item.type.toUpperCase()}
              </span>
              <span className="recent-summary" title={item.summary}>
                {item.summary}
              </span>
            </div>
            <button
              type="button"
              className="recent-reuse-btn"
              title="Load this QR code"
              tabIndex={-1}
            >
              <span>Load</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
