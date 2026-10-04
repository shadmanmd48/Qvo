function escapeWifiString(str = '') {
  return str.replace(/([\\;,":])/g, '\\$1');
}

export function formatQrPayload(type, values) {
  if (!values) return '';

  switch (type) {
    case 'url': {
      const rawUrl = (values.url || '').trim();
      if (!rawUrl) return '';
      if (!/^https?:\/\//i.test(rawUrl)) {
        return `https://${rawUrl}`;
      }
      return rawUrl;
    }

    case 'text': {
      return (values.text || '').trim();
    }

    case 'email': {
      const email = (values.email || '').trim();
      if (!email) return '';

      const subject = (values.subject || '').trim();
      const message = (values.message || '').trim();

      const params = [];
      if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
      if (message) params.push(`body=${encodeURIComponent(message)}`);

      const queryString = params.length > 0 ? `?${params.join('&')}` : '';
      return `mailto:${email}${queryString}`;
    }

    case 'phone': {
      const phone = (values.phone || '').trim();
      if (!phone) return '';
      const cleanPhone = phone.replace(/[^\d+]/g, '');
      return `tel:${cleanPhone}`;
    }

    case 'wifi': {
      const ssid = (values.ssid || '').trim();
      if (!ssid) return '';

      const security = values.security || 'WPA';
      const password = values.password || '';

      if (security === 'nopass') {
        return `WIFI:T:nopass;S:${escapeWifiString(ssid)};;`;
      }

      return `WIFI:T:${security};S:${escapeWifiString(ssid)};P:${escapeWifiString(password)};;`;
    }

    default:
      return '';
  }
}

export function getPayloadSummary(type, values) {
  switch (type) {
    case 'url':
      return values.url || 'Empty URL';
    case 'text':
      return values.text ? (values.text.length > 28 ? `${values.text.slice(0, 25)}...` : values.text) : 'Empty Text';
    case 'email':
      return values.email || 'Empty Email';
    case 'phone':
      return values.phone || 'Empty Phone';
    case 'wifi':
      return values.ssid ? `Wi-Fi: ${values.ssid}` : 'Empty Wi-Fi';
    default:
      return 'QR Code';
  }
}
