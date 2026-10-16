'use client';
import React, { useState, useRef, useEffect } from 'react';

export interface TabItem {
  id: string;
  label: string;
  badge?: string;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
  onChange?: (tabId: string) => void;
  className?: string;
  tabListClassName?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTabId,
  onChange,
  className = '',
  tabListClassName = '',
}) => {
  const [activeTabId, setActiveTabId] = useState<string>(defaultTabId || tabs[0]?.id || '');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleTabClick = (id: string) => {
    setActiveTabId(id);
    if (onChange) onChange(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    let nextIndex = currentIndex;
    if (e.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    tabRefs.current[nextIndex]?.focus();
    handleTabClick(tabs[nextIndex].id);
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Accessible Tab List */}
      <div
        role="tablist"
        aria-orientation="horizontal"
        className={`flex items-center gap-1.5 border-b border-slate-200/90 pb-2 ${tabListClassName}`}
      >
        {tabs.map((tab, idx) => {
          const isSelected = tab.id === activeTabId;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              role="tab"
              aria-selected={isSelected}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => handleTabClick(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`relative inline-flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono font-bold ${
                    isSelected
                      ? 'bg-slate-800 text-slate-300'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Crossfade Tab Panels */}
      <div className="relative mt-4">
        {tabs.map((tab) => {
          const isSelected = tab.id === activeTabId;
          return (
            <div
              key={tab.id}
              role="tabpanel"
              id={`panel-${tab.id}`}
              aria-labelledby={`tab-${tab.id}`}
              tabIndex={0}
              className={`transition-opacity duration-150 ease-out ${
                isSelected ? 'block opacity-100' : 'hidden opacity-0'
              }`}
            >
              {tab.content}
            </div>
          );
        })}
      </div>
    </div>
  );
};
