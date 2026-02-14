# Integration Setup Guide

This guide walks you through setting up all third-party integrations for PetroCourses.

## Quick Start

1. **Copy environment file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Fill in required credentials** (see below for each service)

4. **Validate setup:**
   ```bash
   npm run dev
   ```

---

## Phase 1: Core Integrations

### 1. Authentication & OAuth (Auth.js)

**Status:** Essential | **Time:** 15 mins

**Setup:**
- Go to [Google OAuth Console](https://console.cloud.google.com)
- Create OAuth 2.0 credentials (Web application)
- Add redirect URI: `http://localhost:3000/api/auth/callback/google`
- Copy Client ID and Secret to `.env.local`

```env
AUTH_GOOGLE_ID=your-id.apps.googleusercontent.com
AUTH_GOOGLE_SECRET=your-secret
```

**Optional Providers:**
- [GitHub OAuth](https://github.com/settings/apps): `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`
- [LinkedIn OAuth](https://www.linkedin.com/developers/apps): `AUTH_LINKEDIN_ID`, `AUTH_LINKEDIN_SECRET`
- [Microsoft OAuth](https://portal.azure.com): `AUTH_MICROSOFT_ID`, `AUTH_MICROSOFT_SECRET`

**Test:** Visit `/login` to see OAuth options

---

### 2. Email Delivery (Resend)

**Status:** Essential | **Time:** 10 mins

**Setup:**
1. Sign up at [Resend.com](https://resend.com)
2. Create API key
3. Verify domain or use default `resend.dev` domain
4. Add to `.env.local`:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@petrocourses.com
```

**Test:**
```typescript
import { getResendService } from '@/integrations';

const resend = getResendService();
await resend.sendWelcomeEmail('user@example.com', 'John');
```

---

### 3. Video Hosting (Mux)

**Status:** Essential | **Time:** 10 mins

**Setup:**
1. Sign up at [Mux.com](https://mux.com)
2. Create Access Token
3. Add to `.env.local`:

```env
MUX_TOKEN_ID=your-token-id
MUX_TOKEN_SECRET=your-token-secret
```

**Test:**
```typescript
import { getMuxService } from '@/integrations';

const mux = getMuxService();
const upload = await mux.createUpload({ filename: 'lesson.mp4' });
```

---

### 4. LLM / AI (OpenAI)

**Status:** Essential | **Time:** 5 mins

**Setup:**
1. Sign up at [OpenAI Platform](https://platform.openai.com)
2. Create API key
3. Add to `.env.local`:

```env
OPENAI_API_KEY=sk-xxxxxxxxxxxxx
```

**Test:**
```typescript
import { getOpenAIService } from '@/integrations';

const openai = getOpenAIService();
const response = await openai.chat({
  messages: [{ role: 'user', content: 'Hello!' }],
});
```

---

## Phase 2: Important Integrations

### 5. File Storage (AWS S3)

**Status:** Important | **Time:** 20 mins

**Setup:**
1. Create AWS account or use existing
2. Create IAM user with S3 permissions
3. Create S3 bucket (e.g., `petrocourses-storage`)
4. Generate access key and secret
5. Add to `.env.local`:

```env
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=xxxxx
AWS_S3_BUCKET=petrocourses-storage
AWS_REGION=us-east-1
```

**Test:**
```typescript
import { getS3Service } from '@/integrations';

const s3 = getS3Service();
const result = await s3.uploadCourseResource(
  'course-123',
  'material.pdf',
  buffer,
  'application/pdf'
);
```

---

### 6. SMS Delivery (Twilio)

**Status:** Important | **Time:** 10 mins

**Setup:**
1. Sign up at [Twilio.com](https://twilio.com)
2. Create a project
3. Get Account SID and Auth Token
4. Buy a phone number
5. Add to `.env.local`:

```env
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_PHONE_NUMBER=+1234567890
```

**Test:**
```typescript
import { getTwilioService } from '@/integrations';

const twilio = getTwilioService();
await twilio.sendSms({
  to: '+1234567890',
  body: 'Welcome to PetroCourses!',
});
```

---

### 7. Analytics (PostHog)

**Status:** Important | **Time:** 10 mins

**Setup:**
1. Sign up at [PostHog.com](https://posthog.com)
2. Create project
3. Get API key
4. Add to `.env.local`:

```env
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

**Test:**
```typescript
import { getPostHogService } from '@/integrations';

const posthog = getPostHogService();
await posthog.trackSignup('user-123', 'user@example.com');
```

---

## Phase 3: Advanced Integrations

### 8. Error Tracking (Sentry)

**Status:** Optional | **Time:** 10 mins

**Setup:**
1. Sign up at [Sentry.io](https://sentry.io)
2. Create project (Next.js)
3. Get DSN
4. Add to `.env.local`:

```env
NEXT_PUBLIC_SENTRY_DSN=https://key@sentry.io/xxxxx
SENTRY_TRACES_SAMPLE_RATE=0.1
```

**Test:**
```typescript
import { getSentryService } from '@/integrations';

const sentry = getSentryService();
await sentry.captureException(new Error('Test error'));
```

---

### 9. Push Notifications (Firebase)

**Status:** Optional | **Time:** 20 mins

**Setup:**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create new project
3. Enable Cloud Messaging
4. Generate private key (Settings > Service Accounts)
5. Add to `.env.local`:

```env
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
FIREBASE_CLIENT_EMAIL=your-email@appspot.gserviceaccount.com
```

**Test:**
```typescript
import { getFirebaseService } from '@/integrations';

const firebase = getFirebaseService();
await firebase.sendPushNotification(deviceToken, {
  title: 'Course Enrollment',
  body: 'You enrolled in a new course!',
});
```

---

## Validation & Monitoring

### Check Integration Status

```typescript
import { getIntegrationStatus } from '@/lib/integration-setup';

const status = getIntegrationStatus();
console.log(status);
// { oauth: true, email: true, video: true, ... }
```

### Validate Environment

```typescript
import { validateEnvironment } from '@/lib/integration-setup';

const result = validateEnvironment();
if (!result.valid) {
  console.error('Missing:', result.missing);
}
```

---

## Environment Variables Reference

| Variable | Purpose | Required | Example |
|----------|---------|----------|---------|
| `DATABASE_URL` | Database connection | ✅ | `postgresql://...` |
| `NEXTAUTH_SECRET` | Auth session secret | ✅ | `random-32-char-string` |
| `AUTH_GOOGLE_ID` | Google OAuth | ⚠️ | `xxx.apps.googleusercontent.com` |
| `RESEND_API_KEY` | Email service | ⚠️ | `re_...` |
| `MUX_TOKEN_ID` | Video hosting | ⚠️ | `token-id` |
| `OPENAI_API_KEY` | LLM service | ⚠️ | `sk_...` |
| `AWS_S3_BUCKET` | File storage | ⚠️ | `bucket-name` |
| `TWILIO_ACCOUNT_SID` | SMS service | ⚠️ | `AC...` |
| `NEXT_PUBLIC_POSTHOG_KEY` | Analytics | ⚠️ | `phc_...` |
| `NEXT_PUBLIC_SENTRY_DSN` | Error tracking | ❌ | `https://...` |
| `FIREBASE_PROJECT_ID` | Push notifications | ❌ | `project-id` |

✅ = Required  
⚠️ = Strongly Recommended  
❌ = Optional

---

## Troubleshooting

### "Integration not configured"
- Check `.env.local` has the required API keys
- Restart dev server after changing env vars
- Use `validateEnvironment()` to check what's missing

### "API request timeout"
- Check network connection
- Verify API keys are valid
- Increase timeout in `src/lib/integrations-config.ts`

### "Rate limit exceeded"
- Implement exponential backoff (done automatically)
- Check usage on provider dashboard
- Upgrade plan if needed

### Testing Locally

Use `npm run dev` and monitor console output:
```
✓ Integration Status: { oauth: true, email: true, ... }
📊 All integrations initialized successfully
```

---

## Deployment

### Production Checklist

- [ ] All API keys in production environment variables
- [ ] Verify HTTPS URLs for OAuth redirects
- [ ] Enable rate limiting in integrations config
- [ ] Set up error tracking (Sentry)
- [ ] Monitor analytics (PostHog)
- [ ] Test payment flows
- [ ] Verify email delivery
- [ ] Check SMS credits

### Environment Variables
Use your hosting platform's secrets management:
- Vercel: Dashboard > Settings > Environment Variables
- AWS: Systems Manager > Parameter Store
- Docker: `.env.production`

---

## Support

For issues or questions:
1. Check integration provider's documentation
2. Review console logs with `IntegrationLogger`
3. Test with `retryWithBackoff()` for reliability
4. Check rate limits and quotas
