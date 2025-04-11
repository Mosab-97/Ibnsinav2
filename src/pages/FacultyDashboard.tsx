import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Book, Users, Calendar, MessageSquare } from 'lucide-react';

interface Course {
  id: string;
  course_name: string;
  course_code: string;
}

interface Student {
  id: string;
  full_name: string;
  email: string;
}

interface AttendanceRecord {
  id: string;
  student_id: string;
  date: string;
  status: string;
}

interface Message {
  id: string;
  full_name: string;
  email: string;
  message: string;
  created_at: string;
  read: boolean;
}

const FacultyDashboard = () => {
  const { t } = useTranslation();
  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeTab, setActiveTab] = useState('courses');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Fetch faculty data from Supabase
    const fetchData = async () => {
      try {
        // Fetch courses, students, attendance, and messages
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCreateCourse = async () => {
    // TODO: Implement course creation
  };

  const handleUpdateAttendance = async (studentId: string, status: string) => {
    // TODO: Implement attendance update
  };

  const handleMarkMessageRead = async (messageId: string) => {
    // TODO: Implement message read status update
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Dashboard Header */}
          <div className="bg-primary p-6">
            <h1 className="text-2xl font-bold text-white">Faculty Dashboard</h1>
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
                onClick={() => setActiveTab('students')}
                className={`${
                  activeTab === 'students'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex-1 py-4 px-1 text-center border-b-2 font-medium`}
              >
                <Users className="w-5 h-5 mx-auto mb-1" />
                Students
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
                onClick={() => setActiveTab('messages')}
                className={`${
                  activeTab === 'messages'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } flex-1 py-4 px-1 text-center border-b-2 font-medium`}
              >
                <MessageSquare className="w-5 h-5 mx-auto mb-1" />
                Messages
              </button>
            </nav>
          </div>

          {/* Content Sections */}
          <div className="p-6">
            {/* Courses Tab */}
            {activeTab === 'courses' && (
              <div className="space-y-6">
                <button
                  onClick={handleCreateCourse}
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors"
                >
                  Create New Course
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                    >
                      <h3 className="text-lg font-semibold mb-2">{course.course_name}</h3>
                      <p className="text-gray-600">Code: {course.course_code}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Students Tab */}
            {activeTab === 'students' && (
              <div className="space-y-6">
                <select
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  value={selectedCourse || ''}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  <option value="">Select Course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.course_name}
                    </option>
                  ))}
                </select>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {students.map((student) => (
                        <tr key={student.id}>
                          <td className="px-6 py-4 whitespace-nowrap">{student.full_name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{student.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Attendance Tab */}
            {activeTab === 'attendance' && (
              <div className="space-y-6">
                <select
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  value={selectedCourse || ''}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  <option value="">Select Course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.course_name}
                    </option>
                  ))}
                </select>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Student
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {attendance.map((record) => (
                        <tr key={record.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {students.find((s) => s.id === record.student_id)?.full_name}
                          </td>
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
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              className="block w-full p-2 border border-gray-300 rounded-md"
                              value={record.status}
                              onChange={(e) =>
                                handleUpdateAttendance(record.student_id, e.target.value)
                              }
                            >
                              <option value="present">Present</option>
                              <option value="late">Late</option>
                              <option value="absent">Absent</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`bg-white rounded-lg border p-6 ${
                      message.read ? 'border-gray-200' : 'border-primary'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{message.full_name}</h3>
                        <p className="text-gray-600">{message.email}</p>
                      </div>
                      <button
                        onClick={() => handleMarkMessageRead(message.id)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          message.read
                            ? 'bg-gray-100 text-gray-600'
                            : 'bg-primary text-white'
                        }`}
                      >
                        {message.read ? 'Read' : 'Mark as Read'}
                      </button>
                    </div>
                    <p className="text-gray-700">{message.message}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(message.created_at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;