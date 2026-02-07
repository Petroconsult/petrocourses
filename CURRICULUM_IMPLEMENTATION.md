# Course Delivery & Curriculum Implementation

## Overview

This document describes the implementation of PetroCourses' specific course delivery model, which differs from traditional online course platforms in several key ways.

## Business Requirements

### 1. Course Pacing: Self-Paced
- Customers access courses at their own leisure
- No scheduled start/end dates for course completion
- Each student progresses independently through the material
- Real-time duration tracking from video/audio playback

### 2. Lesson Sequencing: Strict Order Required
- Lessons MUST be completed in the prescribed order
- No flexibility in section selection
- Users cannot jump ahead or skip lessons
- Enforced at the orchestrator level

### 3. Quizzes: Mandatory but Non-Graded
- Quizzes are **mandatory** - cannot progress without attempting
- Quizzes are **self-assessed** - no pass/fail criteria
- Solutions provided immediately after submission
- Users view their answers + correct answers + explanations

### 4. Quiz Retakes: NOT Allowed
- Each quiz can only be attempted once
- After submission, quiz is locked for that user
- System prevents any retake attempts
- Important: No "passing grade" required to progress

### 5. Completion Indicator: Audio Duration
- Certificate issued when audio duration reaches 100%
- Not based on quiz scores or any other metric
- Calculated by tracking actual playback time
- Self-paced nature means time-to-completion varies per student

### 6. Certificate Issuance: Audio-Based
- Certificate issued **automatically** upon reaching end of recorded audio
- NOT dependent on quiz performance
- NOT dependent on any grading criteria
- Based solely on: `audioCompletedSeconds >= audioTotalSeconds`

### 7. Data Point: Reaching End of Section
- Completion = reaching end of section/recorded audio time
- System tracks playback progress in real-time
- Auto-triggers certificate issuance when threshold reached

## Implementation Architecture

### Type Definitions (`src/types/course.ts`)

#### Enhanced Course Type
```typescript
interface Course {
  // ... existing fields
  audioDurationSeconds?: number;  // Total audio seconds for completion
  isSequenced?: boolean;          // Default: true, enforces strict order
}
```

#### Enhanced Lesson Type
```typescript
interface Lesson {
  // ... existing fields
  durationSeconds?: number;       // For audio progress tracking
  sequenceOrder: number;          // Position in sequence (0-indexed)
  hasFollowingQuiz?: boolean;     // If next lesson is quiz
}
```

#### New QuizAttempt Type
```typescript
interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  lessonId: string;
  courseId: string;
  answers: Record<string, string>;  // Question ID -> Answer
  submittedAt: Date;
  noRetakeAllowed: boolean;         // Always true
  // NO score field - self-assessed only
}
```

#### New CourseProgress Type
```typescript
interface CourseProgress {
  userId: string;
  courseId: string;
  currentModuleIndex: number;
  currentLessonIndex: number;
  completedLessons: string[];         // Lesson IDs
  audioCompletedSeconds: number;
  audioTotalSeconds: number;
  quizAttempts: string[];             // Quiz IDs attempted
  enrolledAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  completionPercentage: number;
}
```

#### New CertificateInfo Type
```typescript
interface CertificateInfo {
  id: string;
  userId: string;
  courseId: string;
  courseName: string;
  instructorName: string;
  completionDate: Date;
  issuedAt: Date;
  audioCompletionPercentage: number;  // 100% for certificate
  certificateUrl?: string;
}
```

### Domain Logic (`src/domains/`)

#### Course Progression Domain
**File:** `src/domains/training/course-progression.ts`

Handles all progression validation and state management:

**Key Functions:**
- `getCurrentLessonProgress()` - Get current lesson state
- `completeLessonByAudioCompletion()` - Mark lesson complete when audio reaches 100%
- `attemptQuiz()` - Record quiz attempt (prevents retakes)
- `progressToNextLesson()` - Advance to next with all validations
- `isCourseComplete()` - Check if entire course finished
- `getCourseCompletionPercentage()` - Audio % completion
- `canAccessLesson()` - Enforce sequence rules

**Business Rules Enforced:**
1. Audio must be 100% complete to progress
2. Mandatory quizzes must be attempted before progressing
3. No retakes allowed (first attempt is only attempt)
4. Strict sequence - only accessible lessons can be accessed
5. Quiz attempt recorded but not scored

