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

### 3. Module Quizzes: Mandatory but Non-Graded
- Quizzes within modules are **mandatory** - cannot progress without attempting
- Quizzes are **self-assessed** - no pass/fail criteria
- Solutions provided immediately after submission
- Users view their answers + correct answers + explanations

### 4. Quiz Retakes: NOT Allowed
- Each quiz can only be attempted once
- After submission, quiz is locked for that user
- System prevents any retake attempts

### 5. Final Exam: Graded Certification
- Final exam required to obtain certificate
- Must achieve 85% or higher to pass
- Up to 3 attempts allowed
- 5-day cooldown period between failed attempts
- Certificate issued only upon passing the final exam

### 6. Completion Indicator: Module Access Control
- Users must complete all lessons and attempt all quizzes in current module
- Only then can access the next module
- Final exam unlocked after completing all modules

### 7. Certificate Issuance: Exam-Based
- Certificate issued **automatically** upon passing final exam (85%+)
- NOT dependent on quiz performance in modules
- Based solely on final exam score
- Self-paced nature means time-to-completion varies per student

## Implementation Architecture

### Type Definitions (`src/types/course.ts`)

#### Enhanced Course Type
```typescript
interface Course {
  // ... existing fields
  modules: Module[];               // Course divided into modules
  finalExam?: Exam;                // Final certification exam
  isSequenced?: boolean;           // Default: true, enforces strict order
}
```

#### Module Type
```typescript
interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  sequenceOrder: number;           // Position in course (0-indexed)
}
```

#### Enhanced Lesson Type
```typescript
interface Lesson {
  // ... existing fields
  durationSeconds?: number;       // For audio progress tracking
  sequenceOrder: number;          // Position in module (0-indexed)
  hasFollowingQuiz?: boolean;     // If next lesson is quiz
}
```

#### Module Quiz Attempt Type
```typescript
interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  lessonId: string;
  moduleId: string;
  courseId: string;
  answers: Record<string, string>;  // Question ID -> Answer
  submittedAt: Date;
  noRetakeAllowed: boolean;         // Always true
  // NO score field - self-assessed only
}
```

#### Final Exam Attempt Type
```typescript
interface ExamAttempt {
  id: string;
  userId: string;
  examId: string;
  courseId: string;
  score: number;                   // Percentage (0-100)
  attemptNumber: number;           // 1, 2, or 3
  answers: Record<string, string>; // Question ID -> Answer
  submittedAt: Date;
  result: 'PASS' | 'FAIL' | 'LOCKED' | 'COOLDOWN';
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
  completedModules: string[];         // Module IDs
  audioCompletedSeconds: number;
  audioTotalSeconds: number;
  quizAttempts: string[];             // Module quiz IDs attempted
  examAttempts: ExamAttempt[];        // Final exam attempts
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
  examScore: number;               // Final exam percentage
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
- `attemptQuiz()` - Record module quiz attempt (prevents retakes)
- `canAccessNextModule()` - Check if user can progress to next module
- `progressToNextLesson()` - Advance to next with all validations
- `isCourseComplete()` - Check if all modules finished
- `getCourseCompletionPercentage()` - Module completion percentage
- `canAccessLesson()` - Enforce sequence rules

**Business Rules Enforced:**
1. Audio must be 100% complete to progress within module
2. Mandatory module quizzes must be attempted before progressing to next module
3. No retakes allowed for module quizzes (first attempt is only attempt)
4. Strict sequence - modules must be completed in order
5. Module quiz attempts recorded but not scored (self-assessed)

#### Exam Policy Domain
**File:** `src/modules/certification/policy.evaluator.ts`

Handles final exam evaluation and certification policies:

**Key Functions:**
- `evaluateExamPolicy()` - Evaluate final exam attempt (85% threshold, 3 attempts max, 5-day cooldown)

**Business Rules Enforced:**
1. Final exam requires 85% or higher to pass
2. Maximum 3 attempts allowed
3. 5-day cooldown between failed attempts
4. Exam locked after 3 failed attempts

#### Certificate Eligibility Domain
**File:** `src/domains/certification/certificate-eligibility.ts`

Handles certificate issuance logic based on exam results:

**Key Functions:**
- `checkCertificateEligibility()` - Verify exam passed with 85%+
- `shouldAutoIssueCertificate()` - Check auto-issuance criteria
- `generateCertificateContent()` - Create certificate data
- `areAllQuizzesAttempted()` - Verify mandatory quizzes done
- `validateQuizProgress()` - Ensure quiz requirements met
- `generateCertificateContent()` - Create certificate data

**Business Rules Enforced:**
1. Certificate only issued when final exam passed (85%+)
2. Module quiz completion required but NOT scored
3. Auto-issue upon exam pass
4. Certificate reflects exam performance

### Orchestrators (`src/orchestrators/`)

#### Enrollment Orchestrator
**File:** `src/orchestrators/enrollment.orchestrator.ts`

New functions:
- `enrollUserToCourse()` - Initialize progress, start at module 1, lesson 1
- `recordLessonAccess()` - Validate sequence, grant access
- `recordAudioProgress()` - Track playback seconds
- `progressToNextLessonOrchestrated()` - Execute progression with validations

#### Certification Orchestrator
**File:** `src/orchestrators/certification.orchestrator.ts`

Enhanced functions:
- `orchestrateCertification()` - Issue certificate based on exam pass (85%+)
- `checkAndIssueCertificateAuto()` - Auto-trigger upon exam completion

**Key Change:** Certificate based on final exam performance:
```
examScore >= 85 && attemptNumber <= 3
```

## User Flow

### Enrollment Flow
```
1. User enrolls in course
2. CourseProgress initialized:
   - currentModuleIndex = 0
   - currentLessonIndex = 0
   - completedModules = []
   - audioCompletedSeconds = 0
   - audioTotalSeconds = sum of all lesson durations
