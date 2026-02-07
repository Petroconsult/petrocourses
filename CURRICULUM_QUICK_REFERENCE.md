# Course Progression Quick Reference

## At a Glance: Business Rules

### Rule 1: Self-Paced Duration Tracking
- Students control when they access course content
- Duration tracked by audio/video playback time
- Progress = seconds watched / total seconds
- **Trigger:** Auto-complete when progress = 100%

### Rule 2: Strict Lesson Sequence
- Lessons must be completed in prescribed order
- No jumping ahead, no skipping sections
- Enforced by: `canAccessLesson()` function
- **Error:** "Cannot access. Complete previous lessons in order."

### Rule 3: Mandatory Quizzes
- Quizzes required after specific lessons
- Cannot progress without attempting quiz
- **Enforced by:** `progressToNextLesson()` checks quiz attempted
- **Error:** "Quiz must be completed before progressing"

### Rule 4: Self-Assessed, No Retakes
- Quiz shows solutions but has no pass/fail
- Each quiz = 1 attempt only
- System locks quiz after first submission
- **Error:** "Quiz already attempted. Retakes not allowed."

### Rule 5: Certificate = Audio Completion
- Certificate issued at 100% audio duration
- Independent of quiz performance
- Auto-issued when user reaches end of content
- **Logic:** `audioCompletedSeconds >= audioTotalSeconds`

---

## Code Usage Examples

### Initialize Course Enrollment
```typescript
import { enrollUserToCourse } from '@/orchestrators/enrollment.orchestrator';
import type { Course } from '@/types/course';

const course: Course = await fetchCourse(courseId);
const enrollment = await enrollUserToCourse(userId, courseId, course);
// Result: CourseProgress at lesson 0, module 0
```

### Track Audio Progress
```typescript
import { recordAudioProgress } from '@/orchestrators/enrollment.orchestrator';

// As user watches video:
const updated = await recordAudioProgress(
  userId,
  courseId,
  currentProgress,
  playedSeconds  // e.g., 150 (for 2:30 in)
);

if (updated.completionPercentage === 100) {
  // Audio complete - enable quiz or next lesson
}
```

### Submit Quiz (No Retakes)
```typescript
import { attemptQuiz } from '@/domains/training/course-progression';

try {
  const result = attemptQuiz(
    progressState,
    quizId,
    lessonId,
    { question1: 'answer_a', question2: 'answer_b' }
  );
  // Quiz recorded, solutions shown
} catch (e) {
  // "Quiz has already been attempted. Retakes are not allowed."
}
```

### Progress to Next Lesson
```typescript
import { progressToNextLesson } from '@/domains/training/course-progression';

try {
  const nextProgress = progressToNextLesson(course, currentProgress);
  // Validates: audio 100%, quiz attempted, sequence ok
} catch (e) {
  // "Cannot progress: Audio not fully completed. X seconds remaining."
}
```

### Check Certificate Eligibility
```typescript
import { checkCertificateEligibility } from '@/domains/certification/certificate-eligibility';

const eligibility = checkCertificateEligibility(
  userId,
  courseId,
  progress.audioCompletedSeconds,
  progress.audioTotalSeconds,
  progress.completedAt
);

if (eligibility.isEligible) {
  // Issue certificate
}
```

### Auto-Issue Certificate
```typescript
import { checkAndIssueCertificateAuto } from '@/orchestrators/certification.orchestrator';

const result = await checkAndIssueCertificateAuto(userId, course, progress);
if (result.issued) {
  console.log('Certificate:', result.certificateId);
}
```

---

## File Structure

```
src/
├── types/
│   └── course.ts                    # Quiz, CourseProgress, Certificate types
├── domains/
│   ├── training/
│   │   └── course-progression.ts    # Progression logic, sequence enforce
│   └── certification/
│       └── certificate-eligibility.ts # Audio-based cert eligibility
├── orchestrators/
│   ├── enrollment.orchestrator.ts   # Enroll, record access, progress
│   └── certification.orchestrator.ts # Issue certs (audio-based)
└── lib/
    └── integrations-config.ts       # TRAINING_CONFIG constants
```

---

## Key Functions Reference

### Progression Domain
| Function | Purpose | Input | Output |
|----------|---------|-------|--------|
| `progressToNextLesson()` | Advance to next lesson with all checks | Course, Progress | Updated Progress or Error |
| `canAccessLesson()` | Check if sequence allows access | Course, moduleIdx, lessonIdx, Progress | boolean |
| `completeLessonByAudioCompletion()` | Mark lesson complete on 100% audio | Progress, duration | Updated Progress |
| `attemptQuiz()` | Record quiz attempt (prevents retakes) | Progress, quizId, answers | Updated Progress or Error |
| `calculateTotalAudioDuration()` | Sum all audio in course | Course | seconds |

