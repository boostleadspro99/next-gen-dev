import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepNames?: string[];
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  currentStep, 
  totalSteps,
  stepNames = []
}) => {
  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="relative mb-8">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2"></div>
        
        {/* Progress Line */}
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-emerald-500 -translate-y-1/2 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        ></div>
        
        {/* Step Dots */}
        <div className="relative flex justify-between">
          {Array.from({ length: totalSteps }).map((_, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            
            return (
              <div key={stepNumber} className="relative flex flex-col items-center">
                {/* Step Circle */}
                <div className={`
                  w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300
                  ${isCompleted 
                    ? 'bg-emerald-500 border-emerald-500' 
                    : isCurrent 
                    ? 'bg-emerald-500/20 border-emerald-500' 
                    : 'bg-[#0A0A0A] border-white/20'
                  }
                `}>
                  {isCompleted ? (
                    <CheckCircle2 size={18} className="text-black" />
                  ) : (
                    <span className={`text-sm font-bold ${isCurrent ? 'text-emerald-400' : 'text-neutral-400'}`}>
                      {stepNumber}
                    </span>
                  )}
                </div>
                
                {/* Step Name */}
                {stepNames[index] && (
                  <div className="mt-3 text-center">
                    <span className={`
                      text-xs font-medium block
                      ${isCompleted || isCurrent ? 'text-white' : 'text-neutral-500'}
                    `}>
                      {stepNames[index]}
                    </span>
                    <span className="text-[10px] text-neutral-500 mt-0.5 block">
                      Étape {stepNumber}/{totalSteps}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Trust Microcopy */}
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          <span>Sans engagement</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          <span>Support continu</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          <span>Optimisé mobile</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          <span>SEO local</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;