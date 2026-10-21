'use client';

import React from 'react';
import { PipelineGraph } from './PipelineGraph';

interface PipelineViewProps {
  isPaused?: boolean;
  onStateChange?: (isPosted: boolean) => void;
}

export const PipelineView: React.FC<PipelineViewProps> = ({
  isPaused = false,
  onStateChange,
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <PipelineGraph isPaused={isPaused} onStateChange={onStateChange} />
    </div>
  );
};