### Certification Domain
| Function | Purpose | Input | Output |
|----------|---------|-------|--------|
| `checkCertificateEligibility()` | Check 100% audio complete | userId, courseId, audioSecs, totalSecs | Eligibility object |
| `shouldAutoIssueCertificate()` | Check if should auto-issue | Course, audioSecs, totalSecs, quizzesAttempted | boolean |
| `areAllQuizzesAttempted()` | Verify mandatory quizzes done | Course, attemptedIds | boolean |
| `validateQuizProgress()` | Check quiz requirements | quizRequired, quizAttempted | {valid, reason} |

---

## Type Signatures

### Course Progress State
```typescript
interface CourseProgress {
  userId: string;
  courseId: string;
  currentModuleIndex: number;      // Current position
  currentLessonIndex: number;      // Lesson within module
  completedLessons: string[];      // Lesson IDs done
  audioCompletedSeconds: number;   // Seconds watched
  audioTotalSeconds: number;       // Total seconds in course
  quizAttempts: string[];          // Quiz IDs attempted
  enrolledAt: Date;
  startedAt?: Date;
  completedAt?: Date;              // When audio reached 100%
  completionPercentage: number;    // audioCompleted / audioTotal
}
```

### Quiz Attempt (No Score)
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
  // NOTE: NO score, NO passed field
}
```

---

## Common Issues & Solutions

### Issue: User tries to access lesson 3 before completing lesson 1
**Solution:** Call `canAccessLesson()` before granting access
```typescript
const canAccess = canAccessLesson(course, 0, 2, progress);
if (!canAccess) {
  throw new Error("Complete previous lessons first");
}
```

### Issue: User submits quiz twice
**Solution:** `attemptQuiz()` auto-checks and throws error
```typescript
try {
  attemptQuiz(progress, quizId, ...);
} catch (e) {
  // "Quiz has already been attempted..."
}
```

### Issue: How to know when to show "Next Lesson" button?
**Solution:** Check audio is 100% AND quiz attempted (if required)
```typescript
const audioComplete = progress.audioCompletedSeconds >= 
                     progress.audioTotalSeconds;
const quizAttempted = progress.quizAttempts.includes(quizId);
const canProceed = audioComplete && (quizAttempted || !quizRequired);
```

### Issue: Calculating remaining audio time
**Solution:** Use helper function
```typescript
import { parseDurationToSeconds } from '@/domains/training/course-progression';
const remaining = lessonDurationSeconds - audioPlayedSeconds;
```

---

## API Response Examples

### POST /api/courses/[courseId]/lessons/[lessonId]/progress
**Request:**
```json
{
  "audioPlayedSeconds": 240,
  "isComplete": false
}
```

**Response (Success):**
```json
{
  "success": true,
  "progress": {
    "audioCompletedSeconds": 240,
    "audioDurationSeconds": 600,
    "completionPercentage": 40,
    "status": "in-progress"
  }
}
```

### POST /api/courses/[courseId]/quizzes/[quizId]/submit
**Request:**
```json
{
  "answers": {
    "q1": "answer_a",
    "q2": "answer_b"
  }
}
```

**Response (Success):**
```json
{
  "success": true,
  "submitted": true,
  "solutions": {
    "q1": {
      "correct": "answer_a",
      "explanation": "..."
    }
  },
  "message": "Quiz recorded. Retakes not allowed."
}
```

**Response (Already Attempted):**
```json
{
  "success": false,
  "error": "Quiz has already been attempted. Retakes are not allowed."
}
```

### GET /api/courses/[courseId]/certificate/eligibility
**Response:**
```json
{
  "eligible": true,
  "audioCompletionPercentage": 100,
  "reason": "Audio duration completed - certificate eligible"
}
```

---

## Testing Checklist

- [ ] User cannot access lesson without completing prior lessons
- [ ] Audio progress tracked and updated in real-time
- [ ] Lesson marks complete when audio = 100%
- [ ] Quiz attempt recorded and locked after submission
- [ ] Second quiz submission attempt returns error
- [ ] Cannot progress past quiz without attempting
- [ ] Cannot progress past lesson with incomplete audio
- [ ] Certificate auto-issues when audio = 100% AND quizzes done
- [ ] Certificate URL available for download
- [ ] Completion percentage accurate
- [ ] All timestamps (enrolledAt, completedAt, etc.) recorded
