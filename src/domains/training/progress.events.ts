export type ProgressEvent =
  | { type: 'LESSON_COMPLETE'; payload: { userId: string; lessonId: string } }
  | { type: 'MODULE_COMPLETE'; payload: { userId: string; moduleId: string } }

export const publishProgress = (e: ProgressEvent) => {
  // placeholder
}
