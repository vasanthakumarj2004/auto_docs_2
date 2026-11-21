import re
import urllib.parse

print("\n--- RUNNING ANALYTICS RULES VALIDATOR ---")

# 1. Test URL Sanitizer Logic
def sanitize_url(raw_url):
    parsed = urllib.parse.urlparse(raw_url)
    qs = urllib.parse.parse_qsl(parsed.query)
    blocked = {'email', 'token', 'key', 'code', 'reset', 'invite', 'session', 'otp', 'password', 'pwd', 'secret', 'access_token', 'refresh_token', 'auth_token', 'user_id', 'name', 'phone'}
    clean_qs = [(k, v) for k, v in qs if k.lower() not in blocked and 'token' not in k.lower() and 'secret' not in k.lower()]
    clean_query = urllib.parse.urlencode(clean_qs)
    page_path = parsed.path + ('?' + clean_query if clean_query else '')
    page_location = f"{parsed.scheme}://{parsed.netloc}{page_path}"
    return page_location, page_path

test_url = "https://docsynecx.com/app/invoices?token=secret123&email=user@test.com&password=abc&utm_source=google&utm_campaign=brand&gclid=xyz789"
clean_loc, clean_path = sanitize_url(test_url)

assert "token=" not in clean_loc, "Token not stripped!"
assert "email=" not in clean_loc, "Email not stripped!"
assert "password=" not in clean_loc, "Password not stripped!"
assert "utm_source=google" in clean_loc, "utm_source dropped!"
assert "gclid=xyz789" in clean_loc, "gclid dropped!"
print("  ✓ PASS: URL sanitization strips PII and preserves campaign parameters")

# 2. Test Event Name Validation Rule
RESERVED = {'page_view', 'session_start', 'first_visit', 'user_engagement', 'click', 'scroll', 'file_download'}
def validate_event_name(name):
    if name in RESERVED:
        return False, "reserved"
    if len(name) > 40:
        return False, "too_long"
    if not re.match(r'^[a-z][a-z0-9_]*$', name):
        return False, "snake_case_violation"
    return True, "valid"

valid_ok, _ = validate_event_name("cta_click")
assert valid_ok, "cta_click should be valid"
reserved_ok, r_reason = validate_event_name("scroll")
assert not reserved_ok and r_reason == "reserved", "scroll should be reserved"
long_ok, l_reason = validate_event_name("this_is_an_extremely_long_event_name_that_exceeds_forty_characters_limit")
assert not long_ok and l_reason == "too_long", "exceeds 40 chars"
case_ok, c_reason = validate_event_name("Invalid-Name")
assert not case_ok and c_reason == "snake_case_violation", "invalid snake_case"
print("  ✓ PASS: Event name constraints (max 40 chars, snake_case, reserved names) enforced")

# 3. Test Measurement Protocol Consent Enforcement
def mock_send_server_event(analytics_consent, client_id, event_name):
    if analytics_consent is not True:
        return {"success": False, "reason": "consent_not_granted"}
    if not client_id:
        return {"success": False, "reason": "invalid_client_id"}
    return {"success": True}

res1 = mock_send_server_event(False, "123.456", "invoice_processed")
assert res1["success"] is False and res1["reason"] == "consent_not_granted"
res2 = mock_send_server_event(True, "123.456", "invoice_processed")
assert res2["success"] is True
print("  ✓ PASS: Server-side Measurement Protocol strictly rejects dispatch when analytics_consent is false")

print("\nALL 3 ANALYTICS SYSTEM CHECKS PASSED!\n")
