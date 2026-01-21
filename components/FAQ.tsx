import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import FadeIn from './FadeIn';
import { useLanguage } from '../contexts/LanguageContext';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t, dir } = useLanguage();

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-6 relative z-10 bg-[#030303]">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/5 text-emerald-500 mb-6 border border-white/10">
                <HelpCircle size={24} />
            </div>
            <h2 className="text-3xl font-semibold text-white tracking-tight mb-4">
              {t.faq.title}
            </h2>
            <p className="text-neutral-400 font-light">
              {t.faq.subtitle}
            </p>
          </div>
        </FadeIn>

        <div className="space-y-4">
          {t.faq.items.map((faq, index) => (
            <FadeIn key={index} delay={index * 50}>
              <div className={`border rounded-xl bg-white/[0.02] overflow-hidden transition-colors duration-300 ${openIndex === index ? 'border-emerald-500/30 bg-emerald-900/5' : 'border-white/5 hover:border-white/10'}`}>
                <button 
                  onClick={() => toggleAccordion(index)}
                  className={`w-full flex items-center justify-between p-6 text-sm md:text-base font-medium text-white hover:bg-white/5 transition-colors focus:outline-none ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                  aria-expanded={openIndex === index}
                >
                  <span className={openIndex === index ? 'text-emerald-400' : 'text-neutral-200'}>{faq.question}</span>
                  <ChevronDown 
                    size={18} 
                    className={`text-neutral-500 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-emerald-500' : ''}`} 
                  />
                </button>
                <div 
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <div className="p-6 pt-0 text-sm text-neutral-400 font-light leading-relaxed border-t border-white/5 mt-2">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;