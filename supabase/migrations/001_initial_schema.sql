-- This schema replaces the mock data in AppContext.jsx

-- Creating a table for Students
CREATE TABLE IF NOT EXISTS public.students (
    id UUID DEFAULT auth.uid() PRIMARY KEY,
    name TEXT NOT NULL,
    points INTEGER DEFAULT 0,
    reading_time_minutes INTEGER DEFAULT 0,
    success_rate_percent INTEGER DEFAULT 0,
    monster_type TEXT,
    monster_level INTEGER DEFAULT 1,
    teacher_id UUID NULL -- Optional relation to a teacher if they are in a class
);

-- Creating a table for Teachers
CREATE TABLE IF NOT EXISTS public.teachers (
    id UUID DEFAULT auth.uid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT
);

-- Creating a table for Student Stickers (Achievements)
CREATE TABLE IF NOT EXISTS public.student_stickers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    sticker_name TEXT NOT NULL,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Basic Row Level Security (RLS) policies 
-- (You can expand these later based on auth)
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_stickers ENABLE ROW LEVEL SECURITY;

-- Allow read access to all for now (while testing)
CREATE POLICY "Allow public read access to students" ON public.students FOR SELECT USING (true);
CREATE POLICY "Allow public read access to teachers" ON public.teachers FOR SELECT USING (true);
CREATE POLICY "Allow public read access to stickers" ON public.student_stickers FOR SELECT USING (true);

-- Allow insert/update for testing
CREATE POLICY "Allow public insert to students" ON public.students FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update to students" ON public.students FOR UPDATE USING (true);
