import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Book, Clock, GraduationCap } from 'lucide-react';

interface Course {
  id: string;
  course_name: string;
  course_code: string;
  faculty_id: string;
}

interface Attendance {
  id: string;
  date: string;
  status: string;
  clock_in_time: string;
  clock_out_time: string | null;
}

interface Grade {
  id: string;
  course_id: string;
  final_grade: number;
  posted_at: string;
}

const StudentDashboard = () => {
  const { t } = useTranslation();
  const [courses, setCourses] = useState<Course[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [activeTab, setActiveTab] = useState('courses');

  useEffect(() => {
    // TODO: Fetch student data from Supabase
    const fetchData = async () => {
      try {
        // Fetch courses, attendance, and grades
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleClockIn = async () => {
    try {
      // TODO: Implement clock in functionality
    } catch (error) {
      console.error('Error clocking in:', error);
    }
  };

  const handleClockOut = async () => {
    try {
      // TODO: Implement clock out functionality
    } catch (error) {
      console.error('Error clocking out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Dashboard Header */}
          <div className="bg-primary p-6">
            <h1 className="text-2xl font-bold text-white">Student Dashboard</h1>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('courses')}
                className={`${
                  activeTab === 'courses'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex-1 py-4 px-1 text-center border-b-2 font-medium`}
              >
                <Book className="w-5 h-5 mx-auto mb-1" />
                Courses
              </button>
              <button
                onClick={() => setActiveTab('attendance')}
                className={`${
                  activeTab === 'attendance'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex-1 py-4 px-1 text-center border-b-2 font-medium`}
              >
                <Calendar className="w-5 h-5 mx-auto mb-1" />
                Attendance
              </button>
              <button
                onClick={() => setActiveTab('grades')}
                className={`${
                  activeTab === 'grades'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex-1 py-4 px-1 text-center border-b-2 font-medium`}
              >
                <GraduationCap className="w-5 h-5 mx-auto mb-1" />
                Grades
              </button>
            </nav>
          </div>

          {/* Content Sections */}
          <div className="p-6">
            {/* Courses Tab */}
            {activeTab === 'courses' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                    >
                      <h3 className="text-lg font-semibold mb-2">{course.course_name}</h3>
                      <p className="text-gray-600 mb-4">Code: {course.course_code}</p>
                      <div className="flex justify-between items-center">
                        <button
                          onClick={handleClockIn}
                          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors"
                        >
                          <Clock className="w-4 h-4 inline-block mr-2" />
                          Clock In
                        </button>
                        <button
                          onClick={handleClockOut}
                          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                        >
                          <Clock className="w-4 h-4 inline-block mr-2" />
                          Clock Out
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Attendance Tab */}
            {activeTab === 'attendance' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Clock In
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Clock Out
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {attendance.map((record) => (
                      <tr key={record.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{record.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              record.status === 'present'
                                ? 'bg-green-100 text-green-800'
                                : record.status === 'late'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {record.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{record.clock_in_time}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {record.clock_out_time || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Grades Tab */}
            {activeTab === 'grades' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Course
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Grade
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Posted Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {grades.map((grade) => (
                      <tr key={grade.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {courses.find((c) => c.id === grade.course_id)?.course_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{grade.final_grade}%</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(grade.posted_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;