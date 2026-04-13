import { expect, test } from 'vitest';

export function calculateLevel(points) {
  if (points > 300) return 3;
  if (points > 100) return 2;
  return 1;
}

test('calculateLevel assigns the correct buddy level based on points', () => {
  // We feed it fake point numbers and ensure the level output is true!
  expect(calculateLevel(50)).toBe(1);  // Student with 50 points stays level 1
  expect(calculateLevel(150)).toBe(2); // Student hits 150 points, jumps to level 2
  expect(calculateLevel(500)).toBe(3); // Student clears 300 points, reaches max level!
});
