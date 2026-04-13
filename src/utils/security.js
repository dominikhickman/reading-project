export function verifyRouteAccess(role, requestedRoute) {
  // If a non-teacher tries to access the teacher dashboard, force them to the home page
  if (requestedRoute === '/teacher/dashboard' && role !== 'teacher') {
    return '/';
  }
  
  // If a non-student tries to access the student dashboard, force them to the home page
  if (requestedRoute === '/student/dashboard' && role !== 'student') {
    return '/';
  }

  // Otherwise, they are authorized! Let them through.
  return requestedRoute;
}
