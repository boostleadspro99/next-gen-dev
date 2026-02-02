import React, { useState, useEffect } from 'react';
import { ExternalLink, CheckCircle2, Sparkles, TrendingUp, Phone, ShoppingCart, Calendar, MessageCircle } from 'lucide-react';
import { ScoredTemplate } from '../utils/matchingAlgorithm';
import { useLanguage } from '../contexts/LanguageContext';
import { trackDemoOpened, trackStyleSelected } from '../utils/analytics';

interface DemoCardProps {
  template: ScoredTemplate;
  isRecommended?: boolean;
  onSelect?: () => void;
}

const DemoCard: React.FC<DemoCardProps> = ({ template, isRecommended = false, onSelect }) => {
  const { t } = useLanguage();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleOpenDemo = (e: React.MouseEvent) => {
    e.preventDefault();
    // Track demo opened event
    trackDemoOpened(template.id, template.title);
    // Open in new tab
    window.open(template.demoUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSelectStyle = () => {
    if (onSelect) {
      // Track style selected event
      trackStyleSelected(template.id, template.title);
      onSelect();
    }
  };

  // Get typical results based on template goals and industries
  const getTypicalResults = () => {
    const results = [];
    
    // Based on goals
    if (template.goals.includes('appels')) {
      results.push({
        icon: <Phone size={14} className="text-emerald-500" />,
        text: t.designSimulator.results.typical_results.calls || "Appels réguliers"
      });
    }
    if (template.goals.includes('whatsapp')) {
      results.push({
        icon: <MessageCircle size={14} className="text-emerald-500" />,
        text: t.designSimulator.results.typical_results.whattsapp || "Messages WhatsApp"
      });
    }
    if (template.goals.includes('orders')) {
      results.push({
        icon: <ShoppingCart size={14} className="text-emerald-500" />,
        text: t.designSimulator.results.typical_results.orders || "Ventes en ligne"
      });
    }
    if (template.goals.includes('reservations')) {
      results.push({
        icon: <Calendar size={14} className="text-emerald-500" />,
        text: t.designSimulator.results.typical_results.reservations || "Réservations prises"
      });
    }
    
    // Limit to 2-3 results
    return results.slice(0, 3);
  };

  // Handle image loading
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [template.previewImageUrl]);

  return (
    <div className={`bg-[#0A0A0A] border rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl flex flex-col h-full mobile-card ${
      isRecommended 
        ? 'border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.15)]' 
        : 'border-white/10 hover:border-white/20'
    }`}>
      {/* Card Header */}
      <div className="p-6 pb-4 border-b border-white/5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{template.title}</h3>
            <p className="text-neutral-400 text-sm">{template.tagline}</p>
          </div>
          {isRecommended && (
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20" aria-label="Ce modèle est recommandé pour vous">
              <Sparkles size={12} className="text-emerald-400" aria-hidden="true" />
              <span className="text-xs font-bold text-emerald-400">Recommandé</span>
            </div>
          )}
        </div>

        {/* Tags - Limited to 4-5 for scanability */}
        <div className="flex flex-wrap gap-2 mt-3">
          {template.tags.slice(0, 5).map((tag, index) => (
            <span 
              key={index}
              className="px-2.5 py-1 rounded-lg bg-white/5 text-xs text-neutral-300 border border-white/5"
            >
              {tag}
            </span>
          ))}
          {template.tags.length > 5 && (
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-xs text-emerald-400 border border-emerald-500/20">
              +{template.tags.length - 5}
            </span>
          )}
        </div>

        {/* Typical Results Block */}
        <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/5">
          <h5 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <TrendingUp size={14} className="text-emerald-500" aria-hidden="true" />
            {t.designSimulator.results.typical_results_title || "Résultat typique"}
          </h5>
          <ul className="space-y-2">
            {getTypicalResults().map((result, index) => (
              <li key={index} className="flex gap-2 text-sm text-neutral-300">
                {result.icon}
                <span>{result.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Preview Image with Skeleton Loading */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-900 to-black">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-white/20 border-t-emerald-500 rounded-full animate-spin"></div>
            </div>
          </div>
        )}
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center text-neutral-500">
            <ExternalLink size={32} />
          </div>
        ) : (
          <img 
            src={template.previewImageUrl} 
            alt={`Preview of ${template.title}`}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-80' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-3 left-4 text-xs text-white/70 bg-black/40 px-2 py-1 rounded">
          Preview
        </div>
      </div>

      {/* Benefits */}
      <div className="p-6 flex-grow">
        <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <CheckCircle2 size={14} className="text-emerald-500" aria-hidden="true" />
          Ce que vous obtenez :
        </h4>
        <ul className="space-y-2">
          {template.benefits.map((benefit, index) => (
            <li key={index} className="flex gap-2 text-sm text-neutral-300">
              <span className="text-emerald-500 mt-1">•</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Actions - Reordered CTAs */}
      <div className="p-6 pt-4 border-t border-white/5 space-y-3">
        <button
          onClick={handleSelectStyle}
          className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 touch-target"
          aria-label={`Utiliser le style ${template.title}`}
        >
          <Sparkles size={14} aria-hidden="true" />
          {t.designSimulator.confirmation.use_style_button || "Utiliser ce style"}
        </button>
        
        <button
          onClick={handleOpenDemo}
          className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl text-sm transition-all touch-target"
          aria-label={`Voir la démo de ${template.title}`}
        >
          <ExternalLink size={16} aria-hidden="true" />
          {t.designSimulator.results.open_demo_button || "Voir la démo"}
        </button>

        <p className="text-xs text-center text-neutral-500 mt-2">
          {t.designSimulator.results.secure_note || "Ouverture sécurisée dans un nouvel onglet"}
        </p>
      </div>
    </div>
  );
};

export default DemoCard;