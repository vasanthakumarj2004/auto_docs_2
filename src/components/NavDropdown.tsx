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
  LucideIcon
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

export const NavDropdown: React.FC<NavDropdownProps> = ({ onNavigate, currentPath }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear pending close/open timers on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
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
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Hover intent handlers with debouncing to prevent flicker
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsOpen(true);
    }, 60); // 60ms hover intent
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 140); // 140ms hover bridge cushion
  };

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    onNavigate(href);
  };

  // Products and Workflows (from docsynecx.com)
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

  // Integrations & Tools (from docsynecx.com & existing platform)
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
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' && !isOpen) {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
        className={`inline-flex items-center gap-1.5 py-1 text-[13px] font-semibold transition-colors focus:outline-none cursor-pointer rounded-md ${
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
            isOpen ? 'rotate-180 text-brand-blue' : 'text-slate-400'
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
        className={`absolute left-1/2 -translate-x-1/2 top-full pt-2.5 z-[60] w-[720px] transition-all duration-200 ease-out ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto visible'
            : 'opacity-0 -translate-y-2 pointer-events-none invisible'
        }`}
      >
        {/* Anti-flicker invisible hover bridge */}
        <div className="absolute -top-3 left-0 right-0 h-4 pointer-events-auto" aria-hidden="true" />

        {/* The Card Surface */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_20px_48px_-10px_rgba(11,19,48,0.18),0_6px_20px_-4px_rgba(11,19,48,0.08)]">
          <div className="flex divide-x divide-slate-100">
            {/* Left Columns: Products & Tools */}
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

            {/* Right Column: Featured Action Card */}
            <div className="w-[230px] shrink-0 bg-gradient-to-br from-slate-50/90 via-brand-lavender/20 to-brand-mint/15 p-5 flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-white/80 px-2 py-0.5 text-[9.5px] font-bold text-brand-blue uppercase tracking-wider shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
                  Live Platform
                </span>
                <h4 className="mt-3 text-[13px] font-extrabold text-slate-900 leading-snug">
                  Approve the bill. The entry posts itself.
                </h4>
                <p className="mt-2 text-[11px] text-slate-600 leading-relaxed">
                  Eliminate 95% of manual data entry into Tally and CargoWise with AI audit checks built in.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200/60 flex flex-col gap-2">
                <a
                  href="#demo"
                  onClick={(e) => handleLinkClick('#demo', e)}
                  className="button-primary w-full text-center py-2 px-3 text-[11.5px] font-bold rounded-lg shadow-sm"
                >
                  Book a demo
                </a>
                <a
                  href="/finance"
                  onClick={(e) => handleLinkClick('/finance', e)}
                  className="text-center text-[11px] font-bold text-slate-600 hover:text-brand-blue transition-colors py-0.5"
                >
                  Explore Finance Desk →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
