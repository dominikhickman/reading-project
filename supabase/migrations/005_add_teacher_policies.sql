-- Add missing INSERT policy for teachers table
CREATE POLICY "Allow public insert to teachers" ON public.teachers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update to teachers" ON public.teachers FOR UPDATE USING (true);