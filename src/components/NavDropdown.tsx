'use client';
import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  Receipt,
  Truck,
  Workflow,
  Calculator,
  Database,
  HelpCircle,
  ArrowRight,
  Sparkles,
  LucideIcon,
} from 'lucide-react';

interface DropdownItem {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  badge?: string;
}

interface NavDropdownProps {
  onNavigate: (href: string) => void;
  currentPath: string;
}

interface DeskCardSlide {
  id: 'finance' | 'logistics';
  badgeLabel: string;
  badgeDotColor: string;
  badgeBg: string;
  badgeBorder: string;
  badgeTextColor: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  ctaText: string;
  ctaButtonClass: string;
}

export const NavDropdown: React.FC<NavDropdownProps> = ({ onNavigate, currentPath }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [activeSlide, setActiveSlide] = useState<0 | 1>(0);
  const [isHoveredCard, setIsHoveredCard] = useState(false);

  const isOpenRef = useRef(false);
  const isPinnedRef = useRef(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync refs with state
  useEffect(() => {
    isOpenRef.current = isOpen;
    isPinnedRef.current = isPinned;
  }, [isOpen, isPinned]);

  // Clear pending timers on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // 8-second auto-rotation between Finance Desk and Logistics Desk
  useEffect(() => {
    if (isHoveredCard) return; // Pause rotation when user hovers over card to inspect or click
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === 0 ? 1 : 0));
    }, 8000); // 8 seconds per desk

    return () => clearInterval(interval);
  }, [isHoveredCard]);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        isOpenRef.current = false;
        isPinnedRef.current = false;
        setIsOpen(false);
        setIsPinned(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpenRef.current) {
        isOpenRef.current = false;
        isPinnedRef.current = false;
        setIsOpen(false);
        setIsPinned(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Hover intent handlers with debouncing
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      isOpenRef.current = true;
      setIsOpen(true);
    }, 50);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (isPinnedRef.current) return;
    timeoutRef.current = setTimeout(() => {
      if (!isPinnedRef.current) {
        isOpenRef.current = false;
        setIsOpen(false);
      }
    }, 250);
  };

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (isOpenRef.current && isPinnedRef.current) {
      isOpenRef.current = false;
      isPinnedRef.current = false;
      setIsOpen(false);
      setIsPinned(false);
    } else {
      isOpenRef.current = true;
      isPinnedRef.current = true;
      setIsOpen(true);
      setIsPinned(true);
    }
  };

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    isOpenRef.current = false;
    isPinnedRef.current = false;
    setIsOpen(false);
    setIsPinned(false);
    onNavigate(href);
  };

  // Products and Workflows (Exact previous data from docsynecx)
  const products: DropdownItem[] = [
    {
      href: '/finance',
      label: 'Invoice Automation',
      description: 'Tally & ERP automation, auto-post vouchers',
      icon: Receipt,
      iconBg: 'bg-brand-lavender/70',
      iconColor: 'text-brand-blue',
      badge: 'Popular',
    },
    {
      href: '/logistics',
      label: 'Logistics & Supply Chain',
      description: 'CargoWise & shipment documents sync',
      icon: Truck,
      iconBg: 'bg-brand-mint/70',
      iconColor: 'text-brand-teal',
    },
    {
      href: '#how-it-works',
      label: 'Workflows & Approvals',
      description: 'Configurable approval flows & rule engine',
      icon: Workflow,
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
    },
  ];

  // Integrations & Tools (Exact previous data from docsynecx)
  const tools: DropdownItem[] = [
    {
      href: '/calculator',
      label: 'Free ROI Calculator',
      description: 'Calculate monthly hours & INR saved',
      icon: Calculator,
      iconBg: 'bg-orange-50',
      iconColor: 'text-brand-orange',
      badge: 'Live',
    },
    {
      href: '/finance',
      label: 'Tally & ERP Integrations',
      description: 'Direct connectors for TallyPrime & Zoho',
      icon: Database,
      iconBg: 'bg-blue-50',
      iconColor: 'text-brand-blue',
    },
    {
      href: '#faq',
      label: 'FAQ & Help Center',
      description: 'GST validation, security & exception rules',
      icon: HelpCircle,
      iconBg: 'bg-slate-100',
      iconColor: 'text-slate-600',
    },
  ];

  // Alternating Desk Cards for Finance & Logistics (8-second cycle)
  const deskSlides: DeskCardSlide[] = [
    {
      id: 'finance',
      badgeLabel: 'Finance Desk',
      badgeDotColor: 'bg-brand-blue',
      badgeBg: 'bg-blue-50/80',
      badgeBorder: 'border-blue-200',
      badgeTextColor: 'text-brand-blue',
      title: 'Approve the bill. The entry posts itself.',
      description: 'Eliminate 95% of manual data entry into Tally & ERP with AI 3-way line item match.',
      imageSrc: '/images/finance-desk-card.jpg',
      imageAlt: 'Docsynecx Finance Desk - Invoice Automation & Tally Voucher Sync',
      href: '/finance',
      ctaText: 'Explore Finance Desk',
      ctaButtonClass: 'bg-brand-blue hover:bg-brand-blue-hover text-white',
    },
    {
      id: 'logistics',
      badgeLabel: 'Logistics Desk',
      badgeDotColor: 'bg-brand-teal',
      badgeBg: 'bg-emerald-50/80',
      badgeBorder: 'border-emerald-200',
      badgeTextColor: 'text-brand-teal',
      title: 'Read the manifest. The job creates itself.',
      description: 'Turn booking emails, manifests & shipping bills into structured CargoWise TMS jobs.',
      imageSrc: '/images/logistics-desk-card.jpg',
      imageAlt: 'Docsynecx Logistics Desk - Freight Forwarding & CargoWise Sync',
      href: '/logistics',
      ctaText: 'Explore Logistics Desk',
      ctaButtonClass: 'bg-brand-teal hover:bg-brand-teal-hover text-white',
    },
  ];

  const currentSlide = deskSlides[activeSlide];

  const isChildActive = (href: string) => {
    if (href.startsWith('#')) return false;
    return currentPath === href;
  };

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Navbar Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={handleTriggerClick}
        onKeyDown={(e) => {
          if ((e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') && !isOpen) {
            e.preventDefault();
            setIsOpen(true);
            setIsPinned(true);
          }
        }}
        className={`group inline-flex items-center gap-1.5 py-1 text-[13px] font-semibold transition-colors focus:outline-none cursor-pointer rounded-md ${
          isOpen ? 'text-brand-blue' : 'text-slate-600 hover:text-slate-950'
        } focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls="resources-mega-dropdown"
        id="resources-menu-trigger"
      >
        <span>Resources</span>
        <ChevronDown
          size={12}
          className={`transition-transform duration-200 ease-out ${
            isOpen ? 'rotate-180 text-brand-blue' : 'text-slate-400 group-hover:text-slate-700'
          }`}
          aria-hidden="true"
        />
      </button>

      {/* Invisible Hover Bridge & Mega Menu Panel Container */}
      <div
        ref={panelRef}
        id="resources-mega-dropdown"
        role="menu"
        aria-labelledby="resources-menu-trigger"
        onMouseEnter={() => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          setIsOpen(true);
        }}
        onMouseLeave={handleMouseLeave}
        className={`absolute left-1/2 -translate-x-1/2 top-full pt-2.5 z-[60] w-[750px] max-w-[calc(100vw-2rem)] transition-all duration-200 ease-out ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto visible'
            : 'opacity-0 -translate-y-2 pointer-events-none invisible'
        }`}
      >
        {/* Anti-flicker invisible hover bridge */}
        <div
          className="absolute -top-5 -left-10 -right-10 h-7 pointer-events-auto"
          aria-hidden="true"
          onMouseEnter={() => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setIsOpen(true);
          }}
        />

        {/* The Card Surface */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_20px_48px_-10px_rgba(11,19,48,0.18),0_6px_20px_-4px_rgba(11,19,48,0.08)]">
          <div className="flex divide-x divide-slate-100">
            {/* Left Columns: Products & Tools (Exact previous contents) */}
            <div className="flex-1 p-5 bg-white">
              <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                {/* Column 1: Products */}
                <div>
                  <div className="mb-2 px-2.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                    Products & Automation
                  </div>
                  <div className="flex flex-col gap-1">
                    {products.map((item) => {
                      const Icon = item.icon;
                      const active = isChildActive(item.href);
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          onClick={(e) => handleLinkClick(item.href, e)}
                          role="menuitem"
                          className={`group flex items-start gap-3 rounded-xl p-2.5 transition-all duration-150 ${
                            active
                              ? 'bg-brand-lavender/30 text-brand-blue'
                              : 'text-slate-700 hover:bg-slate-50/90 hover:text-brand-blue'
                          } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue`}
                        >
                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.iconBg} ${item.iconColor} transition-transform duration-200 group-hover:scale-105 group-hover:translate-x-0.5`}
                            aria-hidden="true"
                          >
                            <Icon size={16} />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[12.5px] font-bold text-slate-900 group-hover:text-brand-blue transition-colors leading-tight">
                                {item.label}
                              </span>
                              {item.badge && (
                                <span className="rounded-full bg-brand-blue/10 px-1.5 py-0.5 text-[9px] font-extrabold text-brand-blue tracking-wide uppercase">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="mt-0.5 text-[11px] font-medium text-slate-500 line-clamp-1 leading-normal">
                              {item.description}
                            </p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Column 2: Tools & Knowledge */}
                <div>
                  <div className="mb-2 px-2.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                    Tools & Integrations
                  </div>
                  <div className="flex flex-col gap-1">
                    {tools.map((item) => {
                      const Icon = item.icon;
                      const active = isChildActive(item.href);
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          onClick={(e) => handleLinkClick(item.href, e)}
                          role="menuitem"
                          className={`group flex items-start gap-3 rounded-xl p-2.5 transition-all duration-150 ${
                            active
                              ? 'bg-brand-lavender/30 text-brand-blue'
                              : 'text-slate-700 hover:bg-slate-50/90 hover:text-brand-blue'
                          } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue`}
                        >
                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.iconBg} ${item.iconColor} transition-transform duration-200 group-hover:scale-105 group-hover:translate-x-0.5`}
                            aria-hidden="true"
                          >
                            <Icon size={16} />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[12.5px] font-bold text-slate-900 group-hover:text-brand-blue transition-colors leading-tight">
                                {item.label}
                              </span>
                              {item.badge && (
                                <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-extrabold text-emerald-700 border border-emerald-200/60 tracking-wide uppercase">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="mt-0.5 text-[11px] font-medium text-slate-500 line-clamp-1 leading-normal">
                              {item.description}
                            </p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Quick Bar */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 px-2.5">
                <span className="flex items-center gap-1.5 font-medium">
                  <Sparkles size={12} className="text-brand-blue" />
                  Direct sync for Tally, Zoho & CargoWise
                </span>
                <a
                  href="/calculator"
                  onClick={(e) => handleLinkClick('/calculator', e)}
                  className="font-bold text-brand-blue hover:text-brand-blue-hover inline-flex items-center gap-1 transition-colors"
                >
                  Estimate your savings
                  <ArrowRight size={11} />
                </a>
              </div>
            </div>

            {/* Right Column: Dynamic Changing Card (Finance & Logistics, 8-Second Cycle) */}
            <div
              className="w-[260px] shrink-0 bg-gradient-to-br from-slate-50/90 via-slate-50 to-blue-50/20 p-4 flex flex-col justify-between"
              onMouseEnter={() => setIsHoveredCard(true)}
              onMouseLeave={() => setIsHoveredCard(false)}
            >
              <div>
                {/* Header with Rotating Badge & Manual Switch Tabs */}
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border ${currentSlide.badgeBorder} ${currentSlide.badgeBg} px-2 py-0.5 text-[9.5px] font-bold ${currentSlide.badgeTextColor} uppercase tracking-wider shadow-2xs transition-all duration-300`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${currentSlide.badgeDotColor} animate-pulse`} />
                    {currentSlide.badgeLabel}
                  </span>

                  {/* 8-Second Slide Switcher Tabs / Dots */}
                  <div className="flex items-center gap-1.5" title="Switches every 8 seconds">
                    {deskSlides.map((slide, idx) => (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => setActiveSlide(idx as 0 | 1)}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          activeSlide === idx
                            ? `w-5 ${slide.id === 'finance' ? 'bg-brand-blue' : 'bg-brand-teal'}`
                            : 'w-1.5 bg-slate-200 hover:bg-slate-300'
                        }`}
                        aria-label={`Switch to ${slide.badgeLabel}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Minimal Dynamic Card Image */}
                <div className="relative mt-2.5 overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-2xs aspect-[16/9]">
                  {deskSlides.map((slide, idx) => (
                    <img
                      key={slide.id}
                      src={slide.imageSrc}
                      alt={slide.imageAlt}
                      className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-in-out ${
                        activeSlide === idx
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-95 pointer-events-none'
                      }`}
                    />
                  ))}
                </div>

                {/* Content with Smooth Fade Transition */}
                <div className="mt-2.5 min-h-[34px]">
                  <h4 className="text-[12.5px] font-extrabold text-slate-900 leading-snug transition-all duration-300">
                    {currentSlide.title}
                  </h4>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-2 pt-2.5 border-t border-slate-200/60 flex flex-col gap-1.5">
                <a
                  href={currentSlide.href}
                  onClick={(e) => handleLinkClick(currentSlide.href, e)}
                  className={`inline-flex w-full items-center justify-center gap-1.5 py-1.5 px-3 text-[11px] font-bold rounded-lg shadow-2xs transition-all duration-200 ${currentSlide.ctaButtonClass}`}
                >
                  <span>{currentSlide.ctaText}</span>
                  <ArrowRight size={12} />
                </a>

                <div className="flex items-center justify-center text-[10.5px] px-1 pt-0.5">
                  <a
                    href="#demo"
                    onClick={(e) => handleLinkClick('#demo', e)}
                    className="font-medium text-slate-500 hover:text-brand-blue transition-colors"
                  >
                    Book a demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