#### Certificate Eligibility Domain
**File:** `src/domains/certification/certificate-eligibility.ts`

Handles certificate issuance logic based on audio completion:

**Key Functions:**
- `checkCertificateEligibility()` - Verify audio is 100% complete
- `shouldAutoIssueCertificate()` - Check auto-issuance criteria
- `areAllQuizzesAttempted()` - Verify mandatory quizzes done
- `validateQuizProgress()` - Ensure quiz requirements met
- `generateCertificateContent()` - Create certificate data

**Business Rules Enforced:**
1. Certificate only issued when audio = 100%
2. Quiz completion required but NOT scored
3. Auto-issue upon reaching end of audio
4. Certificate reflects audio completion, not quiz performance

### Orchestrators (`src/orchestrators/`)

#### Enrollment Orchestrator
**File:** `src/orchestrators/enrollment.orchestrator.ts`

New functions:
- `enrollUserToCourse()` - Initialize progress, start at lesson 1
- `recordLessonAccess()` - Validate sequence, grant access
- `recordAudioProgress()` - Track playback seconds
- `progressToNextLessonOrchestrated()` - Execute progression with validations

#### Certification Orchestrator
**File:** `src/orchestrators/certification.orchestrator.ts`

Enhanced functions:
- `orchestrateCertification()` - Issue certificate based on audio completion
- `checkAndIssueCertificateAuto()` - Auto-trigger at 100% audio
- `orchestrateCertificationByPathway()` - Legacy compatibility

**Key Change:** Removed grading/pass-fail logic. Certificate based solely on:
```
audioCompletedSeconds >= audioTotalSeconds
```

## User Flow

### Enrollment Flow
```
1. User enrolls in course
2. CourseProgress initialized: 
   - currentModuleIndex = 0
   - currentLessonIndex = 0
   - audioCompletedSeconds = 0
   - audioTotalSeconds = sum of all lesson durations
3. User directed to Lesson 0 of Module 0
```

### Lesson Progression Flow
```
1. User accesses lesson
   ├─ Check: All previous lessons completed?
   ├─ Check: Strict sequence enforced?
   └─ Grant access if yes

2. User watches video/listens to audio
   ├─ Track playback seconds in real-time
   ├─ Update audioCompletedSeconds
   └─ Calculate completionPercentage = audioCompletedSeconds / lessonDuration

3. When audioCompletedSeconds >= lessonDuration:
   ├─ Mark lesson completed
   └─ Check if quiz follows

4. If quiz follows:
   ├─ Show quiz (mandatory)
   ├─ User submits answers
   └─ Show solutions + explanations

5. Progress to next lesson:
   ├─ Check: Audio 100% complete?
   ├─ Check: Quiz attempted (if required)?
   └─ Unlock next lesson if yes
```

### Certificate Issuance Flow
```
1. User completes final lesson's audio (100%)
   
2. System triggers auto-issuance:
   ├─ Calculate: audioCompletedSeconds >= audioTotalSeconds?
   ├─ Verify: All quizzes attempted?
   └─ Create certificate

3. Certificate issued (async):
   ├─ Generate certificate document
   ├─ Store certificate record
   ├─ Send to user (email)
   ├─ Update CourseProgress.completedAt
   └─ Update CourseProgress.completionPercentage = 100%

4. User can download certificate from dashboard
```

## Data Model: Quiz Handling

### Quiz Attempt Logic (No Retakes)
```typescript
// First attempt - success
const attempt = attemptQuiz(
  progressState,
  quizId,
  lessonId,
  answers
)
// Returns: QuizAttempt { attempted: true, submittedAt: Date }

// Second attempt - error
try {
  attemptQuiz(progressState, quizId, lessonId, newAnswers)
} catch (e) {
  // "Quiz has already been attempted. Retakes are not allowed."
}
```

### Quiz Display (Self-Assessed)
```typescript
// After submission, show:
{
  yourAnswers: { questionId: "answer" },
  correctAnswers: { questionId: "correct_answer" },
  explanations: { questionId: "explanation_text" }
}

// NOT shown:
// - Score
// - Pass/Fail
// - Points
```

