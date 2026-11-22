'use client';

import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';

const CustomerReviewSlider = lazy(() =>
  import('./CustomerReviewSlider').then((module) => ({
    default: module.CustomerReviewSlider,
  })),
);
const SharedFaqAccordion = lazy(() =>
  import('./SharedFaqAccordion').then((module) => ({
    default: module.SharedFaqAccordion,
  })),
);

interface FaqItem {
  question: string;
  answer?: string;
}

function DeferredSection({
  children,
  content,
}: {
  children: ReactNode;
  content: ReactNode;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '500px 0px' },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef}>
      <Suspense fallback={children}>{shouldLoad ? content : children}</Suspense>
    </div>
  );
}

export function DeferredCustomerReviewSlider({ children }: { children: ReactNode }) {
  return (
    <DeferredSection content={<CustomerReviewSlider />}>
      {children}
    </DeferredSection>
  );
}

export function DeferredSharedFaqAccordion({
  items,
  children,
}: {
  items: FaqItem[];
  children: ReactNode;
}) {
  return (
    <DeferredSection
      content={<SharedFaqAccordion items={items} defaultOpenIndex={0} toggleStyle="plus" />}
    >
      {children}
    </DeferredSection>
  );
}
