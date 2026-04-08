-- Add difficulty column to students table
-- Defaults to 'Medium' for all existing students
ALTER TABLE public.students 
ADD COLUMN IF NOT EXISTS difficulty text DEFAULT 'Medium';