3. User directed to Lesson 0 of Module 0
```

### Module Progression Flow
```
1. User accesses module
   ├─ Check: All previous modules completed?
   ├─ Check: Strict sequence enforced?
   └─ Grant access if yes

2. Within module - lesson progression:
   ├─ User completes all lessons in sequence
   ├─ Track audio completion per lesson
   └─ Attempt module quiz when required

3. Module completion check:
   ├─ All lessons audio 100% complete?
   ├─ All module quizzes attempted?
   └─ Mark module completed if yes

4. Progress to next module:
   ├─ Check: canAccessNextModule()?
   └─ Unlock next module if yes
```

### Final Exam Flow
```
1. User completes all modules
   
2. Final exam unlocked:
   ├─ Check: All modules completed?
   └─ Allow exam access if yes

3. Exam attempt:
   ├─ User takes exam (timed or untimed)
   ├─ Submit answers
   └─ System grades automatically

4. Exam evaluation:
   ├─ Score >= 85% → PASS
   ├─ Score < 85% → FAIL
   └─ Track attempt number
```

### Certificate Issuance Flow
```
1. Exam result = PASS

2. System triggers auto-issuance:
   ├─ Evaluate: examScore >= 85?
   ├─ Check: attemptNumber <= 3?
   └─ Create certificate

3. Certificate issued (async):
   ├─ Generate certificate document
   ├─ Store certificate record
   ├─ Send to user (email)
   ├─ Update CourseProgress.completedAt
   └─ Update CourseProgress.completionPercentage = 100%

4. User can download certificate from dashboard
```

## Data Model: Assessment Handling

### Module Quiz Logic (Self-Assessed, No Retakes)
```typescript
// Module quiz attempt - success
const attempt = attemptModuleQuiz(
  progressState,
  quizId,
  moduleId,
  answers
)
// Returns: QuizAttempt { attempted: true, submittedAt: Date }

// Second attempt - error
try {
  attemptModuleQuiz(progressState, quizId, moduleId, newAnswers)
} catch (e) {
  // "Module quiz has already been attempted. Retakes are not allowed."
}
```

### Module Quiz Display (Self-Assessed)
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

### Final Exam Logic (Graded, Limited Retakes)
```typescript
// Exam attempt evaluation
const result = evaluateExamPolicy({
  userId,
  courseId,
  score: 87.5,        // percentage
  attemptNumber: 1,
  lastAttemptDate: undefined
})
// Returns: 'PASS' | 'FAIL' | 'LOCKED' | 'COOLDOWN'

// Exam rules:
// - PASS: score >= 85
// - FAIL: score < 85, attemptNumber < 3
// - LOCKED: attemptNumber > 3
// - COOLDOWN: attemptNumber > 1, days since last attempt < 5
```

## API Endpoints Pattern

### Progress Tracking
```
POST /api/courses/[courseId]/modules/[moduleId]/lessons/[lessonId]/progress
{
  audioPlayedSeconds: 1234,
  isComplete: false
}
→ Updates CourseProgress.audioCompletedSeconds

GET /api/courses/[courseId]/progress
→ Returns: CourseProgress + currentModuleInfo + currentLessonInfo
```

### Module Quiz Submission
```
POST /api/courses/[courseId]/modules/[moduleId]/quizzes/[quizId]/submit
{
  answers: { questionId: "answer" }
}
→ Creates QuizAttempt (prevents retake)
→ Returns: solutions + explanations
```

### Module Access Check
```
GET /api/courses/[courseId]/modules/[moduleId]/access
→ Returns:
{
  canAccess: true|false,
  reason: "All lessons and quizzes in previous modules must be completed"
}
```

### Final Exam Submission
```
POST /api/courses/[courseId]/exam/submit
{
  answers: { questionId: "answer" },
  attemptNumber: 1
}
→ Grades exam automatically
→ Returns: { score: 87.5, result: "PASS", attemptNumber: 1 }
```

### Exam Eligibility Check
```
GET /api/courses/[courseId]/exam/eligibility
→ Returns:
{
  eligible: true|false,
  reason: "All modules must be completed before taking final exam"
}
```

### Certificate Auto-Issue
```
POST /api/courses/[courseId]/certificate/auto-issue
{
  examScore: 87.5,
  attemptNumber: 1
}
→ Called when exam result = PASS
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
