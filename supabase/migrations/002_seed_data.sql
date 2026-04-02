-- Insert placeholder teachers (For student login selection)
INSERT INTO public.teachers (id, email, name) VALUES 
  ('11111111-1111-1111-1111-111111111111', 'owl@school.com', 'Mr. Owl'),
  ('22222222-2222-2222-2222-222222222222', 'fox@school.com', 'Ms. Fox')
ON CONFLICT (id) DO NOTHING;

-- Insert students
INSERT INTO public.students (id, name, points, reading_time_minutes, success_rate_percent, teacher_id)
VALUES 
  ('33333333-3333-3333-3333-333333333331', 'Emma', 150, 80, 85, '11111111-1111-1111-1111-111111111111'),
  ('33333333-3333-3333-3333-333333333332', 'Noah', 90, 45, 70, '11111111-1111-1111-1111-111111111111'),
  ('33333333-3333-3333-3333-333333333333', 'Olivia', 300, 130, 95, '22222222-2222-2222-2222-222222222222'),
  ('33333333-3333-3333-3333-333333333334', 'Liam', 50, 30, 60, '11111111-1111-1111-1111-111111111111')
ON CONFLICT (id) DO NOTHING;
