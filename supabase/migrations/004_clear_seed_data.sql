-- Clear existing seed data from teachers and students tables

-- Delete all students first (due to foreign key constraint)
DELETE FROM public.students;

-- Delete all teachers
DELETE FROM public.teachers;