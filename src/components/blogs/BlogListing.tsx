'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { Search, X, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  BLOG_CATEGORIES,
  type BlogCategory,
  type BlogPost,
} from '@/src/content/blogs';
import { BlogCard } from './BlogCard';
import styles from './BlogListing.module.css';

const POSTS_PER_PAGE = 3;

interface BlogListingProps {
  initialPosts: BlogPost[];
}

export function BlogListing({ initialPosts }: BlogListingProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All' | BlogCategory>(
    'All'
  );
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to first slide whenever category or search filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return initialPosts.filter((post) => {
      // Category check
      if (activeCategory !== 'All' && post.category !== activeCategory) {
        return false;
      }

      // Search query check
      if (!q) return true;

      const titleMatch = (post.title || '').toLowerCase().includes(q);
      const excerptText = post.excerpt || post.subtitle || '';
      const excerptMatch = excerptText.toLowerCase().includes(q);
      const tagMatch = (post.tags || []).some((tag) => (tag || '').toLowerCase().includes(q));
      const categoryMatch = (post.category || '').toLowerCase().includes(q);

      return titleMatch || excerptMatch || tagMatch || categoryMatch;
    });
  }, [initialPosts, activeCategory, searchQuery]);

  // Pagination / slide calculations (3 blocks per slide)
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const currentPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }, [totalPages]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    setCurrentPage(newPage);
    if (typeof window !== 'undefined') {
      const el = document.getElementById('blog-articles-grid');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveCategory('All');
  };

  return (
    <section className={styles.section} aria-labelledby="blogs-title">
      <div className="site-shell">
        {/* Title Header */}
        <div className={styles.hero}>
          <p className={styles.eyebrow}>DOCSYNECX KNOWLEDGE & INSIGHTS</p>
          <h1 id="blogs-title" className={styles.title}>
            Intelligence in Motion.<br />
            <span>Articles, Guides & Insights.</span>
          </h1>
          <p className={styles.subtitle}>
            Explore the latest advancements in AI document intelligence, logistics automation, enterprise compliance, and connected financial workflows.
          </p>
        </div>

        {/* Controls: Search Box & Category Filters */}
        <div className={styles.controlsContainer}>
          {/* Search Box */}
          <div className={styles.searchBox}>
            <Search className={styles.searchIcon} size={20} aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by title, keyword, or topic (e.g. CargoWise, TallyPrime, B/L)..."
              className={styles.searchInput}
              aria-label="Search articles"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className={styles.clearButton}
                aria-label="Clear search input"
              >
                <X size={15} aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Category Filter Buttons (Counts removed) */}
          <div
            className={styles.filtersList}
            role="toolbar"
            aria-label="Filter articles by category"
          >
            {BLOG_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`${styles.filterButton} ${
                    isActive ? styles.filterButtonActive : ''
                  }`}
                  aria-pressed={isActive}
                >
                  <span>{category}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Filter Bar (No counts) */}
        {(activeCategory !== 'All' || searchQuery) && (
          <div className={styles.resultsBar}>
            <span>
              {activeCategory !== 'All' && (
                <>Filtered by <strong>{activeCategory}</strong></>
              )}
              {activeCategory !== 'All' && searchQuery && ' · '}
              {searchQuery && (
                <>Searching &ldquo;<strong>{searchQuery}</strong>&rdquo;</>
              )}
            </span>
            <button
              type="button"
              onClick={handleResetFilters}
              className={styles.resetButton}
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Articles Cards Grid (3 blocks per slide) */}
        {filteredPosts.length > 0 ? (
          <>
            <div
              id="blog-articles-grid"
              key={currentPage}
              className={`${styles.grid} ${styles.slideStage}`}
            >
              {currentPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>

            {/* Slider / Pagination Navigation Bar */}
            {totalPages > 1 && (
              <nav
                className={styles.paginationBar}
                aria-label="Blog slide pagination"
              >
                {/* Previous Button */}
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`${styles.pageButton} ${styles.pageNavButton}`}
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={18} aria-hidden="true" />
                </button>

                {/* Page Number Buttons */}
                {pageNumbers.map((num) => {
                  const isActive = num === currentPage;
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handlePageChange(num)}
                      className={`${styles.pageButton} ${
                        isActive ? styles.pageButtonActive : ''
                      }`}
                      aria-label={`Go to slide ${num}`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {num}
                    </button>
                  );
                })}

                {/* Next Button */}
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`${styles.pageButton} ${styles.pageNavButton}`}
                  aria-label="Next slide"
                >
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
              </nav>
            )}
          </>
        ) : (
          /* Empty State */
          <div className={styles.emptyState}>
            <BookOpen size={48} className={styles.emptyIcon} aria-hidden="true" />
            <h3>No articles found</h3>
            <p>
              We couldn&apos;t find any articles matching your search criteria. Try a different search term or category.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="button-primary"
            >
              View all articles
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
