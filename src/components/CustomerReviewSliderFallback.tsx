import { Quote } from 'lucide-react';
import { customerReviews } from '../content/customerReviews';
import styles from './CustomerReviewSlider.module.css';

export function CustomerReviewSliderFallback() {
  const total = customerReviews.length;

  return (
    <div className={styles.reviewSectionWrapper}>
      <div className={styles.sliderStage}>
        {customerReviews.map((review, index) => {
          let offset = index;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;

          const cardClass =
            offset === 0
              ? styles.cardActive
              : offset === -1
                ? styles.cardLeft
                : offset === 1
                  ? styles.cardRight
                  : styles.cardHidden;

          return (
            <article
              key={review.id}
              className={`${styles.reviewCard} ${cardClass}`}
              aria-hidden={offset !== 0}
            >
              <p className={styles.industryLabel}>{review.industry}</p>
              <h3 className={styles.companyName}>{review.company}</h3>
              <Quote size={25} className={styles.quoteIcon} fill="currentColor" aria-hidden="true" />
              <blockquote className={styles.reviewCopy}>{review.copy}</blockquote>
              <div className={styles.cardAccent} aria-hidden="true">
                <span className={styles.accentDot} />
                <span className={styles.accentDot} />
                <span className={styles.accentDot} />
              </div>
            </article>
          );
        })}
      </div>
      <p className={styles.sliderDescription}>
        Discover the insights from teams regarding their experiences with Docsynecx automated workflows.
      </p>
    </div>
  );
}
