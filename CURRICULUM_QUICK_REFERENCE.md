# Course Progression Quick Reference

## At a Glance: Business Rules

### Rule 1: Self-Paced Duration Tracking
- Students control when they access course content
- Duration tracked by audio/video playback time
- Progress = seconds watched / total seconds
- **Trigger:** Auto-complete lesson when progress = 100%

### Rule 2: Strict Module Sequence
- Modules must be completed in prescribed order
- No jumping ahead, no skipping modules
- Enforced by: `canAccessNextModule()` function
- **Error:** "Cannot access. Complete current module first."

### Rule 3: Mandatory Module Quizzes
- Quizzes required within modules
- Cannot progress to next module without attempting all quizzes
- **Enforced by:** `canAccessNextModule()` checks all quizzes attempted
- **Error:** "All module quizzes must be completed before progressing"

### Rule 4: Self-Assessed, No Retakes
- Module quizzes show solutions but have no pass/fail
- Each quiz = 1 attempt only
- System locks quiz after first submission
- **Error:** "Quiz already attempted. Retakes not allowed."

### Rule 5: Final Exam Certification
- Certificate issued upon passing final exam (85%+)
- Exam unlocked after completing all modules
- Maximum 3 attempts with 5-day cooldown between failures
- **Logic:** Exam score >= 85 && attemptNumber <= 3

---

## Code Usage Examples

### Initialize Course Enrollment
```typescript
import { enrollUserToCourse } from '@/orchestrators/enrollment.orchestrator';
import type { Course } from '@/types/course';

const course: Course = await fetchCourse(courseId);
const enrollment = await enrollUserToCourse(userId, courseId, course);
// Result: CourseProgress at module 0, lesson 0
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
  // Lesson audio complete - can attempt module quiz
}
```

### Submit Module Quiz (No Retakes)
```typescript
import { attemptQuiz } from '@/domains/training/course-progression';

try {
  const result = attemptQuiz(
    progressState,
    quizId,
    moduleId,
    { question1: 'answer_a', question2: 'answer_b' }
  );
  // Quiz recorded, solutions shown
} catch (e) {
  // "Module quiz has already been attempted. Retakes are not allowed."
}
```

### Check Module Access
```typescript
import { canAccessNextModule } from '@/domains/training/course-progression';

const canAccess = canAccessNextModule(course, currentProgress);
if (canAccess) {
  // Allow progression to next module
} else {
  // "Complete all lessons and quizzes in current module first"
}
```

### Submit Final Exam
```typescript
import { evaluateExamPolicy } from '@/modules/certification/policy.evaluator';

const result = evaluateExamPolicy({
  userId,
  courseId,
  score: 87.5,        // percentage
  attemptNumber: 1,
  lastAttemptDate: undefined
});
// Returns: 'PASS' | 'FAIL' | 'LOCKED' | 'COOLDOWN'
```

### Issue Certificate
```typescript
import { orchestrateCertification } from '@/orchestrators/certification.orchestrator';

const certificate = await orchestrateCertification(
  userId,
  course,
  examScore,      // 87.5
  attemptNumber   // 1
);
// Returns certificate if exam passed, null if failed
```

---

## File Structure

```
src/
├── types/
│   └── course.ts                    # Module, Exam, CourseProgress, Certificate types
├── domains/
│   ├── training/
│   │   └── course-progression.ts    # Progression logic, module access control
│   └── certification/
│       └── certificate-eligibility.ts # Exam-based cert eligibility
├── modules/
│   └── certification/
│       └── policy.evaluator.ts      # Exam policy evaluation (85% threshold)
├── orchestrators/
│   ├── enrollment.orchestrator.ts   # Enroll, record access, progress
│   └── certification.orchestrator.ts # Issue certs (exam-based)
└── lib/
    └── integrations-config.ts       # TRAINING_CONFIG constants
```

---

## Key Functions Reference

### Progression Domain
| Function | Purpose | Input | Output |
|----------|---------|-------|--------|
| `canAccessNextModule()` | Check if can progress to next module | Course, Progress | boolean |
| `progressToNextLesson()` | Advance to next lesson with all checks | Course, Progress | Updated Progress or Error |
| `canAccessLesson()` | Check if sequence allows access | Course, moduleIdx, lessonIdx, Progress | boolean |
| `completeLessonByAudioCompletion()` | Mark lesson complete on 100% audio | Progress, duration | Updated Progress |
| `attemptQuiz()` | Record module quiz attempt (prevents retakes) | Progress, quizId, answers | Updated Progress or Error |
| `calculateTotalAudioDuration()` | Sum all audio in course | Course | seconds |

### Certification Domain
| Function | Purpose | Input | Output |
|----------|---------|-------|--------|
| `evaluateExamPolicy()` | Evaluate final exam against policies | ExamAttempt | 'PASS' \| 'FAIL' \| 'LOCKED' \| 'COOLDOWN' |
| `checkCertificateEligibility()` | Check exam passed | userId, courseId, examScore, attemptNumber | Eligibility object |
| `shouldAutoIssueCertificate()` | Check if should auto-issue | examScore, attemptNumber | boolean |
| `orchestrateCertification()` | Issue certificate if exam passed | userId, course, examScore, attemptNumber | Certificate or null |

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
  completedModules: string[];      // Module IDs done
  audioCompletedSeconds: number;   // Seconds watched
  audioTotalSeconds: number;       // Total seconds in course
  quizAttempts: string[];          // Module quiz IDs attempted
  examAttempts: ExamAttempt[];     // Final exam attempts
  enrolledAt: Date;
  startedAt?: Date;
  completedAt?: Date;              // When all modules done
  completionPercentage: number;    // modulesCompleted / totalModules
}
```

### Module Quiz Attempt (Self-Assessed)
```typescript
interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  moduleId: string;
  courseId: string;
  answers: Record<string, string>;  // Question ID -> Answer
  submittedAt: Date;
  noRetakeAllowed: boolean;         // Always true
  // NOTE: NO score, NO passed field
}
```

### Final Exam Attempt (Graded)
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
