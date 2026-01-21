import React, { useEffect, useRef, useState } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  fullWidth?: boolean;
}

const FadeIn: React.FC<FadeInProps> = ({ 
  children, 
  delay = 0, 
  className = '', 
  direction = 'up',
  fullWidth = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Safety timeout: ensure content becomes visible eventually even if observer fails
    const safetyTimer = setTimeout(() => {
      if (!isVisible) setIsVisible(true);
    }, 1000 + delay);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
          clearTimeout(safetyTimer);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' 
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
      clearTimeout(safetyTimer);
    };
  }, [delay, isVisible]);

  const getTransform = () => {
    if (isVisible) return 'translate-x-0 translate-y-0';
    
    switch (direction) {
      case 'up': return 'translate-y-12';
      case 'down': return '-translate-y-12';
      case 'left': return 'translate-x-12';
      case 'right': return '-translate-x-12';
      default: return '';
    }
  };

  const getOpacity = () => isVisible ? 'opacity-100' : 'opacity-0';

  const transitionStyle = {
    transitionDuration: '1000ms',
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    transitionDelay: `${delay}ms`
  };

  return (
    <div
      ref={ref}
      className={`transition-all will-change-[opacity,transform] ${getOpacity()} ${getTransform()} ${className} ${fullWidth ? 'w-full' : ''}`}
      style={transitionStyle}
    >
      {children}
    </div>
  );
};

export default FadeIn;