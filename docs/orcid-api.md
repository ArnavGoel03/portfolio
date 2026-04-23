# ORCID Public API: Reference

Personal reference for using the ORCID Public API from this portfolio.

## Credentials

Stored in Vercel environment variables (**never hardcode**):

- `ORCID_CLIENT_ID`: client ID (starts with `APP-...`)
- `ORCID_CLIENT_SECRET`: client secret (UUID format)
- `ORCID_ID`: `0009-0007-6477-6501`
- `NEXT_PUBLIC_ORCID_ID`: same, exposed to browser

Registered redirect URI: `https://arnavgoel.dev/api/orcid/callback`

Rotate the client secret on ORCID developer tools if it ever leaks.

## Three OAuth flows

### 1. Client Credentials (2-legged): use this for reading public data

No user interaction. Gets a token for reading public records.

```bash
curl -i -L -H 'Accept: application/json' \
  --data "client_id=${ORCID_CLIENT_ID}&client_secret=${ORCID_CLIENT_SECRET}&grant_type=client_credentials&scope=/read-public" \
  https://orcid.org/oauth/token
```

Returns an access token valid ~20 years. Use it to fetch any public record:

```bash
curl -H "Accept: application/json" \
     -H "Authorization: Bearer ${ACCESS_TOKEN}" \
     https://pub.orcid.org/v3.0/${ORCID_ID}/record
```

### 2. Authorization Code (3-legged): only if another user needs to sign in with ORCID

**Authorize URL** (redirect the user here):

```
https://orcid.org/oauth/authorize
  ?client_id=${ORCID_CLIENT_ID}
  &response_type=code
  &scope=/authenticate
  &redirect_uri=https://arnavgoel.dev/api/orcid/callback
```

**Exchange code for token** (server-side):

```bash
curl -i -L -H 'Accept: application/json' \
  --data "client_id=${ORCID_CLIENT_ID}&client_secret=${ORCID_CLIENT_SECRET}&grant_type=authorization_code&redirect_uri=https://arnavgoel.dev/api/orcid/callback&code=REPLACE_WITH_OAUTH_CODE" \
  https://orcid.org/oauth/token
```

Returns access token + authenticated ORCID iD.

### 3. OpenID Connect (Implicit): sign-in only, browser-side

```
https://orcid.org/oauth/authorize
  ?client_id=${ORCID_CLIENT_ID}
  &response_type=token
  &scope=openid
  &redirect_uri=https://arnavgoel.dev/api/orcid/callback
```

Returns `access_token` + `id_token` in URL fragment.

## Endpoints

- `https://orcid.org/oauth/authorize`: user-facing authorize screen
- `https://orcid.org/oauth/token`: token exchange
- `https://pub.orcid.org/v3.0/{ORCID}/record`: full public record
- `https://pub.orcid.org/v3.0/{ORCID}/employments`
- `https://pub.orcid.org/v3.0/{ORCID}/educations`
- `https://pub.orcid.org/v3.0/{ORCID}/works`

Sandbox equivalents swap `orcid.org` → `sandbox.orcid.org` and `pub.orcid.org` → `pub.sandbox.orcid.org`.

## Constraints

- Public API is free for **non-commercial use only**. Fine for a personal portfolio. Not fine for any paid/revenue-generating product.
- Rate limit: 24 requests/sec per token (plenty for static builds).
- Redirect URI must match what's registered in developer tools **exactly**, including trailing slashes.

## Scopes

- `/authenticate`: just get an authenticated ORCID iD
- `/read-public`: read any public record (use for 2-legged)
- `openid`: OpenID Connect sign-in

Member API scopes (`/activities/update`, `/person/update`) require institutional membership (not available on Public API).