## API Endpoints Pattern

### Progress Tracking
```
POST /api/courses/[courseId]/lessons/[lessonId]/progress
{
  audioPlayedSeconds: 1234,
  isComplete: false
}
→ Updates CourseProgress.audioCompletedSeconds

GET /api/courses/[courseId]/progress
→ Returns: CourseProgress + currentLessonInfo
```

### Quiz Submission
```
POST /api/courses/[courseId]/quizzes/[quizId]/submit
{
  answers: { questionId: "answer" }
}
→ Creates QuizAttempt (prevents retake)
→ Returns: solutions + explanations
```

### Certificate Check
```
GET /api/courses/[courseId]/certificate/eligibility
→ Returns:
{
  eligible: true|false,
  audioCompletion: 95,
  reason: "95% of audio completed. 5% remaining."
}
```

### Auto-Issue Certificate
```
POST /api/courses/[courseId]/certificate/auto-issue
→ Called when audioCompletedSeconds >= audioTotalSeconds
→ Creates and returns certificate
```

## Key Differences from Traditional LMS

| Feature | Traditional LMS | PetroCourses |
|---------|-----------------|--------------|
| Pacing | Scheduled cohorts or self-paced | Self-paced |
| Completion | Graded assessments, passing score | Audio duration (100%) |
| Quizzes | Scored, graded, may need passing | Mandatory, self-assessed, no score |
| Retakes | Often allowed, multiple attempts | Not allowed (one attempt) |
| Certificate | Based on grades | Based on audio completion |
| Sequence | Often flexible | Strict, enforced |
| Progress | Lesson completion | Audio playback duration |

## Configuration Constants

**File:** `src/lib/integrations-config.ts`

Add training-specific config:
```typescript
export const TRAINING_CONFIG = {
  QUIZ_RETRY_ALLOWED: false,        // Hard constraint
  QUIZ_REQUIRED: true,              // Mandatory quizzes
  SEQUENCE_ENFORCED: true,          // Strict ordering
  AUTO_ISSUE_CERTIFICATE: true,     // Auto on 100%
  AUDIO_COMPLETION_THRESHOLD: 100,  // 100% required
};
```

## Logging & Monitoring

All progression events are logged:
```
enrollment.lesson.access.start
enrollment.lesson.access.granted
enrollment.lesson.access.denied
enrollment.progress.next_lesson.success
certification.orchestrator.start
certificate.issued
```

## Error Handling

**Sequence Violation:**
```
"Cannot access this lesson. Complete previous lessons in order."
```

**Quiz Retake Attempt:**
```
"Quiz has already been attempted. Retakes are not allowed."
```

**Quiz Not Completed:**
```
"Quiz must be completed before progressing to next lesson."
```

**Incomplete Audio:**
```
"Cannot progress: Audio not fully completed. 120 seconds remaining."
```

## Testing Scenarios

1. **Happy Path - Completion:**
   - Enroll → Watch all lessons (100%) → Attempt quizzes → Certificate issued ✓

2. **Sequence Violation:**
   - Enroll → Try to access lesson 3 directly → Access denied ✓

3. **Quiz Retake:**
   - Complete quiz → Try to submit again → Error: no retakes ✓

4. **Incomplete Audio:**
   - Watch 80% of lesson → Try to progress → Error: must complete ✓

5. **Missing Quiz:**
   - Complete audio → Skip quiz → Try to progress → Error: quiz required ✓

## Future Enhancements

- [ ] Pause/resume video playback tracking
- [ ] Speed adjustments (1x, 1.5x, 2x) with duration compensation
- [ ] Offline viewing with sync on reconnect
- [ ] Learning path recommendations based on performance
- [ ] Advanced analytics on learning patterns
- [ ] Peer comparison (anonymized) on completion times
- [ ] Gamification: badges for rapid completion, consistency

## References

- [Lesson Progression Domain](../src/domains/training/course-progression.ts)
- [Certificate Eligibility Domain](../src/domains/certification/certificate-eligibility.ts)
- [Enrollment Orchestrator](../src/orchestrators/enrollment.orchestrator.ts)
- [Certification Orchestrator](../src/orchestrators/certification.orchestrator.ts)
- [Course Types](../src/types/course.ts)
