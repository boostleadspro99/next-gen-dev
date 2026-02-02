import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Palette, Sparkles, CheckCircle2, MessageCircle, ChevronRight, ArrowRight, Shield, Smartphone, Search, Zap, Edit } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import DemoCard from '../components/DemoCard';
import { 
  getRecommendedTemplates, 
  getAvailableOptions,
  formatIndustryKey,
  formatGoalKey,
  formatStyleKey,
  formatLevelKey,
  type UserPreferences,
  type ScoredTemplate 
} from '../utils/matchingAlgorithm';
import { trackQuizStarted, trackQuizStepCompleted, trackQuizCompleted, trackContinueClicked, trackStyleSelected, trackEvent } from '../utils/analytics';

type WizardStep = 'industry' | 'goal' | 'style' | 'level' | 'results' | 'confirmation';

const DesignSimulator: React.FC = () => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState<WizardStep>('industry');
  const [selectedTemplate, setSelectedTemplate] = useState<ScoredTemplate | null>(null);
  const [recommendedTemplates, setRecommendedTemplates] = useState<ScoredTemplate[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    industry: '',
    goal: '',
    style: '',
    level: ''
  });
  const [leadCapture, setLeadCapture] = useState({
    name: '',
    whatsapp: '',
    receiveOffer: true
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [showError, setShowError] = useState(false);
  const stepRef = useRef<HTMLDivElement>(null);

  const availableOptions = getAvailableOptions();
  const totalSteps = 4;
  const currentStepNumber = currentStep === 'industry' ? 1 :
                          currentStep === 'goal' ? 2 :
                          currentStep === 'style' ? 3 :
                          currentStep === 'level' ? 4 : 4;
  const progress = (currentStepNumber / totalSteps) * 100;

  // Track design simulator start when component mounts
  useEffect(() => {
    trackQuizStarted('design');
  }, []);

  // Auto-scroll to top on step change (mobile)
  useEffect(() => {
    if (window.innerWidth < 768) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep]);

  const handlePreferenceChange = (key: keyof UserPreferences, value: string) => {
    const newPreferences = { ...userPreferences, [key]: value };
    setUserPreferences(newPreferences);
  };

  const handleNext = () => {
    if (!canProceed()) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    setShowError(false);
    setDirection('forward');
    setIsTransitioning(true);

    setTimeout(() => {
      const stepOrder: WizardStep[] = ['industry', 'goal', 'style', 'level', 'results', 'confirmation'];
      const currentIndex = stepOrder.indexOf(currentStep);
      
      // Track step completion and continue click
      trackQuizStepCompleted(currentStep, userPreferences, 'design');
      trackContinueClicked(currentStep, 'design');
      
      if (currentStep === 'level') {
        // Calculate recommendations when completing the last question
        const recommendations = getRecommendedTemplates(userPreferences);
        setRecommendedTemplates(recommendations);
        setCurrentStep('results');
        
        // Track quiz completion when recommendations are ready
        trackQuizCompleted('design', {
          preferences: userPreferences,
          recommendationsCount: recommendations.length
        });
      } else {
        setCurrentStep(stepOrder[currentIndex + 1]);
      }
      
      setIsTransitioning(false);
    }, 200);
  };

  const handlePrevious = () => {
    setDirection('backward');
    setIsTransitioning(true);

    setTimeout(() => {
      const stepOrder: WizardStep[] = ['industry', 'goal', 'style', 'level', 'results', 'confirmation'];
      const currentIndex = stepOrder.indexOf(currentStep);
      
      if (currentStep === 'results') {
        setCurrentStep('level');
      } else {
        setCurrentStep(stepOrder[currentIndex - 1]);
      }
      
      setIsTransitioning(false);
    }, 200);
  };

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 'industry':
        return !!userPreferences.industry;
      case 'goal':
        return !!userPreferences.goal;
      case 'style':
        return !!userPreferences.style;
      case 'level':
        return !!userPreferences.level;
      case 'results':
        return recommendedTemplates.length > 0;
      case 'confirmation':
        return !!selectedTemplate;
      default:
        return false;
    }
  };

  const handleSelectTemplate = (template: ScoredTemplate) => {
    setSelectedTemplate(template);
    setCurrentStep('confirmation');

    // Track style selection
    trackStyleSelected(template.id, template.title);
  };

  const handleEditPreferences = () => {
    setDirection('backward');
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentStep('industry');
      setIsTransitioning(false);
    }, 200);
  };

  const handleLeadCaptureChange = (key: keyof typeof leadCapture, value: string | boolean) => {
    setLeadCapture(prev => ({ ...prev, [key]: value }));
  };

  const handleWhatsAppCTA = () => {
    const phoneNumber = '+212669150662';
    const message = selectedTemplate 
      ? `Bonjour! J'ai choisi le style "${selectedTemplate.title}" sur Komaweb. Pouvez-vous m'envoyer l'offre personnalisée?`
      : `Bonjour! Je suis intéressé par Komaweb. Pouvez-vous m'envoyer plus d'informations?`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Track whatsapp click
    trackEvent('whatsapp_clicked', { 
      templateId: selectedTemplate?.id,
      templateTitle: selectedTemplate?.title,
      step: currentStep
    });
    
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handlePricingCTA = () => {
    // Track pricing CTA click
    trackEvent('cta_pricing_clicked', { 
      templateId: selectedTemplate?.id,
      templateTitle: selectedTemplate?.title,
      step: currentStep
    });
    window.location.href = '/#pricing';
  };

  const handleSubmitLeadCapture = () => {
    // Track lead capture submission
    trackEvent('lead_capture_submitted', { 
      templateId: selectedTemplate?.id,
      templateTitle: selectedTemplate?.title,
      hasName: !!leadCapture.name,
      hasWhatsApp: !!leadCapture.whatsapp,
      receiveOffer: leadCapture.receiveOffer
    });
    
    if (leadCapture.receiveOffer && (leadCapture.whatsapp || leadCapture.name)) {
      handleWhatsAppCTA();
    } else {
      handlePricingCTA();
    }
  };

  // Step Components
  const renderIndustryStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">
          {t.designSimulator.form.industry_label}
        </h2>
        <p className="text-neutral-400">
          {t.designSimulator.form.industry_help}
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {availableOptions.industries.map((industry) => (
          <button
            key={industry}
            onClick={() => handlePreferenceChange('industry', industry)}
            className={`p-5 rounded-xl border-2 transition-all duration-200 touch-target ${
              userPreferences.industry === industry
                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 scale-105'
                : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
            }`}
            aria-pressed={userPreferences.industry === industry}
          >
            <div className="text-sm font-semibold">
              {formatIndustryKey(industry)}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderGoalStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">
          {t.designSimulator.form.goal_label}
        </h2>
        <p className="text-neutral-400">
          {t.designSimulator.form.goal_help}
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {availableOptions.goals.map((goal) => (
          <button
            key={goal}
            onClick={() => handlePreferenceChange('goal', goal)}
            className={`p-5 rounded-xl border-2 transition-all duration-200 touch-target ${
              userPreferences.goal === goal
                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 scale-105'
                : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
            }`}
            aria-pressed={userPreferences.goal === goal}
          >
            <div className="text-sm font-semibold">
              {formatGoalKey(goal)}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStyleStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">
          {t.designSimulator.form.style_label}
        </h2>
        <p className="text-neutral-400">
          {t.designSimulator.form.style_help}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableOptions.styles.map((style) => (
          <button
            key={style}
            onClick={() => handlePreferenceChange('style', style)}
            className={`p-6 rounded-xl border-2 transition-all duration-200 touch-target ${
              userPreferences.style === style
                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 scale-105'
                : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
            }`}
            aria-pressed={userPreferences.style === style}
          >
            <div className="text-base font-semibold">
              {formatStyleKey(style)}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderLevelStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">
          {t.designSimulator.form.level_label}
        </h2>
        <p className="text-neutral-400">
          {t.designSimulator.form.level_help}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {availableOptions.levels.map((level) => (
          <button
            key={level}
            onClick={() => handlePreferenceChange('level', level)}
            className={`p-6 rounded-xl border-2 transition-all duration-200 touch-target ${
              userPreferences.level === level
                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 scale-105'
                : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
            }`}
            aria-pressed={userPreferences.level === level}
          >
            <div className="text-base font-semibold">
              {formatLevelKey(level)}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderResultsStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
          <Sparkles size={16} className="text-emerald-400" />
          <span className="text-sm font-bold text-emerald-400">Recommandations personnalisées</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          {t.designSimulator.results.title}
        </h2>
        <p className="text-neutral-400">
          {t.designSimulator.results.subtitle}
        </p>
      </div>

      {/* Edit Button */}
      <button
        onClick={handleEditPreferences}
        className="w-full md:w-auto mx-auto flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-neutral-300 hover:text-white transition-all mb-6 touch-target-sm"
        aria-label="Modifier vos préférences"
      >
        <Edit size={16} aria-hidden="true" />
        <span>Modifier mes choix</span>
      </button>

      {recommendedTemplates.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedTemplates.map((template, index) => (
              <DemoCard
                key={template.id}
                template={template}
                isRecommended={index === 0}
                onSelect={() => handleSelectTemplate(template)}
              />
            ))}
          </div>

          {/* Customization Reassurance Block */}
          <div className="mt-8 p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-xl text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Edit size={18} className="text-emerald-500" />
              <span className="text-lg font-semibold text-white">
                {t.designSimulator.confirmation.customization_note || "Vous pourrez ajuster couleurs & sections après inscription."}
              </span>
            </div>
            <p className="text-sm text-neutral-400">
              Chaque style peut être entièrement personnalisé selon votre marque et vos préférences.
            </p>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-neutral-400">{t.designSimulator.results.no_results}</p>
        </div>
      )}
    </div>
  );

  const renderConfirmationStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span className="text-sm font-bold text-emerald-400">Confirmation</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          {t.designSimulator.confirmation.title}
        </h2>
        <p className="text-neutral-400 mb-6">
          {t.designSimulator.confirmation.subtitle}
        </p>

        {/* Summary Badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
            <Palette size={14} className="text-emerald-400" />
            <span className="text-sm text-neutral-300">{formatIndustryKey(userPreferences.industry)}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
            <Zap size={14} className="text-emerald-400" />
            <span className="text-sm text-neutral-300">{formatGoalKey(userPreferences.goal)}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
            <Sparkles size={14} className="text-emerald-400" />
            <span className="text-sm text-neutral-300">{formatStyleKey(userPreferences.style)}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
            <Shield size={14} className="text-emerald-400" />
            <span className="text-sm text-neutral-300">{formatLevelKey(userPreferences.level)}</span>
          </div>
        </div>

        {/* Microcopy Reassurance */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span className="text-sm text-neutral-300">{t.designSimulator.confirmation.microcopy}</span>
        </div>
      </div>

      {selectedTemplate ? (
        <>
          {/* Selected Template Info */}
          <div className="mb-8 p-6 bg-white/5 border border-emerald-500/20 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                <img 
                  src={selectedTemplate.previewImageUrl} 
                  alt={selectedTemplate.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-emerald-400">✅</span>
                  <span className="font-bold text-lg">
                    {t.designSimulator.confirmation.selected_label} {selectedTemplate.title}
                  </span>
                </div>
                <p className="text-neutral-300">
                  {t.designSimulator.confirmation.reassurance}
                </p>
              </div>
            </div>
          </div>

          {/* Lead Capture Form */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">
              {t.designSimulator.confirmation.lead_capture.title}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-2" htmlFor="lead-name">
                  {t.designSimulator.confirmation.lead_capture.name_label}
                </label>
                <input
                  id="lead-name"
                  type="text"
                  value={leadCapture.name}
                  onChange={(e) => handleLeadCaptureChange('name', e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-neutral-500 focus:outline-none focus:border-emerald-500/50 min-h-[52px]"
                  placeholder="Votre nom"
                />
              </div>
              
              <div>
                <label className="block text-sm text-neutral-400 mb-2" htmlFor="lead-whatsapp">
                  {t.designSimulator.confirmation.lead_capture.whatsapp_label}
                </label>
                <input
                  id="lead-whatsapp"
                  type="tel"
                  value={leadCapture.whatsapp}
                  onChange={(e) => handleLeadCaptureChange('whatsapp', e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-neutral-500 focus:outline-none focus:border-emerald-500/50 min-h-[52px]"
                  placeholder="+212 6XX XX XX XX"
                />
              </div>
              
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="receiveOffer"
                  checked={leadCapture.receiveOffer}
                  onChange={(e) => handleLeadCaptureChange('receiveOffer', e.target.checked)}
                  className="w-5 h-5 rounded bg-white/5 border border-white/10 text-emerald-500 focus:ring-emerald-500/50"
                />
                <label htmlFor="receiveOffer" className="text-sm text-neutral-300 cursor-pointer">
                  {t.designSimulator.confirmation.lead_capture.checkbox_label}
                </label>
              </div>
              
              <p className="text-xs text-neutral-500 pt-2">
                {t.designSimulator.confirmation.lead_capture.optional_note}
              </p>
            </div>
          </div>

          {/* Trust Messages */}
          <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {t.designSimulator.confirmation.trust_messages.map((message, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-neutral-400">
                <CheckCircle2 size={12} className="text-emerald-500" />
                <span>{message}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleSubmitLeadCapture}
              className="w-full flex items-center justify-center gap-3 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl text-lg transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 touch-target-lg"
            >
              {t.designSimulator.confirmation.use_style_button}
              <ArrowRight size={20} />
            </button>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => selectedTemplate && window.open(selectedTemplate.demoUrl, '_blank', 'noopener,noreferrer')}
                className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition-all touch-target"
              >
                <Smartphone size={16} aria-hidden="true" />
                {t.designSimulator.confirmation.demo_button}
              </button>
              
              <button
                onClick={handleEditPreferences}
                className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl transition-all touch-target"
              >
                <Edit size={16} aria-hidden="true" />
                {t.designSimulator.confirmation.edit_answers_button}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-neutral-400 mb-4">
            {t.designSimulator.confirmation.no_selection}
          </p>
          <button
            onClick={() => setCurrentStep('results')}
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300"
          >
            <ArrowLeft size={16} />
            Retour aux démos
          </button>
        </div>
      )}
    </div>
  );

  // Navigation Buttons
  const renderNavigation = () => {
    if (currentStep === 'results' || currentStep === 'confirmation') {
      return null;
    }

    return (
      <div className="flex justify-between gap-4 mt-8 pt-6 border-t border-white/10">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 'industry'}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all touch-target ${
            currentStep === 'industry'
              ? 'bg-white/5 text-neutral-500 cursor-not-allowed'
              : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
          }`}
          aria-disabled={currentStep === 'industry'}
        >
          <ArrowLeft size={18} />
          {t.designSimulator.form.button_back}
        </button>
        
        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all touch-target ${
            canProceed()
              ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20'
              : 'bg-emerald-500/50 text-black/50 cursor-not-allowed'
          }`}
          aria-disabled={!canProceed()}
        >
          {currentStep === 'level' ? t.designSimulator.form.button_final : t.designSimulator.form.button_next}
          {currentStep !== 'level' && <ChevronRight size={18} />}
          {currentStep === 'level' && <Sparkles size={18} />}
        </button>
      </div>
    );
  };

  // Progress Bar
  const renderProgressBar = () => {
    if (currentStep === 'results' || currentStep === 'confirmation') {
      return null;
    }

    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-neutral-400">
            Étape {currentStepNumber}/{totalSteps}
          </span>
          <span className="text-sm font-bold text-emerald-400">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  };

  // Trust Messages (only show on question steps)
  const renderTrustMessages = () => {
    if (currentStep !== 'results' && currentStep !== 'confirmation') {
      return (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <Shield size={14} />
            <span>Sans engagement</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <MessageCircle size={14} />
            <span>Support continu</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <Smartphone size={14} />
            <span>Optimisé mobile</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <Search size={14} />
            <span>SEO local</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="min-h-screen pt-24 pb-12 px-4 sm:px-6 bg-[#030303] text-white">
      {/* Skip Link for Accessibility */}
      <a href="#design-simulator-content" className="skip-to-content">
        Aller au contenu principal
      </a>
      
      {/* Back to Home */}
      <div className="max-w-4xl mx-auto mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors touch-target-sm"
          aria-label={t.designSimulator.back}
        >
          <ArrowLeft size={16} />
          {t.designSimulator.back}
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        {/* Header with Progress */}
        <div className="text-center mb-8">
          {currentStep !== 'results' && currentStep !== 'confirmation' && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
              <Palette size={16} className="text-emerald-400" />
              <span className="text-sm font-bold text-emerald-400">Simulateur de Style</span>
            </div>
          )}
          
          {/* Error Message Toast */}
          {showError && (
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-red-500/90 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-bounce">
              {t.designSimulator.form.error_message}
            </div>
          )}
        </div>

        {/* Card Container */}
        <div 
          id="design-simulator-content"
          ref={stepRef}
          className={`bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 md:p-10 transition-all duration-300 ${
            isTransitioning 
              ? direction === 'forward' 
                ? 'opacity-0 translate-x-8' 
                : 'opacity-0 -translate-x-8'
              : 'opacity-100 translate-x-0'
          }`}
        >
          {renderProgressBar()}

          {/* Step Content */}
          <div className="min-h-[400px]">
            {currentStep === 'industry' && renderIndustryStep()}
            {currentStep === 'goal' && renderGoalStep()}
            {currentStep === 'style' && renderStyleStep()}
            {currentStep === 'level' && renderLevelStep()}
            {currentStep === 'results' && renderResultsStep()}
            {currentStep === 'confirmation' && renderConfirmationStep()}
          </div>

          {renderNavigation()}
        </div>

        {renderTrustMessages()}
      </div>
    </section>
  );
};

export default DesignSimulator;