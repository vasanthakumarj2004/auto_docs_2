/**
 * Docsynecx Google Analytics 4 (GA4) Event & Parameter Taxonomy
 * Defines strictly typed constants for event names, parameters, user properties,
 * and content groups to prevent typos and ensure cross-platform consistency.
 */

// ============================================================================
// 1. Recommended GA4 Events
// ============================================================================
export const EVENT_SIGN_UP = 'sign_up' as const;
export const EVENT_LOGIN = 'login' as const;
export const EVENT_GENERATE_LEAD = 'generate_lead' as const;

// ============================================================================
// 2. Marketing Website Events
// ============================================================================
export const EVENT_CTA_CLICK = 'cta_click' as const;
export const EVENT_PRICING_VIEW = 'pricing_view' as const;
export const EVENT_DEMO_REQUEST = 'demo_request' as const;
export const EVENT_CONTACT_SUBMIT = 'contact_submit' as const;
export const EVENT_NEWSLETTER_SIGNUP = 'newsletter_signup' as const;
export const EVENT_FAQ_EXPAND = 'faq_expand' as const;
export const EVENT_VIDEO_PLAY = 'video_play' as const;
export const EVENT_NAVIGATION_CLICK = 'navigation_click' as const;

// ============================================================================
// 3. Product & SaaS Application Events
// ============================================================================
export const EVENT_FILE_UPLOAD = 'file_upload' as const;
export const EVENT_INVOICE_PROCESSED = 'invoice_processed' as const;
export const EVENT_PROCESSING_FAILED = 'processing_failed' as const;
export const EVENT_EXPORT_COMPLETED = 'export_completed' as const;
export const EVENT_INTEGRATION_CONNECT = 'integration_connect' as const;
export const EVENT_FEATURE_USED = 'feature_used' as const;
export const EVENT_EXCEPTION = 'exception' as const;

// All valid custom and recommended application events
export const ALL_APP_EVENTS = [
  EVENT_SIGN_UP,
  EVENT_LOGIN,
  EVENT_GENERATE_LEAD,
  EVENT_CTA_CLICK,
  EVENT_PRICING_VIEW,
  EVENT_DEMO_REQUEST,
  EVENT_CONTACT_SUBMIT,
  EVENT_NEWSLETTER_SIGNUP,
  EVENT_FAQ_EXPAND,
  EVENT_VIDEO_PLAY,
  EVENT_NAVIGATION_CLICK,
  EVENT_FILE_UPLOAD,
  EVENT_INVOICE_PROCESSED,
  EVENT_PROCESSING_FAILED,
  EVENT_EXPORT_COMPLETED,
  EVENT_INTEGRATION_CONNECT,
  EVENT_FEATURE_USED,
  EVENT_EXCEPTION,
] as const;

export type AppEventName = (typeof ALL_APP_EVENTS)[number];

// ============================================================================
// 4. Parameter Names
// ============================================================================
export const PARAM_CTA_NAME = 'cta_name' as const;
export const PARAM_CTA_LOCATION = 'cta_location' as const;
export const PARAM_PAGE_PATH = 'page_path' as const;
export const PARAM_PLAN_VIEWED = 'plan_viewed' as const;
export const PARAM_SOURCE = 'source' as const;
export const PARAM_LEAD_SOURCE = 'lead_source' as const;
export const PARAM_FORM_NAME = 'form_name' as const;
export const PARAM_VALUE = 'value' as const;
export const PARAM_CURRENCY = 'currency' as const;
export const PARAM_SIGNUP_LOCATION = 'signup_location' as const;
export const PARAM_FAQ_QUESTION = 'faq_question' as const;
export const PARAM_VIDEO_NAME = 'video_name' as const;
export const PARAM_VIDEO_LOCATION = 'video_location' as const;
export const PARAM_NAV_ITEM = 'nav_item' as const;
export const PARAM_NAV_LOCATION = 'nav_location' as const;
export const PARAM_METHOD = 'method' as const;
export const PARAM_FILE_TYPE = 'file_type' as const;
export const PARAM_FILE_SIZE_KB = 'file_size_kb' as const;
export const PARAM_FILE_COUNT = 'file_count' as const;
export const PARAM_PROCESSING_TIME_MS = 'processing_time_ms' as const;
export const PARAM_DOCUMENT_TYPE = 'document_type' as const;
export const PARAM_PAGE_COUNT = 'page_count' as const;
export const PARAM_ERROR_TYPE = 'error_type' as const;
export const PARAM_EXPORT_FORMAT = 'export_format' as const;
export const PARAM_INTEGRATION_NAME = 'integration_name' as const;
export const PARAM_FEATURE_NAME = 'feature_name' as const;
export const PARAM_DESCRIPTION = 'description' as const;
export const PARAM_FATAL = 'fatal' as const;
export const PARAM_APP_ENV = 'app_env' as const;
export const PARAM_CONTENT_GROUP = 'content_group' as const;

// ============================================================================
// 5. User Properties
// ============================================================================
export const USER_PROP_PLAN_TYPE = 'plan_type' as const;
export const USER_PROP_ACCOUNT_ROLE = 'account_role' as const;
export const USER_PROP_SITE_SECTION = 'site_section' as const;

export type UserPropertyKey =
  | typeof USER_PROP_PLAN_TYPE
  | typeof USER_PROP_ACCOUNT_ROLE
  | typeof USER_PROP_SITE_SECTION;

// ============================================================================
// 6. Content Groups
// ============================================================================
export const CONTENT_GROUP_MARKETING = 'marketing' as const;
export const CONTENT_GROUP_APP = 'app' as const;
export const CONTENT_GROUP_DOCS = 'docs' as const;
export const CONTENT_GROUP_AUTH = 'auth' as const;

export type ContentGroup =
  | typeof CONTENT_GROUP_MARKETING
  | typeof CONTENT_GROUP_APP
  | typeof CONTENT_GROUP_DOCS
  | typeof CONTENT_GROUP_AUTH;

// ============================================================================
// 7. Reserved GA4 Event Names
// In Debug mode, runtime validator flags if any custom event attempts to use these
// ============================================================================
export const RESERVED_GA4_EVENTS = new Set<string>([
  'app_clear_data',
  'app_exception',
  'app_remove',
  'app_store_refund',
  'app_store_subscription_cancel',
  'app_store_subscription_convert',
  'app_store_subscription_renew',
  'app_update',
  'click',
  'dynamic_link_first_open',
  'dynamic_link_open',
  'error',
  'file_download',
  'first_open',
  'first_visit',
  'form_start',
  'form_submit',
  'in_app_purchase',
  'notification_dismiss',
  'notification_foreground',
  'notification_open',
  'notification_receive',
  'os_update',
  'page_view',
  'screen_view',
  'scroll',
  'session_start',
  'session_start_with_ndp',
  'user_engagement',
  'video_complete',
  'video_progress',
  'video_start',
  'view_search_results',
]);

// Allowed list of GA4 recommended events which are legitimate to invoke intentionally
export const ALLOWED_RECOMMENDED_EVENTS = new Set<string>([
  EVENT_SIGN_UP,
  EVENT_LOGIN,
  EVENT_GENERATE_LEAD,
]);
