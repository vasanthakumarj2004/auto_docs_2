'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'teal' | 'orange' | 'secondary' | 'dark' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  withArrow?: boolean;
  arrowClassName?: string;
  href?: string;
  onNavigate?: (href: string) => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  withArrow = false,
  arrowClassName = '',
  href,
  onNavigate,
  className = '',
  children,
  onClick,
  ...props
}) => {
  const baseStyles =
    'group relative inline-flex items-center justify-center font-bold tracking-tight rounded-lg transition-all duration-200 cursor-pointer select-none active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5',
    md: 'text-xs sm:text-sm px-5 py-2.5 sm:py-3 gap-2',
    lg: 'text-sm sm:text-base px-6 py-3.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-brand-blue text-white shadow-md hover:bg-brand-blue-hover hover:shadow-lg hover:-translate-y-0.5 focus-visible:ring-brand-blue border border-transparent',
    teal:
      'bg-brand-teal text-white shadow-md hover:bg-brand-teal-hover hover:shadow-lg hover:-translate-y-0.5 focus-visible:ring-brand-teal border border-transparent',
    orange:
      'bg-brand-orange text-white shadow-md hover:bg-brand-orange-hover hover:shadow-lg hover:-translate-y-0.5 focus-visible:ring-brand-orange border border-transparent',
    secondary:
      'bg-white text-slate-800 border border-slate-300 shadow-2xs hover:bg-slate-50 hover:border-slate-400 hover:-translate-y-0.5 focus-visible:ring-slate-400',
    dark:
      'bg-brand-navy text-white border border-slate-800 shadow-md hover:bg-brand-navy-light hover:-translate-y-0.5 focus-visible:ring-slate-500',
    ghost:
      'bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-slate-400 border border-transparent',
  };

  const combinedClass = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`.trim();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
    if (href && onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  const content = (
    <>
      <span>{children}</span>
      {withArrow && (
        <ArrowRight
          size={size === 'sm' ? 12 : size === 'lg' ? 16 : 14}
          className={`transition-transform duration-200 group-hover:translate-x-1 flex-shrink-0 ${arrowClassName}`}
          aria-hidden="true"
        />
      )}
    </>
  );

  if (href && !onNavigate) {
    return (
      <a href={href} className={combinedClass}>
        {content}
      </a>
    );
  }

  return (
    <button className={combinedClass} onClick={handleClick} {...props}>
      {content}
    </button>
  );
};
