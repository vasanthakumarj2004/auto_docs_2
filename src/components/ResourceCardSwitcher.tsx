'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Check, PanelsTopLeft, X } from 'lucide-react';
import { RESOURCE_CARD_STYLES, RESOURCE_PREVIEW_EVENT, useResourceCardStyle } from './ResourceCardStyleProvider';
import styles from './ResourceCardSwitcher.module.css';

export function ResourceCardSwitcher() {
  const pathname = usePathname();
  const { cardStyle, setCardStyle } = useResourceCardStyle();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const selected = RESOURCE_CARD_STYLES.find(item => item.id === cardStyle)!;
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); trigger.current?.focus(); } };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape); };
  }, [open]);
  if (pathname === '/') return null;
  return <div className={styles.root} ref={root} data-resource-card-switcher>
    <button ref={trigger} type="button" className={styles.trigger} aria-expanded={open} aria-controls="resource-card-options" onClick={() => setOpen(!open)}>
      <PanelsTopLeft size={15} aria-hidden="true" /><span>Cards</span><strong>{selected.name}</strong>
    </button>
    {open && <div className={styles.panel} id="resource-card-options" role="region" aria-label="Resources card styles">
      <div className={styles.heading}><strong>Resources card styles</strong><button type="button" aria-label="Close card styles" onClick={() => { setOpen(false); trigger.current?.focus(); }}><X size={16} /></button></div>
      <p>Choose a style for your Resources menu.</p>
      <div className={styles.options} role="group" aria-label="Card style">
        {RESOURCE_CARD_STYLES.map(item => <button key={item.id} type="button" className={styles.option} aria-pressed={cardStyle === item.id} onClick={() => setCardStyle(item.id)}>
          <span className={styles.thumbnail} data-style={item.id} aria-hidden="true"><i /><i /><i /><i /><b /></span>
          <span className={styles.label}><strong>{item.name}</strong><small>{item.description}</small></span>
          {cardStyle === item.id && <Check size={15} aria-hidden="true" />}
        </button>)}
      </div>
      <button type="button" className={styles.preview} onClick={() => {
        setOpen(false);
        window.scrollTo({ top: 0, behavior: 'instant' });
        window.dispatchEvent(new Event(RESOURCE_PREVIEW_EVENT));
      }}>Preview in Resources <ArrowUpRight size={15} aria-hidden="true" /></button>
      <span className={styles.note}>Saved automatically. Your fonts and colors stay.</span>
    </div>}
  </div>;
}
