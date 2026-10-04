export function validateQrInput(type, values) {
  if (!values) {
    return { isValid: false, error: 'Please enter content for your QR code.' };
  }

  switch (type) {
    case 'url': {
      const url = (values.url || '').trim();
      if (!url) {
        return { isValid: false, error: 'Please enter a URL (e.g. example.com).' };
      }
      const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/i;
      const isLocalhost = /^(https?:\/\/)?localhost(:\d+)?(\/.*)?$/i.test(url);
      if (!urlRegex.test(url) && !isLocalhost) {
        return { isValid: false, error: 'Invalid URL. Please enter a valid website address.' };
      }
      return { isValid: true, error: null };
    }

    case 'text': {
      const text = (values.text || '').trim();
      if (!text) {
        return { isValid: false, error: 'Empty text. Please enter some text to generate a QR code.' };
      }
      return { isValid: true, error: null };
    }

    case 'email': {
      const email = (values.email || '').trim();
      if (!email) {
        return { isValid: false, error: 'Please enter an email address.' };
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return { isValid: false, error: 'Invalid email. Please enter a valid email address.' };
      }
      return { isValid: true, error: null };
    }

    case 'phone': {
      const phone = (values.phone || '').trim();
      if (!phone) {
        return { isValid: false, error: 'Please enter a phone number.' };
      }
      const digitsOnly = phone.replace(/\D/g, '');
      const validChars = /^[\d+\s\-()]{3,20}$/.test(phone);
      if (!validChars || digitsOnly.length < 3) {
        return { isValid: false, error: 'Invalid phone number. Please enter digits, optional + and spaces/dashes.' };
      }
      return { isValid: true, error: null };
    }

    case 'wifi': {
      const ssid = (values.ssid || '').trim();
      if (!ssid) {
        return { isValid: false, error: 'Missing Wi-Fi network name (SSID).' };
      }
      const security = values.security || 'WPA';
      const password = values.password || '';
      if (security !== 'nopass' && password.length > 0 && password.length < 5) {
        return { isValid: false, error: 'Wi-Fi password is usually at least 8 characters (WEP min 5).' };
      }
      return { isValid: true, error: null };
    }

    default:
      return { isValid: true, error: null };
  }
}
