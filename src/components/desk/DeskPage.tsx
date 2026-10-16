'use client';
import React, { useEffect } from 'react';
import { Sparkles, Plus, ArrowRight } from 'lucide-react';
import { useRouter } from '../../lib/router';
import { DeskPageConfig, deskPageConfigs } from '../../data/deskPageData';
import { Stepper } from '../ui/Stepper';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { StatBlock } from '../ui/StatBlock';
import { Accordion } from '../ui/Accordion';
import { StickyCtaBar } from '../StickyCtaBar';
import { AnimatedCheckmark } from '../AnimatedCheckmark';

export interface DeskPageProps {
  desk: 'finance' | 'logistics';
  configOverride?: Partial<DeskPageConfig>;
}

export const DeskPage: React.FC<DeskPageProps> = ({ desk, configOverride }) => {
  const { navigate } = useRouter();
  const baseConfig = deskPageConfigs[desk];
  const config: DeskPageConfig = { ...baseConfig, ...configOverride };

  // Sync document title and meta description
  useEffect(() => {
    const originalTitle = document.title;
    document.title = config.seoTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    const originalDescription = metaDescription?.getAttribute('content') || '';
    if (metaDescription) {
      metaDescription.setAttribute('content', config.seoDescription);
    }

    window.scrollTo({ top: 0, behavior: 'instant' });

    return () => {
      document.title = originalTitle;
      if (metaDescription) {
        metaDescription.setAttribute('content', originalDescription);
      }
    };
  }, [config.seoTitle, config.seoDescription]);

  const handleAction = (actionStr: string) => {
    if (actionStr.startsWith('#')) {
      const el = document.getElementById(actionStr.substring(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/#demo');
      }
    } else {
      navigate(actionStr);
    }
  };

  const isFinance = config.desk === 'finance';

  return (
    <div className="bg-white text-slate-800">
      {/* =========================================================================
          SECTION 1: HERO (Identical 2-button layout, ambient dot matrix & glow)
          ========================================================================= */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-[#fdfdfd] pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-dot-matrix opacity-40" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-60" aria-hidden="true">
          <div
            className={`absolute -top-24 left-1/4 h-96 w-96 rounded-full blur-3xl ${
              isFinance
                ? 'bg-gradient-to-br from-orange-100/35 via-blue-100/25 to-transparent'
                : 'bg-gradient-to-br from-teal-100/35 via-emerald-100/25 to-transparent'
            }`}
          />
        </div>

        <div className="site-shell relative z-10">
          <div className="max-w-3xl text-left">
            {/* Tag Pill */}
            <div
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider shadow-2xs font-mono border ${
                isFinance
                  ? 'border-orange-200/90 bg-orange-50/90 text-brand-orange'
                  : 'border-teal-200/90 bg-teal-50/90 text-brand-teal'
              }`}
            >
              <Sparkles size={11} className={isFinance ? 'text-brand-orange' : 'text-brand-teal'} />
              <span>{config.hero.tag}</span>
            </div>

            {/* Headline */}
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[54px] font-extrabold leading-[1.08] tracking-[-0.035em] text-slate-950">
              {config.hero.headlineLine1}
              <br className="hidden sm:inline" />
              {' '}
              {config.hero.headlineLine2}
            </h1>

            {/* Subtext */}
            <p className="mt-6 max-w-2xl text-[15px] sm:text-base leading-relaxed text-slate-600 font-medium">
              {config.hero.subtext}
            </p>

            {/* Two Action Buttons */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button
                variant={isFinance ? 'primary' : 'teal'}
                size="md"
                withArrow
                onClick={() => handleAction(config.hero.primaryButtonAction)}
              >
                {config.hero.primaryButtonText}
              </Button>

              <button
                type="button"
                onClick={() => handleAction(config.hero.secondaryButtonAction)}
                className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-slate-800 transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 hover:-translate-y-0.5 cursor-pointer shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400"
              >
                {config.hero.secondaryButtonText}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: JOURNEY (5 animated steps with new capability highlighted)
          ========================================================================= */}
      <Stepper
        label={config.journeyTitle}
        steps={config.journeySteps}
        theme={config.theme}
      />

      {/* =========================================================================
          SECTION 3: TWO PRODUCT CARDS SIDE BY SIDE WITH A "+" BETWEEN THEM
          ========================================================================= */}
      <section id={isFinance ? 'accounts-payable' : 'retyping-audit'} className="border-b border-slate-200/80 bg-white py-16 sm:py-24 scroll-mt-20">
        <div className="site-shell">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-8 lg:gap-10">
            {/* Left Card: Core Start Here */}
            <Card
              withGhostLayers
              withSpotlight
              accentBorder={config.productCards.leftCard.accentBorder}
              className="flex flex-col justify-between min-h-[290px]"
            >
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 block mb-5">
                  {config.productCards.leftCard.tag}
                </span>

                <div className="space-y-4">
                  {config.productCards.leftCard.checks.map((check, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                      <AnimatedCheckmark delayMs={(idx + 1) * 100} />
                      <span>{check}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100">
                <a
                  href={config.productCards.leftCard.ctaHref}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(config.productCards.leftCard.ctaHref);
                  }}
                  className={`inline-flex items-center gap-1.5 text-sm font-bold hover:underline cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${
                    isFinance ? 'text-brand-blue focus-visible:ring-brand-blue' : 'text-brand-teal focus-visible:ring-brand-teal'
                  }`}
                >
                  {config.productCards.leftCard.ctaText}
                </a>
              </div>
            </Card>

            {/* Centered Large "+" Separator */}
            <div className="flex items-center justify-center py-2 lg:py-0" aria-hidden="true">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-400 text-xl font-bold shadow-2xs">
                <Plus size={20} strokeWidth={2.5} />
              </span>
            </div>

            {/* Right Card: Add On */}
            <Card
              withGhostLayers
              withSpotlight
              accentBorder={config.productCards.rightCard.accentBorder}
              className={`flex flex-col justify-between min-h-[290px] ${
                config.productCards.rightCard.cardBg ? `bg-gradient-to-b ${config.productCards.rightCard.cardBg}` : ''
              }`}
            >
              <div>
                <span
                  className={`font-mono text-xs font-bold uppercase tracking-wider block mb-5 ${
                    isFinance ? 'text-brand-orange' : 'text-brand-teal'
                  }`}
                >
                  {config.productCards.rightCard.tag}
                </span>

                <div className="space-y-4">
                  {config.productCards.rightCard.checks.map((check, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                      <AnimatedCheckmark
                        badgeClassName={config.productCards.rightCard.badgeClassName}
                        delayMs={(idx + 1) * 100 + 50}
                      />
                      <span>{check}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100">
                <a
                  href={config.productCards.rightCard.ctaHref}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(config.productCards.rightCard.ctaHref);
                  }}
                  className={`inline-flex items-center gap-1.5 text-sm font-bold hover:underline cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${
                    isFinance ? 'text-brand-orange hover:text-orange-700 focus-visible:ring-brand-orange' : 'text-brand-teal hover:text-teal-700 focus-visible:ring-brand-teal'
                  }`}
                >
                  {config.productCards.rightCard.ctaText}
                </a>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: CUSTOMER STORY CARD & QUESTIONS BUYERS ASK
          ========================================================================= */}
      <section className="bg-white py-16 sm:py-24">
        <div className="site-shell">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-start">
            {/* Customer Story Card */}
            <Card
              withGhostLayers
              accentBorder="green"
              className="flex flex-col justify-between min-h-[240px]"
            >
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-green block mb-3">
                  CUSTOMER STORY
                </span>

                <h3 className="text-xl font-extrabold text-slate-950 tracking-tight">
                  {config.customerStory.company}
                </h3>

                <div className="mt-4">
                  <StatBlock
                    label=""
                    fromValue={config.customerStory.fromMetric}
                    toValue={config.customerStory.toMetric}
                    subtext={config.customerStory.context}
                    theme={config.customerStory.accentColor}
                  />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <a
                  href={config.customerStory.linkHref}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(config.customerStory.linkHref);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-green hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-brand-green rounded"
                >
                  {config.customerStory.linkText}
                </a>
              </div>
            </Card>

            {/* Questions Buyers Ask Accordion */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-9 shadow-xs">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 block mb-5">
                QUESTIONS BUYERS ASK
              </span>

              <Accordion
                items={config.faqs.map((f, i) => ({
                  id: `faq-${i}`,
                  title: f.question,
                  content: f.answer,
                }))}
                theme={config.theme}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: CLOSING CALL TO ACTION BAND & STICKY BOTTOM CONVERSION BAR
          ========================================================================= */}
      <StickyCtaBar
        theme={config.theme}
        badge={config.closingCta.badge}
        title={config.closingCta.title}
        subtext={config.closingCta.subtext}
        buttonText={config.closingCta.buttonText}
        onButtonClick={() => navigate('/#demo')}
      />
    </div>
  );
};
