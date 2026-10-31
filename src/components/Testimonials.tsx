import { MessageSquareQuote } from 'lucide-react';
import styles from './Testimonials.module.css';

// Source: https://docsynecx.com/invoice-to-tally/
// The public site's testimonial component contains these two customers.
// Use short excerpts and separate summaries, with no invented logos or portraits.
// The second excerpt corrects the source's spelling of "recommend".
const testimonials = [
  {
    company: 'Tulifo.ai',
    quote: 'It streamlined our billing workflow, reduced errors, and saved valuable time.',
    context: 'Rajesh describes the product as reliable and thoughtfully built, helping growing teams simplify their billing work.',
    author: 'Rajesh Theodore G',
    role: 'Founder & CEO, Tulifo.ai',
    initials: 'RT',
  },
  {
    company: 'Advent Systems',
    quote: 'We will be glad to recommend the same to our customers.',
    context: 'After extensively testing AI data extraction and uploads to Tally, Kanakaraj reports that the solution met their expectations.',
    author: 'Kanakaraj Chinnaswamy',
    role: 'CEO, Advent Systems',
    credential: '5-star Certified Partner of Tally',
    initials: 'KC',
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className={styles.section} aria-labelledby="testimonials-title">
      <div className={`site-shell ${styles.frame}`}>
        <header className={styles.heading}>
          <span className={styles.eyebrow}><MessageSquareQuote size={16} strokeWidth={1.8} aria-hidden="true" />Customers</span>
          <h2 id="testimonials-title">Trusted by the people<br className={styles.headingBreak} /> behind the paperwork.</h2>
          <p>Hear from the teams making document work simpler.</p>
        </header>

        <div className={styles.grid}>
          {testimonials.map(testimonial => (
            <figure className={styles.testimonial} key={testimonial.author}>
              <div className={styles.company}>{testimonial.company}</div>
              <blockquote cite="https://docsynecx.com/invoice-to-tally/">
                <p>“{testimonial.quote}”</p>
              </blockquote>
              <p className={styles.context}>{testimonial.context}</p>
              <figcaption className={styles.attribution}>
                <span className={styles.avatar} aria-hidden="true">{testimonial.initials}</span>
                <div>
                  <span className={styles.author}>{testimonial.author}</span>
                  <span className={styles.role}>{testimonial.role}</span>
                  {testimonial.credential && <span className={styles.credential}>{testimonial.credential}</span>}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className={styles.sourceNote}>Customer feedback excerpts from <a href="https://docsynecx.com/invoice-to-tally/">Docsynecx</a>.</div>
      </div>
    </section>
  );
}
