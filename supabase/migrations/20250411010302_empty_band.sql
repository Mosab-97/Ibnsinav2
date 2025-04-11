/*
  # Initial Schema Setup for University Portal

  1. New Tables
    - `profiles`
      - User profile information including role (student/faculty)
    - `courses`
      - Course information and faculty assignments
    - `student_courses`
      - Student course enrollments
    - `attendance`
      - Student attendance records
    - `grades`
      - Student course grades
    - `contact_messages`
      - Contact form submissions

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for students and faculty
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name text NOT NULL,
  role text NOT NULL CHECK (role IN ('student', 'faculty')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_name text NOT NULL,
  course_code text NOT NULL,
  faculty_id uuid NOT NULL REFERENCES profiles(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Faculty can create courses"
  ON courses
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = faculty_id);

CREATE POLICY "Faculty can view their courses"
  ON courses
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = faculty_id OR
    EXISTS (
      SELECT 1 FROM student_courses
      WHERE student_courses.course_id = courses.id
      AND student_courses.user_id = auth.uid()
    )
  );

-- Create student_courses table
CREATE TABLE IF NOT EXISTS student_courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id),
  course_id uuid NOT NULL REFERENCES courses(id),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id)
);

ALTER TABLE student_courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their enrollments"
  ON student_courses
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Faculty can view their students"
  ON student_courses
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = student_courses.course_id
      AND courses.faculty_id = auth.uid()
    )
  );

-- Create attendance table
CREATE TABLE IF NOT EXISTS attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id),
  course_id uuid NOT NULL REFERENCES courses(id),
  clock_in_time timestamptz NOT NULL,
  clock_out_time timestamptz,
  status text NOT NULL CHECK (status IN ('present', 'late', 'absent')),
  date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can clock in/out"
  ON attendance
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Students can view their attendance"
  ON attendance
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Faculty can view and manage attendance"
  ON attendance
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = attendance.course_id
      AND courses.faculty_id = auth.uid()
    )
  );

-- Create grades table
CREATE TABLE IF NOT EXISTS grades (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id),
  course_id uuid NOT NULL REFERENCES courses(id),
  final_grade numeric NOT NULL CHECK (final_grade >= 0 AND final_grade <= 100),
  posted_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE grades ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their grades"
  ON grades
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Faculty can manage grades"
  ON grades
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = grades.course_id
      AND courses.faculty_id = auth.uid()
    )
  );

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  full_name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create messages"
  ON contact_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Faculty can view messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'faculty'
    )
  );