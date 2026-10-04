import React from 'react';
import { Globe, AlignLeft, Mail, Phone, Wifi } from 'lucide-react';

const TYPES = [
  { id: 'url', label: 'URL', icon: Globe },
  { id: 'text', label: 'Plain Text', icon: AlignLeft },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'phone', label: 'Phone Number', icon: Phone },
  { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
];

export default function TypeSelector({ activeType, onChangeType }) {
  return (
    <div className="type-selector-card">
      <div className="type-selector-label">QR Type</div>
      <div className="type-pill-group">
        {TYPES.map((item) => {
          const Icon = item.icon;
          const isActive = activeType === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`type-pill ${isActive ? 'active' : ''}`}
              onClick={() => onChangeType(item.id)}
            >
              <Icon size={16} className="pill-icon" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
