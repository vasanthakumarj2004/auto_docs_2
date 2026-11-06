'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Check, Columns2, LayoutTemplate, PanelTop, X } from 'lucide-react';
import { useLandingLayout } from './LandingLayoutProvider';
import styles from './LayoutSwitcher.module.css';

export function LayoutSwitcher() {
  const pathname = usePathname();
  const { layout, setLayout } = useLandingLayout();
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
        aria-controls="landing-layout-options" aria-label="Switch hero layout" onClick={() => setOpen(!open)}>
        <LayoutTemplate size={15} aria-hidden="true" /><span>Hero layout</span><strong>{layout.toUpperCase()}</strong>
      </button>
      {open && <div id="landing-layout-options" className={styles.panel} role="region" aria-label="Hero layout options">
        <div className={styles.heading}><span>Hero layout</span><button type="button" aria-label="Close layout menu"
          onClick={() => { setOpen(false); trigger.current?.focus(); }}><X size={16} /></button></div>
        <p>Choose your landing page layout.</p>
        <div className={styles.options}>
          {([
            { id: 'v1', title: 'Version 1', detail: 'Split layout · live pipeline', Icon: Columns2 },
            { id: 'v2', title: 'Version 2', detail: 'Centred layout · cinematic background', Icon: PanelTop },
            { id: 'v3', title: 'Version 3', detail: '3D dashboard · workflow overview', Icon: LayoutTemplate },
          ] as const).map(({ id, title, detail, Icon }) => <button key={id} type="button"
            aria-pressed={layout === id} onClick={() => setLayout(id)} className={styles.option}>
            <Icon size={24} /><span><strong>{title}</strong><small>{detail}</small></span>
            {layout === id && <Check size={16} />}
          </button>)}
        </div>

        <small className={styles.note}>Version 3 also changes the header. Your choice is saved automatically.</small>
      </div>}
    </div>
  );
}
