import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';  // Ensure this is correct
import AppRoutes from './routes/AppRoutes';  // Assuming this contains routes like home, login, etc.

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar />  {/* Make sure Navbar is here */}
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;

