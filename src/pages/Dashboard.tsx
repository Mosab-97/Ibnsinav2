import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const user = supabase.auth.user();
      if (!user) {
        navigate('/login'); // Redirect to login if user is not logged in
      }
      setUser(user);
    };
    fetchUser();
  }, [navigate]);

  return (
    <div>
      <h1>Welcome {user?.email}</h1>
      {/* Display role-based content */}
      {user?.role === 'student' && <p>Student content goes here</p>}
      {user?.role === 'faculty' && <p>Faculty content goes here</p>}
    </div>
  );
};

export default Dashboard;

