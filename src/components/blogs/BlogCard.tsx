import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import type { BlogPost } from '@/src/content/blogs';
import styles from './BlogCard.module.css';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className={styles.card}
      aria-label={`Read article: ${post.title}`}
    >
      <div className={styles.imageBox}>
        <img
          src={post.image}
          alt={post.imageAlt || post.title}
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.imageOverlay} aria-hidden="true" />
        <span className={styles.categoryBadge}>{post.category}</span>
        <span className={styles.readTimeBadge}>
          <Clock size={11} aria-hidden="true" />
          {post.readTime}
        </span>
      </div>

      <div className={styles.content}>
        <div className={styles.metaRow}>
          <span className={styles.date}>
            <Calendar size={13} aria-hidden="true" />
            {post.date}
          </span>
        </div>

        <h3 className={styles.title}>{post.title}</h3>

        {(post.excerpt || post.subtitle) && (
          <p className={styles.excerpt}>{post.excerpt || post.subtitle}</p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className={styles.tagsRow} aria-label="Tags">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className={styles.tagChip}>
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className={styles.footer}>
          <span className={styles.readLink}>
            Read article
            <ArrowRight size={14} aria-hidden="true" />
          </span>
          {post.author && (
            <span className={styles.author}>{post.author.name}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
