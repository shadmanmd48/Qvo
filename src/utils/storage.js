const STORAGE_KEY = 'qvo_recent_codes';

export function getRecentQrs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('qr_maker_recent_codes_v1');
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load recent QR codes:', err);
    return [];
  }
}

export function saveRecentQr(newItem) {
  try {
    const current = getRecentQrs();
    const filtered = current.filter(item => item.payload !== newItem.payload);
    const updated = [newItem, ...filtered].slice(0, 6);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save QR code:', err);
    return [];
  }
}

export function clearRecentQrs() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('qr_maker_recent_codes_v1');
    return [];
  } catch (err) {
    console.error('Failed to clear recent QR codes:', err);
    return [];
  }
}
