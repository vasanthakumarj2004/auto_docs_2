'use client';

import React from 'react';

/** Plain, clean static surface for the left hero background. */
export const HeroStageBackdrop: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-transparent" aria-hidden="true" />
  );
};
