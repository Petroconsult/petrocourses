type ExamAttempt = {
  userId: string;
  courseId: string;
  score: number; // percentage, e.g., 85.5
  attemptNumber: number;
  lastAttemptDate?: Date;
};

type ExamResult = 'PASS' | 'FAIL' | 'LOCKED' | 'COOLDOWN';

export const evaluateExamPolicy = async (attempt: ExamAttempt): Promise<ExamResult> => {
  const { score, attemptNumber, lastAttemptDate } = attempt;

  // Check if exam is locked (more than 3 attempts)
  if (attemptNumber > 3) {
    return 'LOCKED';
  }

  // Check cooldown after failure
  if (lastAttemptDate && attemptNumber > 1) {
    const daysSinceLastAttempt = (Date.now() - lastAttemptDate.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceLastAttempt < 5) {
      return 'COOLDOWN';
    }
  }

  // Evaluate score
  if (score >= 85) {
    return 'PASS';
  } else {
    return 'FAIL';
  }
};

type EvalInput = { userId: string; pathwayId: string };

export const evaluatePolicy = async (input: EvalInput) => {
  // Simple deterministic evaluator stub.
  // Real engine should load CertificationPolicy.rules and evaluate deterministically.
  // For now: always grant for demo/development.
  return {
    grant: true,
    policyId: 'default-policy',
    reason: 'auto-grant: development default',
    details: {},
  };
};
