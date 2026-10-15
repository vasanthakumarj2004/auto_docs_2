import React, { useRef } from 'react';

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  dark?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  dark = false,
  className = '',
  children,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`${dark ? 'spotlight-card-dark' : 'spotlight-card'} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
