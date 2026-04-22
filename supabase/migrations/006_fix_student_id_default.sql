-- Fix students table default id generation so new student rows get unique UUIDs
ALTER TABLE public.students
ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- If the column is still using auth.uid(), this will stop duplicate student IDs when the same teacher creates multiple students.
