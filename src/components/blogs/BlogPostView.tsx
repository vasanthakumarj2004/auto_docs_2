import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import type { BlogPost } from '@/src/content/blogs';
import { SharedFaqAccordion } from '@/src/components/SharedFaqAccordion';
import { BlogCard } from './BlogCard';
import styles from './BlogPostView.module.css';

interface BlogPostViewProps {
  post: BlogPost;
  related: BlogPost[];
}

export function BlogPostView({ post, related }: BlogPostViewProps) {
  return (
    <article className={styles.articlePage}>
      {/* 1. Title Section with signature Docsynecx Hero Background */}
      <header className={styles.titleSection}>
        <div className="site-shell">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span className={styles.breadcrumbSep}>/</span>
            <Link href="/blogs">Blogs</Link>
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCurrent}>{post.title}</span>
          </nav>

          <div className={styles.headerContent}>
            <div className={styles.metaRow}>
              <span className={styles.categoryBadge}>{post.category}</span>
              <span className={styles.metaItem}>
                <Clock size={13} aria-hidden="true" />
                {post.readTime}
              </span>
              <span className={styles.metaItem}>
                <Calendar size={13} aria-hidden="true" />
                {post.date}
              </span>
            </div>

            <h1 className={styles.title}>{post.title}</h1>

            {post.subtitle && (
              <p className={styles.subtitle}>{post.subtitle}</p>
            )}

            {post.author && (
              <div className={styles.authorRow}>
                <div className={styles.authorInfo}>
                  <strong>{post.author.name}</strong>
                  <small>{post.author.role}</small>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 2. Content Section with distinct reader background for optimal reading clarity */}
      <section className={styles.contentSection}>
        <div className="site-shell">
          <div className={styles.readingCard}>
            {/* Square Shaped Image with NO border color */}
            <div className={styles.heroImageBox}>
              <img
                src={post.image}
                alt={post.imageAlt || post.title}
                className={styles.heroImage}
                loading="eager"
              />
            </div>

            {/* Article Body Content */}
            <div className={styles.contentArea}>
              {post.content.map((section, idx) => {
                switch (section.type) {
                  case 'paragraph':
                    return <p key={idx}>{section.text}</p>;

                  case 'heading2':
                    return <h2 key={idx}>{section.text}</h2>;

                  case 'heading3':
                    return <h3 key={idx}>{section.text}</h3>;

                  case 'bullets':
                    return (
                      <ul key={idx} className={styles.bulletsList}>
                        {section.items.map((item, itemIdx) => (
                          <li key={itemIdx} className={styles.bulletItem}>
                            <CheckCircle2
                              size={17}
                              className={styles.bulletIcon}
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    );

                  case 'callout':
                    return (
                      <aside key={idx} className={styles.callout}>
                        {section.title && (
                          <h4 className={styles.calloutTitle}>{section.title}</h4>
                        )}
                        <p className={styles.calloutText}>{section.text}</p>
                      </aside>
                    );

                  case 'image':
                    return (
                      <figure key={idx} className={styles.inlineFigure}>
                        <img src={section.src} alt={section.alt} />
                        {section.caption && <figcaption>{section.caption}</figcaption>}
                      </figure>
                    );

                  default:
                    return null;
                }
              })}
            </div>

            {/* FAQ Section (Styled like Finance & Logistics Desk) */}
            {post.faqs && post.faqs.length > 0 && (
              <section className={styles.faqSection} aria-labelledby="blog-faq-title">
                <div className={styles.faqHeader}>
                  <p className={styles.faqEyebrow}>COMMON QUESTIONS</p>
                  <h2 id="blog-faq-title" className={styles.faqTitle}>
                    Frequently Asked Questions
                  </h2>
                </div>
                <SharedFaqAccordion
                  items={post.faqs}
                  defaultOpenIndex={0}
                  toggleStyle="plus"
                  theme="brand"
                />
              </section>
            )}

            {/* Tags & Footer Navigation */}
            <footer className={styles.articleFooter}>
              {post.tags && post.tags.length > 0 && (
                <div className={styles.tagsSection}>
                  <div className={styles.tagsSectionHeading}>TAGGED TOPICS</div>
                  <div className={styles.tagsList}>
                    {post.tags.map((tag) => (
                      <span key={tag} className={styles.tagPill}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.navigationBar}>
                <Link href="/blogs" className={styles.backButton}>
                  <ArrowLeft size={16} aria-hidden="true" />
                  Back to all articles
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </section>

      {/* 3. Related Reading Section */}
      {related.length > 0 && (
        <section className={styles.relatedSection} aria-labelledby="related-title">
          <div className="site-shell">
            <div className={styles.relatedHeading}>
              <h2 id="related-title">Related Reading</h2>
              <p>
                Continue exploring connected workflows and document intelligence breakthroughs.
              </p>
            </div>
            <div className={styles.relatedGrid}>
              {related.map((item) => (
                <BlogCard key={item.slug} post={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
