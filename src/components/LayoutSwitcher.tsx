'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Check, Columns2, LayoutTemplate, Moon, PanelTop, Sun, X } from 'lucide-react';
import { useLandingLayout } from './LandingLayoutProvider';
import styles from './LayoutSwitcher.module.css';

export function LayoutSwitcher() {
  const pathname = usePathname();
  const { layout, setLayout, appearance, setAppearance, navbarTheme, setNavbarTheme } = useLandingLayout();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); trigger.current?.focus(); }
    };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', escape);
    };
  }, [open]);

  useEffect(() => { setOpen(false); }, [pathname]);
  if (pathname !== '/') return null;

  return (
    <div ref={root} className={styles.root}>
      <button ref={trigger} type="button" className={styles.trigger} aria-expanded={open}
        aria-controls="landing-layout-options" aria-label="Switch landing layout" onClick={() => setOpen(!open)}>
        <LayoutTemplate size={15} /><span>Layout</span><strong>{layout.toUpperCase()}</strong>
      </button>
      {open && <div id="landing-layout-options" className={styles.panel} role="region" aria-label="Landing layout options">
        <div className={styles.heading}><span>Landing layout</span><button type="button" aria-label="Close layout menu"
          onClick={() => { setOpen(false); trigger.current?.focus(); }}><X size={16} /></button></div>
        <p>Choose your first impression.</p>
        <div className={styles.options}>
          {([
            { id: 'v1', title: 'Version 1', detail: 'Split layout · live pipeline', Icon: Columns2 },
            { id: 'v2', title: 'Version 2', detail: 'Centred layout · simple & focused', Icon: PanelTop },
          ] as const).map(({ id, title, detail, Icon }) => <button key={id} type="button"
            aria-pressed={layout === id} onClick={() => setLayout(id)} className={styles.option}>
            <Icon size={24} /><span><strong>{title}</strong><small>{detail}</small></span>
            {layout === id && <Check size={16} />}
          </button>)}
        </div>

        <fieldset className={styles.appearance}>
          <legend>Hero appearance</legend>
          <div className={styles.modeOptions}>
            <button type="button" aria-pressed={appearance === 'light'} onClick={() => setAppearance('light')}>
              <Sun size={16} aria-hidden="true" />Light
            </button>
            <button type="button" aria-pressed={appearance === 'dark'} onClick={() => setAppearance('dark')}>
              <Moon size={16} aria-hidden="true" />Dark
            </button>
          </div>
        </fieldset>

        <fieldset className={styles.appearance}>
          <legend>Navbar theme</legend>
          <div className={styles.modeOptions}>
            <button type="button" aria-pressed={navbarTheme === 'light'} onClick={() => setNavbarTheme('light')}>
              <Sun size={16} aria-hidden="true" />Light
            </button>
            <button type="button" aria-pressed={navbarTheme === 'dark'} onClick={() => setNavbarTheme('dark')}>
              <Moon size={16} aria-hidden="true" />Dark
            </button>
          </div>
        </fieldset>

        <small className={styles.note}>Header & hero only. Your colour theme stays.</small>
      </div>}
    </div>
  );
}
