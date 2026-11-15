'use client';

import React from 'react';
import { FileText, Bot, GitMerge, BarChart3 } from 'lucide-react';
import s from './IntelligenceLayer.module.css';

interface IntelligenceModule {
  id: string;
  glyph: string;
  icon: React.ComponentType<{
    size?: number;
    className?: string;
    strokeWidth?: number;
    'aria-hidden'?: boolean | 'true' | 'false';
  }>;
  tag: string;
  title: string;
  description: string;
}

const INTELLIGENCE_MODULES: IntelligenceModule[] = [
  {
    id: 'document-intelligence',
    glyph: '▤',
    icon: FileText,
    tag: 'Document Ingestion',
    title: 'Document Intelligence',
    description:
      'Extract, classify and validate information from business documents and email attachments.',
  },
  {
    id: 'ai-agents',
    glyph: '✧',
    icon: Bot,
    tag: 'Autonomous Rules',
    title: 'AI Agents',
    description:
      'Assist with repetitive, multi-step tasks using defined business rules and review checkpoints.',
  },
  {
    id: 'workflow-automation',
    glyph: '⤴',
    icon: GitMerge,
    tag: 'Cross-System Sync',
    title: 'Workflow Automation',
    description:
      'Move information between teams, systems and process stages with fewer manual handoffs.',
  },
  {
    id: 'business-intelligence',
    glyph: '◫',
    icon: BarChart3,
    tag: 'Operational Reporting',
    title: 'Business Intelligence',
    description:
      'Turn operational data into clearer reporting, visibility and decision support.',
  },
];

export function IntelligenceLayer() {
  return (
    <section
      id="intelligence-layer"
      className={s.section}
      aria-labelledby="intelligence-layer-heading"
    >
      <div className="site-shell">
        {/* Header: Left-aligned and styled like "Why Docsynecx" */}
        <div className={s.header}>
          <p className={s.eyebrow}>Intelligence layer</p>
          <h2 id="intelligence-layer-heading" className={s.title}>
            AI that works with your <br />
            <span className={s.titleHighlight}>business processes.</span>
          </h2>
        </div>

        {/* 2x2 Grid with Warm #f7f5f0 Cards */}
        <div className={s.grid}>
          {INTELLIGENCE_MODULES.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.id} className={s.card}>
                <div className={s.cardHeader}>
                  <div className={s.iconWrapper}>
                    <Icon size={20} strokeWidth={2.2} className={s.icon} aria-hidden="true" />
                  </div>
                  <span className={s.glyphTag} aria-label={`Symbol ${item.glyph}`}>
                    <span className={s.glyphSymbol}>{item.glyph}</span>
                    <span className={s.categoryTag}>{item.tag}</span>
                  </span>
                </div>

                <div className={s.cardBody}>
                  <h3 className={s.cardTitle}>{item.title}</h3>
                  <p className={s.cardCopy}>{item.description}</p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Text Styled like .deskText */}
        <p className={s.bottomText}>
          Purpose-built intelligence helps teams reduce repetitive work while retaining visibility and control.
        </p>
      </div>
    </section>
  );
}
