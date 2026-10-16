const fs = require('fs');

const files = [
  'src/components/AnimatedCheckmark.tsx',
  'src/components/Calculator.tsx',
  'src/components/CalculatorBar.tsx',
  'src/components/CountUp.tsx',
  'src/components/DemoCta.tsx',
  'src/components/FaqSection.tsx',
  'src/components/FeatureSection.tsx',
  'src/components/FinanceDeskVisual.tsx',
  'src/components/Footer.tsx',
  'src/components/Header.tsx',
  'src/components/Hero.tsx',
  'src/components/HowItWorks.tsx',
  'src/components/IntegrationsSection.tsx',
  'src/components/MetricTransition.tsx',
  'src/components/NavDropdown.tsx',
  'src/components/Newsletter.tsx',
  'src/components/RuleEngineDemo.tsx',
  'src/components/SharedFaqAccordion.tsx',
  'src/components/SpotlightCard.tsx',
  'src/components/Stats.tsx',
  'src/components/StickyCtaBar.tsx',
  'src/components/TheProblem.tsx',
  'src/components/WhyDocsynecx.tsx',
  'src/pages/CalculatorPage.tsx',
  'src/pages/FinancePage.tsx',
  'src/pages/LogisticsPage.tsx',
  'src/hooks/useHeroAutoScroll.ts',
  'src/hooks/useScrollReveal.ts',
  'src/hooks/useSpotlight.ts'
];

for (const file of files) {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    if (!content.startsWith("'use client'") && !content.startsWith('"use client"')) {
      fs.writeFileSync(file, "'use client';\n" + content, 'utf8');
      console.log('Added use client to', file);
    }
  }
}
