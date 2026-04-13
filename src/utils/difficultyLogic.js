export function determineWordCount(difficultyLevel) {
  if (difficultyLevel === 'Easy') return 3;
  if (difficultyLevel === 'Hard') return 9;
  return 6; // Default to Medium
}
