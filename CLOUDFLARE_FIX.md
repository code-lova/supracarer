# Cloudflare Configuration Guide

## Problem

- Cloudflare human verification challenges are interfering with API requests
- Frontend expects JSON but receives HTML challenge page
- Error: "Unexpected token '<', "<!DOCTYPE "... is not valid JSON"

## Solutions

### 1. Configure Cloudflare Page Rules (Updated for Current Interface)

**In Cloudflare Dashboard:**

1. Go to **Rules** → **Page Rules**
2. Create a new rule with pattern: `zipperapi.supracarer.com/api/*`
3. Settings (choose ONE of these combinations):

   **Option A (Recommended):**

   - **Browser Integrity Check**: Off
   - **Cache Level**: Bypass

   **Option B (If you need HTTPS redirect):**

   - **Always Use HTTPS**: On

   **Note**: Don't combine "Always Use HTTPS" with other settings as Cloudflare doesn't allow this combination.

**Note:** Security Level and Challenge Passage are now configured in Security settings (see WAF section below).

### 2. Configure Cloudflare Security Settings (MOST IMPORTANT)

**Option A - Skip Challenges for API (Recommended for Login Fix):**

1. Go to **Security** → **WAF** → **Custom Rules**
2. Click **Create Rule**
3. Rule configuration:
   - **Rule name**: Skip API Challenges
   - **Field**: Hostname
   - **Operator**: equals
   - **Value**: `zipperapi.supracarer.com`
   - **Action**: Skip
   - **WAF components to skip**: Select "All managed rules" only (this skips challenges but keeps rate limiting)

**Why this works:** Your API calls will bypass human verification challenges, preventing the HTML challenge page from interfering with JSON responses.

**Option B - Two-Layer Protection (Your Alternative Idea):**

1. **Frontend Protection Rule:**
   - **Field**: Hostname equals `www.supracarer.com`
   - **Action**: Managed Challenge (verify humans on your main site)
2. **API Protection Rule:**
   - **Field**: Hostname equals `zipperapi.supracarer.com`
   - **Action**: Skip → "All managed rules"

**This approach:** Visitors prove they're human on your main site, then API calls work without interference.

**Option B - Security Level (Alternative):**

1. Go to **Security** → **Settings**
2. Set **Security Level** to "Essentially Off" or "Low"
3. Turn off **Browser Integrity Check**

### 3. Configure Bot Management (If using Pro/Business plan)

**In Cloudflare Dashboard:**

1. Go to **Security** → **Bots**
2. Click **Configure Super Bot Fight Mode** or **Add Rule**
3. Add rule for API endpoints:
   - **Field**: Hostname
   - **Operator**: equals
   - **Value**: `zipperapi.supracarer.com`
   - **Action**: Allow

### 4. Alternative: Use Transform Rules (If WAF doesn't work)

**In Cloudflare Dashboard:**

1. Go to **Rules** → **Transform Rules** → **Modify Request Header**
2. Create rule:
   - **Rule name**: API Headers
   - **Field**: Hostname equals `zipperapi.supracarer.com`
   - **Action**: Set static → Header name: `X-Cloudflare-Skip-Challenge` → Value: `true`### 5. Use Cloudflare API Shield (Enterprise)

For enterprise accounts, configure API Shield to properly handle API traffic.

## Step-by-Step Configuration Priority

**SOLUTION 1: Direct API Fix (Fastest)**

1. **Create WAF Rule for API:**
   - Hostname: `zipperapi.supracarer.com`
   - Action: **Skip** → Select "All managed rules"
   - This prevents challenge HTML from breaking your JSON API responses

**SOLUTION 2: Two-Layer Protection (Your Idea - More Secure)**

1. **Main Site Human Verification:**

   - Hostname: `www.supracarer.com`
   - Action: **Managed Challenge**
   - This verifies visitors are human when they first visit your site

2. **API Skip Rule:**

   - Hostname: `zipperapi.supracarer.com`
   - Action: **Skip** → Select "All managed rules"
   - This allows authenticated API calls to work without interference

3. **Page Rules (Optional):**
   - Pattern: `zipperapi.supracarer.com/api/*`
   - Browser Integrity Check: Off
   - Cache Level: Bypass

**Recommendation:** Use Solution 2 for better security - verify humans on your main site, then let API calls work smoothly.

## Environment Variables Update

Update your production environment variables:

```bash
# Production
NEXT_PUBLIC_API_URL=https://zipperapi.supracarer.com/api
NEXTAUTH_URL=https://www.supracarer.com

# Development (keep as is)
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
NEXTAUTH_URL=http://localhost:3000
```

## Additional Headers for API Requests

Add these headers to help Cloudflare identify legitimate API traffic:

```javascript
// In your API request functions
headers: {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
  'User-Agent': 'SupraCarer-Frontend/1.0'
}
```

## Understanding Challenge Actions

**What happens with each action:**

1. **Managed Challenge**: Shows human verification (good for main site)
2. **Block**: Completely blocks requests (too harsh for your case)
3. **JS Challenge**: Shows JavaScript challenge (still breaks API JSON)
4. **Skip**: Bypasses challenges entirely (perfect for API endpoints)
5. **Interactive Challenge**: Shows captcha (breaks API like other challenges)

**For your login issue:** Only "Skip" action will work because other actions return HTML challenges instead of JSON.

## Testing

1. Apply Cloudflare rules
2. Wait 5-10 minutes for propagation
3. Test login functionality
4. Monitor network tab for proper JSON responses

**Expected Result:** No more "Unexpected token '<'" errors - your API will return proper JSON instead of HTML challenge pages.

## Security Considerations

### What Protection Remains Active:

**When using "Skip Challenges Only":**
✅ **DDoS Protection** - Still active
✅ **Rate Limiting** - Still active  
✅ **Malicious IP Blocking** - Still active
✅ **SSL/TLS Protection** - Still active
❌ **Human Challenges** - Disabled (this fixes your login issue)
❌ **Bot Challenges** - Disabled

**When using "Allow" Action:**
✅ **All Cloudflare protections remain active**
✅ **Traffic is simply allowed through without challenges**

### Additional API Security Recommendations:

1. **Backend Authentication**: Ensure your API has proper authentication/authorization
2. **Rate Limiting**: Implement API rate limiting on your backend
3. **Input Validation**: Validate all API inputs on the server side
4. **CORS Configuration**: Properly configure CORS to only allow your frontend domain
5. **API Keys/Tokens**: Use secure API authentication methods

### Best Practice Configuration:

Use **"Allow" action** instead of "Skip all rules" for better security:

- Keeps Cloudflare's DDoS and malicious traffic protection
- Allows legitimate API requests through
- Maintains security while fixing the JSON parsing issue

## Fallback: Whitelist Frontend IPs

If above doesn't work, you can whitelist your frontend server IPs in Cloudflare Security → WAF → Tools.
