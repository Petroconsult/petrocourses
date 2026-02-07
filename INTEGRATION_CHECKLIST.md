# Integration Setup Checklist

## Pre-Setup
- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Copy `.env.example` to `.env.local`

---

## Phase 1: Core Integrations (Essential)

### 1. Database
- [ ] Set `DATABASE_URL` (PostgreSQL)
- [ ] Run migrations: `npm run prisma:migrate`
- [ ] Test connection: `npm run dev`

### 2. Authentication Secret
- [ ] Generate secure secret: `openssl rand -base64 32`
- [ ] Set `NEXTAUTH_SECRET`

### 3. OAuth - Google
- [ ] Go to [Google Cloud Console](https://console.cloud.google.com)
- [ ] Create OAuth 2.0 credentials
- [ ] Add redirect URI: `http://localhost:3000/api/auth/callback/google`
- [ ] Set `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET`
- [ ] Test: Visit `/auth/login`

### 4. Email - Resend
- [ ] Sign up at [resend.com](https://resend.com)
- [ ] Create API key
- [ ] Set `RESEND_API_KEY`
- [ ] Set `RESEND_FROM_EMAIL`
- [ ] Test: Call `sendWelcomeEmail()` in Node console

### 5. Video - Mux
- [ ] Sign up at [mux.com](https://mux.com)
- [ ] Create Access Token
- [ ] Set `MUX_TOKEN_ID` and `MUX_TOKEN_SECRET`
- [ ] Test: Call `createUpload()` in Node console

### 6. LLM - OpenAI
- [ ] Sign up at [platform.openai.com](https://platform.openai.com)
- [ ] Create API key
- [ ] Set `OPENAI_API_KEY`
- [ ] Test: Call `chat()` with a test message

**Verification:**
```bash
npm run dev
# Look for:
# ✓ Integration Status: { oauth: true, email: true, video: true, llm: true, ... }
```

---

## Phase 2: Important Integrations

### 7. File Storage - AWS S3
- [ ] Create AWS account or use existing
- [ ] Create IAM user with S3 permissions
- [ ] Create S3 bucket (e.g., `petrocourses-storage`)
- [ ] Generate access key and secret
- [ ] Set `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_S3_BUCKET`, `AWS_REGION`
- [ ] Test: Upload a file with `uploadCourseResource()`

### 8. SMS - Twilio
- [ ] Sign up at [twilio.com](https://twilio.com)
- [ ] Create project
- [ ] Get Account SID and Auth Token
- [ ] Buy a phone number
- [ ] Set `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`
- [ ] Test: Send SMS with `sendSms()`

### 9. Analytics - PostHog
- [ ] Sign up at [posthog.com](https://posthog.com)
- [ ] Create project
- [ ] Set `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST`
- [ ] Test: Track an event with `trackSignup()`

**Verification:**
```bash
npm run dev
# Check integration status includes: analytics, storage, sms
```

---

## Phase 3: Advanced Integrations (Optional)

### 10. Error Tracking - Sentry
- [ ] Sign up at [sentry.io](https://sentry.io)
- [ ] Create Next.js project
- [ ] Set `NEXT_PUBLIC_SENTRY_DSN`
- [ ] Set `SENTRY_TRACES_SAMPLE_RATE`
- [ ] Test: Trigger error in dev and check Sentry

### 11. Push Notifications - Firebase
- [ ] Go to [Firebase Console](https://console.firebase.google.com)
- [ ] Create project
- [ ] Enable Cloud Messaging
- [ ] Generate private key (Settings > Service Accounts)
- [ ] Set `FIREBASE_PROJECT_ID`, `FIREBASE_PRIVATE_KEY`, `FIREBASE_CLIENT_EMAIL`
- [ ] Test: Send push notification

**Verification:**
All 12 integrations should show as `true` in integration status.

---

## Integration Testing

### Test Each Service
```typescript
// In Node console or test file
import { getResendService, getMuxService, ... } from '@/integrations';

// Test Resend
const resend = getResendService();
const emailResult = await resend.sendWelcomeEmail('test@example.com', 'Test');
console.log(emailResult);

// Test Mux
const mux = getMuxService();
const uploadResult = await mux.createUpload({ filename: 'test.mp4' });
console.log(uploadResult);

// Test S3
const s3 = getS3Service();
const s3Result = await s3.upload({ ... });
console.log(s3Result);
```

### Validate Environment
```bash
# In your app startup or test
import { validateEnvironment, getIntegrationStatus } from '@/lib/integration-setup';

const validation = validateEnvironment();
console.log(validation); // { valid: true, missing: [] }

const status = getIntegrationStatus();
console.log(status); // { oauth: true, email: true, ... }
```

---

## Development Best Practices

### Logging
```typescript
import { IntegrationLogger } from '@/utils/integration-helpers';

const logger = new IntegrationLogger('MyService');
logger.info('Starting operation');
logger.debug('Detailed info', { userId });
logger.warn('Potential issue');
logger.error('Error occurred', error);
```

### Error Handling
```typescript
import { retryWithBackoff } from '@/utils/integration-helpers';

try {
  const result = await retryWithBackoff(
    () => someIntegrationCall(),
    3  // max attempts
  );
} catch (error) {
  // Handle error
}
```

### Rate Limiting
```typescript
import { RateLimiter } from '@/utils/integration-helpers';

const limiter = new RateLimiter(100, 60000); // 100 per minute
if (limiter.canMakeRequest()) {
  await someApiCall();
}
```

---

## Deployment Preparation

### Environment Checklist
- [ ] All required env vars set in production
- [ ] Secrets stored securely (Vercel, AWS, etc.)
- [ ] OAuth redirect URIs updated for production domain
- [ ] Email domain verified with Resend
- [ ] S3 bucket configured for production
- [ ] Firebase project ID updated
- [ ] Stripe keys updated to production
- [ ] Database connected to production

### Performance Checklist
- [ ] Rate limits configured appropriately
- [ ] Timeouts set to reasonable values
- [ ] Retry logic enabled
- [ ] Error tracking enabled (Sentry)
- [ ] Analytics configured (PostHog)
- [ ] Database connection pooling enabled

### Security Checklist
- [ ] API keys never committed to git
- [ ] `.env.local` in `.gitignore`
- [ ] Secrets rotated regularly
- [ ] HTTPS enforced
- [ ] CORS configured correctly
- [ ] API rate limiting enabled
- [ ] Input validation on all endpoints

---

## Troubleshooting

### Common Issues

**"Integration not configured"**
```bash
# Check what's missing
npm run dev
# Look for warnings about missing env vars
```

**"API request timeout"**
```typescript
// Increase timeout in integrations-config.ts
export const TIMEOUTS = {
  EMAIL: 15000,  // increased from 10000
  ...
};
```

**"Rate limit exceeded"**
```typescript
// Check usage on provider dashboard
// Implement retry with backoff (already done)
// Upgrade plan if needed
```

**"Authentication failed"**
```bash
# Verify API keys are correct
# Check provider's console for recent activity
# Ensure keys haven't expired
```

---

## Monitoring in Production

### Key Metrics to Track
- [ ] Payment success rate
- [ ] Email delivery rate
- [ ] Video upload/playback errors
- [ ] API response times
- [ ] Error rates by integration
- [ ] User conversion funnel

### Alerts to Set Up
- [ ] Payment failures > 5%
- [ ] Email delivery failures > 2%
- [ ] Video upload failures
- [ ] API errors in Sentry
- [ ] High error rates

### Regular Maintenance
- [ ] Weekly: Check error logs
- [ ] Monthly: Review analytics
- [ ] Quarterly: Audit API key usage
- [ ] Annually: Security review

---

## Support Resources

### Documentation
- [INTEGRATION_SETUP_GUIDE.md](./INTEGRATION_SETUP_GUIDE.md) — Step-by-step setup
- [INTEGRATION_USAGE_EXAMPLES.md](./INTEGRATION_USAGE_EXAMPLES.md) — Code examples
- [INTEGRATION_SYNC_SUMMARY.md](./INTEGRATION_SYNC_SUMMARY.md) — Architecture overview

### Provider Docs
- [Auth.js](https://authjs.dev/) — Authentication
- [Resend](https://resend.com/docs) — Email
- [Mux](https://docs.mux.com/) — Video
- [OpenAI](https://platform.openai.com/docs) — LLM
- [AWS S3](https://docs.aws.amazon.com/s3/) — Storage
- [Twilio](https://www.twilio.com/docs) — SMS
- [PostHog](https://posthog.com/docs) — Analytics
- [Sentry](https://docs.sentry.io/) — Error tracking
- [Firebase](https://firebase.google.com/docs) — Push notifications

### Quick Reference
```bash
# Validate setup
npm run dev

# Check integration status
# See console output: 📊 Integration Status: { ... }

# Test email
node -e "require('@/integrations').getResendService().sendWelcomeEmail('test@test.com', 'Test')"

# Run tests
npm run test
```

---

## Final Sign-Off

- [ ] All integrations configured and tested
- [ ] Environment variables validated
- [ ] Documentation reviewed
- [ ] Team trained on integration patterns
- [ ] Error tracking set up
- [ ] Analytics configured
- [ ] Monitoring alerts configured
- [ ] Ready for deployment

**Status:** ✅ Ready to Launch
