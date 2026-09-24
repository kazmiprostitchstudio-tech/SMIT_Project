import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { StudentProvider } from './context/StudentContext';
import StudentLogin from './pages/StudentLogin';
import TrainerLogin from './pages/TrainerLogin';
import AdminLogin from './pages/AdminLogin';
import CoursesPage from './pages/CoursesPage';
import CourseDashboard from './pages/CourseDashboard';

function MainApp() {
  const { currentUser, logout } = useAuth();
  const [currentRoleView, setCurrentRoleView] = useState('student');
  const [currentScreen, setCurrentScreen] = useState('courses'); // 'courses' | 'dashboard'

  // If user is logged in
  if (currentUser?.isLoggedIn) {
    if (currentScreen === 'courses') {
      return (
        <CoursesPage
          onViewDetails={() => setCurrentScreen('dashboard')}
          onLogout={logout}
        />
      );
    }

    if (currentScreen === 'dashboard') {
      return (
        <CourseDashboard
          onBackToCourses={() => setCurrentScreen('courses')}
        />
      );
    }
  }

  // If not logged in, show respective portal
  return (
    <div>
      {currentRoleView === 'student' && (
        <StudentLogin onSwitchRole={setCurrentRoleView} />
      )}
      {currentRoleView === 'trainer' && (
        <TrainerLogin onSwitchRole={setCurrentRoleView} />
      )}
      {currentRoleView === 'admin' && (
        <AdminLogin onSwitchRole={setCurrentRoleView} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <StudentProvider>
        <MainApp />
      </StudentProvider>
    </AuthProvider>
  );
}