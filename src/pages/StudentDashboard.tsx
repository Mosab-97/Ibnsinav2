import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';  // Adjust the path as needed

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      const user = supabase.auth.user();

      // Get courses the student is enrolled in
      const { data: coursesData, error: coursesError } = await supabase
        .from('enrollments')
        .select('courses(*)')
        .eq('student_id', user?.id);

      if (coursesError) {
        console.error(coursesError);
        return;
      }
      setCourses(coursesData);

      // Get attendance
      const { data: attendanceData, error: attendanceError } = await supabase
        .from('attendance')
        .select('*')
        .eq('student_id', user?.id);

      if (attendanceError) {
        console.error(attendanceError);
        return;
      }
      setAttendance(attendanceData);

      // Get grades
      const { data: gradesData, error: gradesError } = await supabase
        .from('grades')
        .select('*')
        .eq('student_id', user?.id);

      if (gradesError) {
        console.error(gradesError);
        return;
      }
      setGrades(gradesData);
    };

    fetchStudentData();
  }, []);

  return (
    <div>
      <h1>Student Dashboard</h1>
      <h2>Courses</h2>
      <ul>
        {courses.map((course: any) => (
          <li key={course.id}>{course.course_name}</li>
        ))}
      </ul>

      <h2>Attendance</h2>
      <ul>
        {attendance.map((att: any) => (
          <li key={att.id}>
            {att.status} - {att.clock_in}
          </li>
        ))}
      </ul>

      <h2>Grades</h2>
      <ul>
        {grades.map((grade: any) => (
          <li key={grade.id}>
            {grade.course_id} - {grade.grade}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;

