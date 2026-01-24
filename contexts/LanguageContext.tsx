import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from '../data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (typeof translations)['fr' | 'ar'];
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to get language from localStorage, default to 'fr'
  const getStoredLanguage = (): Language => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('preferred-language');
      if (stored === 'fr' || stored === 'ar') {
        return stored;
      }
    }
    return 'fr';
  };

  const [language, setLanguage] = useState<Language>(getStoredLanguage);

  // Wrapper function to update language and save to localStorage
  const updateLanguage = (lang: Language) => {
    console.log('LanguageContext: updating language from', language, 'to', lang);
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', lang);
    }
  };

  useEffect(() => {
    console.log('LanguageContext: useEffect running with language =', language, 'dir will be:', language === 'ar' ? 'rtl' : 'ltr');
    // Update HTML attributes for accessibility and styling
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    
    // Update font family based on language
    if (language === 'ar') {
        document.body.classList.add('font-arabic');
        document.body.classList.remove('font-sans');
    } else {
        document.body.classList.add('font-sans');
        document.body.classList.remove('font-arabic');
    }
  }, [language]);

  const value = {
    language,
    setLanguage: updateLanguage,
    t: translations[language],
    dir: language === 'ar' ? 'rtl' : 'ltr'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};