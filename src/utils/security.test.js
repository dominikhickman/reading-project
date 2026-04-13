import { expect, test } from 'vitest';
import { verifyRouteAccess } from './security';

test('Security Firewall: Blocks unauthenticated users from accessing the Teacher Dashboard', () => {
  // Simulating a student or logged-out user ('null') attempting to hit the teacher dashboard
  const unauthorizedAccess = verifyRouteAccess(null, '/teacher/dashboard');
  
  // They should be immediately bounced to the homepage
  expect(unauthorizedAccess).toBe('/');
});

test('Security Firewall: Blocks unauthenticated users from accessing the Student Dashboard', () => {
  // Simulating an unauthorized attempt
  const unauthorizedAccess = verifyRouteAccess(null, '/student/dashboard');
  
  // They should be bounced to the homepage
  expect(unauthorizedAccess).toBe('/');
});

test('Security Firewall: Permits authorized teachers to access the Teacher Dashboard', () => {
  // Simulating a successfully authenticated teacher
  const authorizedAccess = verifyRouteAccess('teacher', '/teacher/dashboard');
  
  // They are allowed exactly where they requested
  expect(authorizedAccess).toBe('/teacher/dashboard');
});
