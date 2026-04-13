import { expect, test } from 'vitest';
import { determineWordCount } from './difficultyLogic';

test('Game Features: Easy difficulty loads exactly 3 words/flowers', () => {
  const wordCount = determineWordCount('Easy');
  expect(wordCount).toBe(3);
});

test('Game Features: Medium difficulty loads exactly 6 words/flowers', () => {
  const wordCount = determineWordCount('Medium');
  expect(wordCount).toBe(6);
});

test('Game Features: Hard difficulty dynamically scales the game to 9 words/flowers', () => {
  const wordCount = determineWordCount('Hard');
  expect(wordCount).toBe(9);
});
