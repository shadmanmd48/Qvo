import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import TypeSelector from './components/TypeSelector';
import InputForm from './components/InputForm';
import Customizer from './components/Customizer';
import QrPreview from './components/QrPreview';
import ResultPage from './components/ResultPage';
import RecentList from './components/RecentList';

import { formatQrPayload, getPayloadSummary } from './utils/qrHelper';
import { validateQrInput } from './utils/validation';
import { getRecentQrs, saveRecentQr, clearRecentQrs } from './utils/storage';
import './App.css';

const INITIAL_VALUES = {
  url: 'https://github.com',
  text: '',
  email: '',
  subject: '',
  message: '',
  phone: '',
  ssid: '',
  password: '',
  security: 'WPA',
};

const DEFAULT_SETTINGS = {
  size: 240,
  fgColor: '#000000',
  bgColor: '#ffffff',
  errorCorrectionLevel: 'M',
  margin: 2,
};

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [activeType, setActiveType] = useState('url');
  const [formValues, setFormValues] = useState(INITIAL_VALUES);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [recents, setRecents] = useState(() => getRecentQrs());

  const payload = useMemo(() => {
    return formatQrPayload(activeType, formValues);
  }, [activeType, formValues]);

  const validation = useMemo(() => {
    return validateQrInput(activeType, formValues);
  }, [activeType, formValues]);

  const summary = useMemo(() => {
    return getPayloadSummary(activeType, formValues);
  }, [activeType, formValues]);

  const handleChangeField = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleChangeSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApplyPreset = (preset) => {
    setSettings((prev) => ({
      ...prev,
      fgColor: preset.fgColor,
      bgColor: preset.bgColor,
    }));
  };

  const persistCurrentQr = () => {
    if (!validation.isValid || !payload) return;
    const itemToSave = {
      id: `${activeType}-${Date.now()}`,
      type: activeType,
      summary,
      payload,
      values: { ...formValues },
      settings: { ...settings },
      timestamp: Date.now(),
    };
    const updated = saveRecentQr(itemToSave);
    setRecents(updated);
  };

  const handleGenerate = () => {
    if (!validation.isValid || !payload) return;
    persistCurrentQr();
    setCurrentView('result');
  };

  const handleSelectRecent = (item) => {
    if (!item) return;
    setActiveType(item.type);
    if (item.values) {
      setFormValues((prev) => ({
        ...prev,
        ...item.values,
      }));
    }
    if (item.settings) {
      setSettings(item.settings);
    }
    setCurrentView('editor');
  };

  const handleClearRecents = () => {
    const emptied = clearRecentQrs();
    setRecents(emptied);
  };

  const handleReset = () => {
    setFormValues({
      url: '',
      text: '',
      email: '',
      subject: '',
      message: '',
      phone: '',
      ssid: '',
      password: '',
      security: 'WPA',
    });
    setSettings(DEFAULT_SETTINGS);
  };

  const handleCreateNew = () => {
    handleReset();
    setCurrentView('editor');
  };

  return (
    <div className="app-layout">
      <Header currentView={currentView} onNavigate={setCurrentView} />

      {currentView === 'landing' && (
        <LandingPage onStart={() => setCurrentView('editor')} />
      )}

      {currentView === 'editor' && (
        <main className="main-content">
          <section className="left-column" aria-label="QR Configuration">
            <TypeSelector
              activeType={activeType}
              onChangeType={setActiveType}
            />

            <InputForm
              activeType={activeType}
              values={formValues}
              onChangeField={handleChangeField}
              validationError={validation.error}
            />

            <Customizer
              settings={settings}
              onChangeSetting={handleChangeSetting}
              onApplyPreset={handleApplyPreset}
            />
          </section>

          <section className="right-column" aria-label="QR Preview and History">
            <div className="sticky-preview-wrapper">
              <QrPreview
                payload={payload}
                isValid={validation.isValid}
                settings={settings}
                onReset={handleReset}
                onGenerate={handleGenerate}
                onSaveRecent={persistCurrentQr}
              />

              <RecentList
                recents={recents}
                onSelectRecent={handleSelectRecent}
                onClearRecents={handleClearRecents}
              />
            </div>
          </section>
        </main>
      )}

      {currentView === 'result' && (
        <ResultPage
          payload={payload}
          summary={summary}
          type={activeType}
          settings={settings}
          recents={recents}
          onEdit={() => setCurrentView('editor')}
          onCreateNew={handleCreateNew}
          onSelectRecent={handleSelectRecent}
          onClearRecents={handleClearRecents}
        />
      )}
    </div>
  );
}
