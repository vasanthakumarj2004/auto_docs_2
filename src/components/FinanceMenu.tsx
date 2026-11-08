'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { financeCapabilities, financeRoot } from '../content/finance';
import s from './FinanceMenu.module.css';

export function FinanceMenu({ onNavigate, compact = false, dark = false }: { onNavigate?: () => void; compact?: boolean; dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();
  const path = (usePathname() || '/').replace(/\/$/, '');
  const active = path === '/finance' || path === '/accounts-payable' || path.startsWith('/finance-desk');
  const close = () => { setOpen(false); onNavigate?.(); };
  useEffect(() => {
    const outside = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape' && open) { event.preventDefault(); setOpen(false); trigger.current?.focus(); } };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape); };
  }, [open]);
  return <div ref={root} className={s.menu} data-compact={compact} data-dark={dark} onMouseEnter={() => { if (window.matchMedia('(hover: hover)').matches) setOpen(true); }} onMouseLeave={() => { if (!root.current?.contains(document.activeElement)) setOpen(false); }} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false); }}>
    <div className={s.triggerRow}>
      <Link className={s.hub} data-active={active} href={financeRoot} onClick={close} aria-current={path === '/finance-desk' || path === '/finance' ? 'page' : undefined}>Finance Desk</Link>
      <button ref={trigger} type="button" aria-label="Finance Desk capabilities" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}><ChevronDown size={13} aria-hidden="true" /></button>
    </div>
    <ul id={id} className={s.panel} hidden={!open}>
      <li><Link className={s.overview} href={financeRoot} aria-current={path === '/finance-desk' || path === '/finance' ? 'page' : undefined} onClick={close}>Finance Desk overview <span>→</span></Link></li>
      {financeCapabilities.map((item, index) => <li key={item.slug}><Link href={`${financeRoot}${item.slug}/`} aria-current={path === `${financeRoot}${item.slug}` || item.slug === 'accounts-payable' && path === '/accounts-payable' ? 'page' : undefined} onClick={close}>
        <span className={s.number}>0{index + 1}</span><span className={s.label}>{item.title}{item.slug === 'docsynecx-intelligence' && <small>Financial, business and operational insights in one place</small>}</span>{item.slug === 'accounts-payable' && <span className={s.badge}>Upcoming</span>}
      </Link></li>)}
    </ul>
  </div>;
}
