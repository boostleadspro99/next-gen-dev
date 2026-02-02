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
    return 'fr'; // Default language
  };

  const [language, setLanguage] = useState<Language>(getStoredLanguage());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', language);
    }
  }, [language]);

  const updateLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const value: LanguageContextType = {
      language,
      setLanguage: updateLanguage,
      t: translations[language],
      dir: (language === 'ar' ? 'rtl' : 'ltr') as 'ltr' | 'rtl' // Explicitly cast here
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
