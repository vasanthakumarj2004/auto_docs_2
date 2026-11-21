/**
 * Docsynecx Product Analytics Helpers
 * Type-safe wrappers for product, user, and processing events.
 *
 * Privacy Guarantees:
 * - File names, company names, invoice numbers, tax IDs, and PII are NEVER passed to GA4.
 * - All calls delegate to trackEvent() in src/lib/analytics.ts, which strictly verifies
 *   cookie consent before any data leaves the browser.
 */

import { trackEvent } from './analytics';
import {
  EVENT_FILE_UPLOAD,
  EVENT_INVOICE_PROCESSED,
  EVENT_PROCESSING_FAILED,
  EVENT_EXPORT_COMPLETED,
  EVENT_INTEGRATION_CONNECT,
  EVENT_FEATURE_USED,
  EVENT_EXCEPTION,
  EVENT_SIGN_UP,
  EVENT_LOGIN,
  PARAM_FILE_TYPE,
  PARAM_FILE_SIZE_KB,
  PARAM_FILE_COUNT,
  PARAM_PROCESSING_TIME_MS,
  PARAM_DOCUMENT_TYPE,
  PARAM_PAGE_COUNT,
  PARAM_ERROR_TYPE,
  PARAM_EXPORT_FORMAT,
  PARAM_INTEGRATION_NAME,
  PARAM_FEATURE_NAME,
  PARAM_DESCRIPTION,
  PARAM_FATAL,
  PARAM_METHOD,
} from './analytics-events';

// Rate limiting for exception tracking (max 5 exceptions per minute to avoid flooding)
let exceptionCount = 0;
let lastExceptionWindow = Date.now();

export interface FileUploadParams {
  fileType: string;
  fileSizeKb: number;
  fileCount?: number;
}

export interface InvoiceProcessedParams {
  processingTimeMs: number;
  documentType: string;
  pageCount: number;
}

export interface ProcessingFailedParams {
  errorType: string;
  documentType: string;
}

export interface ExportCompletedParams {
  exportFormat: 'csv' | 'xlsx' | 'json' | 'pdf';
}

/**
 * Tracks document file upload.
 * NEVER pass the actual file name or document contents.
 */
export function trackFileUpload({ fileType, fileSizeKb, fileCount = 1 }: FileUploadParams): void {
  trackEvent(EVENT_FILE_UPLOAD, {
    [PARAM_FILE_TYPE]: fileType,
    [PARAM_FILE_SIZE_KB]: Math.round(fileSizeKb),
    [PARAM_FILE_COUNT]: fileCount,
  });
}

/**
 * Tracks client-side completion of invoice processing.
 * Note: If processing completes on the backend, use sendServerEvent() instead.
 */
export function trackInvoiceProcessed({
  processingTimeMs,
  documentType,
  pageCount,
}: InvoiceProcessedParams): void {
  trackEvent(EVENT_INVOICE_PROCESSED, {
    [PARAM_PROCESSING_TIME_MS]: Math.round(processingTimeMs),
    [PARAM_DOCUMENT_TYPE]: documentType,
    [PARAM_PAGE_COUNT]: pageCount,
  });
}

/**
 * Tracks document processing failure.
 */
export function trackProcessingFailed({ errorType, documentType }: ProcessingFailedParams): void {
  trackEvent(EVENT_PROCESSING_FAILED, {
    [PARAM_ERROR_TYPE]: errorType,
    [PARAM_DOCUMENT_TYPE]: documentType,
  });
}

/**
 * Tracks document / table export completion.
 */
export function trackExportCompleted({ exportFormat }: ExportCompletedParams): void {
  trackEvent(EVENT_EXPORT_COMPLETED, {
    [PARAM_EXPORT_FORMAT]: exportFormat,
  });
}

/**
 * Tracks third-party integration connection (e.g. TallyPrime, Zoho Books, CargoWise).
 */
export function trackIntegrationConnect(integrationName: string): void {
  trackEvent(EVENT_INTEGRATION_CONNECT, {
    [PARAM_INTEGRATION_NAME]: integrationName,
  });
}

/**
 * Tracks specific feature usage in the application.
 */
export function trackFeatureUsed(featureName: string): void {
  trackEvent(EVENT_FEATURE_USED, {
    [PARAM_FEATURE_NAME]: featureName,
  });
}

/**
 * Tracks uncaught runtime exceptions and 404 pages. Rate-limited to max 5 per minute.
 */
export function trackException(description: string, fatal = false): void {
  const now = Date.now();
  if (now - lastExceptionWindow > 60000) {
    exceptionCount = 0;
    lastExceptionWindow = now;
  }

  if (exceptionCount >= 5) {
    return;
  }
  exceptionCount++;

  trackEvent(EVENT_EXCEPTION, {
    [PARAM_DESCRIPTION]: description.slice(0, 100),
    [PARAM_FATAL]: fatal,
  });
}

/**
 * Tracks user account registration.
 */
export function trackSignUp(method: string): void {
  trackEvent(EVENT_SIGN_UP, {
    [PARAM_METHOD]: method,
  });
}

/**
 * Tracks user authentication / sign in.
 */
export function trackLogin(method: string): void {
  trackEvent(EVENT_LOGIN, {
    [PARAM_METHOD]: method,
  });
}
